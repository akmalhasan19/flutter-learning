import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { GraderResponsePayload } from '@/lib/grader/provider';
import { processLessonCompletion } from '@/lib/gamification/engine';
import { revalidatePath } from 'next/cache';
import { trackEvent } from '@/lib/analytics/events';

export async function POST(req: NextRequest) {
  try {
    // Basic webhook secret verification
    const webhookSecret = req.headers.get('x-webhook-secret');
    if (process.env.GRADER_WEBHOOK_SECRET && webhookSecret !== process.env.GRADER_WEBHOOK_SECRET) {
      return NextResponse.json({ error: 'Unauthorized payload' }, { status: 401 });
    }

    const payload: GraderResponsePayload = await req.json();

    if (!payload.submissionId || !payload.status) {
      return NextResponse.json({ error: 'Invalid payload missing required fields' }, { status: 400 });
    }

    const supabase = await createClient();

    // 1. Fetch the submission to get the user and lesson info
    const { data: submission, error: fetchError } = await supabase
      .from('lesson_submissions')
      .select('user_id, lesson_id, status, lessons(slug)')
      .eq('id', payload.submissionId)
      .single();

    if (fetchError || !submission) {
      console.error('[Webhook/Grader] Failed to fetch submission:', fetchError);
      return NextResponse.json({ error: 'Submission not found' }, { status: 404 });
    }

    // Optional: Avoid re-processing if already terminal state (passed/failed/infra_error)
    if (submission.status !== 'queued' && submission.status !== 'running') {
      console.log(`[Webhook/Grader] Submission ${payload.submissionId} already in terminal state: ${submission.status}`);
    }

    // 2. Update the submission with the grading result
    const { error: updateError } = await supabase
      .from('lesson_submissions')
      .update({
        status: payload.status,
        score: payload.score,
        summary: payload.summary,
        passed_at: payload.status === 'passed' ? new Date().toISOString() : null,
        runner_job_id: payload.jobId,
        updated_at: new Date().toISOString(),
      })
      .eq('id', payload.submissionId);

    if (updateError) {
      console.error('[Webhook/Grader] Failed to update submission:', updateError);
      return NextResponse.json({ error: 'Failed to update submission state' }, { status: 500 });
    }

    // Track result event
    if (payload.status === 'passed') {
      trackEvent('submission_passed', {
        userId: submission.user_id,
        lessonId: submission.lesson_id,
        submissionId: payload.submissionId,
        score: payload.score
      });
    } else if (payload.status === 'failed') {
      trackEvent('submission_failed', {
        userId: submission.user_id,
        lessonId: submission.lesson_id,
        submissionId: payload.submissionId,
        score: payload.score,
        summary: payload.summary
      });
    } else if (payload.status === 'infra_error') {
      trackEvent('grader_infra_error', {
        userId: submission.user_id,
        lessonId: submission.lesson_id,
        submissionId: payload.submissionId,
        error: payload.summary
      });
    }

    // 3. If passed, integrate with Gamification Engine
    const lessonSlug = Array.isArray(submission.lessons) 
      ? submission.lessons[0]?.slug 
      : (submission.lessons as any)?.slug;
      
    if (payload.status === 'passed' && lessonSlug) {
      console.log(`[Webhook/Grader] Submission passed for lesson ${lessonSlug}. Awarding completion.`);
      // Process gamification based on the passed assignment
      await processLessonCompletion(submission.user_id, lessonSlug);

      // Revalidate paths so the UI updates
      revalidatePath(`/lesson/${lessonSlug}`);
      revalidatePath('/dashboard');
      revalidatePath('/learn');
    }

    // Even if it failed, we want the user to see the failed status when they refresh or poll.
    if (lessonSlug) {
      revalidatePath(`/lesson/${lessonSlug}`);
      revalidatePath('/dashboard');
      revalidatePath('/learn');
    }

    return NextResponse.json({ success: true, message: 'Submission updated' });
  } catch (error) {
    console.error('[Webhook/Grader] Unexpected error handling payload:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
