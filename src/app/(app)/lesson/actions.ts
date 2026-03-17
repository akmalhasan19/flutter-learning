"use server"

import { revalidatePath } from "next/cache";
import { getUser } from "@/lib/auth/dal";
import { processLessonCompletion } from "@/lib/gamification/engine";

export async function markLessonComplete(lessonSlug: string) {
  const user = await getUser();
  
  if (!user) {
    return { success: false, error: "Unauthorized" };
  }

  // Artificial delay removed

  console.log(`User ${user.id} marking lesson ${lessonSlug} as complete.`);
  
  const result = await processLessonCompletion(user.id, lessonSlug);

  if (result.success) {
    revalidatePath(`/lesson/${lessonSlug}`);
  }
  
  return result;
}