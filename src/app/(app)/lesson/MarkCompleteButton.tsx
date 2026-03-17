'use client';

import { useTransition } from 'react';
import { toast, Toaster } from 'sonner';
import { markLessonComplete } from '@/app/(app)/lesson/actions';
import { GamificationResult } from '@/lib/gamification/engine';

interface Props {
  lessonSlug: string;
}

export default function MarkCompleteButton({ lessonSlug }: Props) {
  const [isPending, startTransition] = useTransition();

  const handleComplete = () => {
    startTransition(async () => {
      const result = await markLessonComplete(lessonSlug) as GamificationResult;
      
      if (!result) return;

      if (!result.success) {
        toast.error(result.error || 'Failed to complete lesson');
        return;
      }

      // Success! Show Gamification Feedback
      toast.success(
        <div className="flex flex-col gap-1">
          <span className="font-semibold">Lesson Completed!</span>
          <span className="text-sm border-t pt-1">+{result.earnedXp} XP Earned! 🚀</span>
          {result.streak > 1 && (
            <span className="text-sm text-orange-500 font-medium">
              🔥 {result.streak} Day Streak!
            </span>
          )}
          {result.badges && result.badges.length > 0 && (
            <span className="text-sm text-yellow-600 font-medium">
              🏆 New Badge Unlocked: {result.badges.map(b => b.name || b.code).join(', ')}
            </span>
          )}
        </div>,
        { duration: 5000 }
      );
    });
  };

  return (
    <>
      <Toaster />
      <button 
        onClick={handleComplete}
        disabled={isPending}
        className="px-6 py-2.5 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/80 transition-colors w-full sm:w-auto font-medium shadow-sm border disabled:opacity-50"
      >
        {isPending ? 'Completing...' : 'Mark as Complete'}
      </button>
    </>
  );
}
