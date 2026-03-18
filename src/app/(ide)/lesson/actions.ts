"use server"

import { revalidatePath } from "next/cache";
import { getUser } from "@/lib/auth/dal";
import { processLessonCompletion } from "@/lib/gamification/engine";
import { createClient } from "@/lib/supabase/server";
import { graderProvider } from "@/lib/grader/provider";
import { trackEvent } from "@/lib/analytics/events";

export async function markLessonComplete(lessonSlug: string) {
  const user = await getUser();
  
  if (!user) {
    return { success: false, error: "Unauthorized" };
  }

  const supabase = await createClient();

  // Prevent manual completion for graded lessons
  const { data: lesson } = await supabase
    .from('lessons')
    .select('assessment_mode')
    .eq('slug', lessonSlug)
    .single();

  if (lesson?.assessment_mode === 'graded') {
    return { success: false, error: "Graded lessons cannot be completed manually." };
  }

  console.log(`User ${user.id} marking lesson ${lessonSlug} as complete.`);
  
  const result = await processLessonCompletion(user.id, lessonSlug);

  if (result.success) {
    revalidatePath(`/lesson/${lessonSlug}`);
  }
  
  return result;
}

export async function submitGradedLesson(lessonId: string, lessonSlug: string, sourceCode: string) {
  const user = await getUser();
  
  if (!user) {
    return { success: false, error: "Unauthorized" };
  }

  console.log(`User ${user.id} submitting code for lesson ${lessonId}`);

  try {
    const supabase = await createClient();

    // 1. Get the current attempt number for this user and lesson
    const { data: previousSubmissions } = await supabase
      .from('lesson_submissions')
      .select('attempt_number')
      .eq('user_id', user.id)
      .eq('lesson_id', lessonId)
      .order('attempt_number', { ascending: false })
      .limit(1);

    const attemptNumber = (previousSubmissions && previousSubmissions.length > 0) 
      ? previousSubmissions[0].attempt_number + 1 
      : 1;

    // 2. Create a new submission record in 'queued' state
    const { data: submission, error: insertError } = await supabase
      .from('lesson_submissions')
      .insert({
        user_id: user.id,
        lesson_id: lessonId,
        status: 'queued',
        attempt_number: attemptNumber,
        source_reference: {
          code: sourceCode, // Storing code directly for MVP, in real scenario we might upload it to storage bucket
        },
      })
      .select('id')
      .single();

    if (insertError || !submission) {
      console.error('[Actions/submitGradedLesson] Failed to create submission:', insertError);
      return { success: false, error: "Failed to create submission record" };
    }

    // Track submission creation
    trackEvent('submission_created', {
      userId: user.id,
      lessonId: lessonId,
      submissionId: submission.id,
      attemptNumber: attemptNumber
    });

    // 3. Dispatch the job to the grader provider
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
    const callbackUrl = `${baseUrl}/api/webhooks/grader`;

    // Fetch grader metadata from lesson (optional but good practice)
    const { data: lessonMetadata } = await supabase
      .from('lessons')
      .select('grader_target')
      .eq('id', lessonId)
      .single();

    try {
      const jobId = await graderProvider.dispatchJob({
        submissionId: submission.id,
        userId: user.id,
        lessonId: lessonId,
        sourceCode: sourceCode,
        graderTarget: lessonMetadata?.grader_target || undefined,
        callbackUrl,
      });

      // 4. Update the submission with the job ID and mark it as 'running'
      await supabase
        .from('lesson_submissions')
        .update({ status: 'running', runner_job_id: jobId })
        .eq('id', submission.id);

    } catch (dispatchError) {
      console.error('[Actions/submitGradedLesson] Infrastructure error dispatching job:', dispatchError);
      
      // Mark as infra_error if it fails to dispatch
      await supabase
        .from('lesson_submissions')
        .update({ status: 'infra_error', summary: 'Failed to dispatch grading job due to infrastructure error' })
        .eq('id', submission.id);
        
      trackEvent('grader_infra_error', {
        userId: user.id,
        lessonId: lessonId,
        submissionId: submission.id,
        error: String(dispatchError)
      });

      return { success: false, error: "Grading service is currently unavailable. Please try again later." };
    }

    revalidatePath(`/lesson/${lessonSlug}`);
    return { success: true, submissionId: submission.id };

  } catch (error) {
    console.error('[Actions/submitGradedLesson] Unexpected error:', error);
    return { success: false, error: "An unexpected error occurred." };
  }
}