"use client";

import { useTransition } from "react";
import { toast, Toaster } from "sonner";
import { markLessonComplete } from "@/app/(ide)/lesson/actions";
import { GamificationResult } from "@/lib/gamification/engine";
import { ArrowLeft, Check, Plus } from "lucide-react";
import Link from "next/link";

interface Props {
  lessonSlug: string;
  previousSlug: string | null;
}

export default function IdeBottomBar({ lessonSlug, previousSlug }: Props) {
  const [isPending, startTransition] = useTransition();

  const handleComplete = () => {
    startTransition(async () => {
      const result = await markLessonComplete(lessonSlug) as GamificationResult;
      
      if (!result) return;

      if (!result.success) {
        toast.error(result.error || "Failed to complete lesson");
        return;
      }

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
              🏆 New Badge Unlocked!
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
      <footer className="h-16 bg-[#09090B] border-t border-[#27272A] shrink-0 flex items-center justify-between px-6 z-20 relative">
        {previousSlug ? (
          <Link 
            href={`/lesson/${previousSlug}`}
            className="flex items-center gap-2 text-slate-400 hover:text-slate-200 font-[family-name:var(--font-space-grotesk),sans-serif] text-sm transition-colors py-2 px-4 rounded hover:bg-[#18181B]"
          >
            <ArrowLeft className="w-[18px] h-[18px]" />
            Previous Lesson
          </Link>
        ) : (
          <div className="w-[150px]"></div>
        )}

        <div className="flex items-center gap-4">
          <div className="text-sm text-slate-400 font-mono flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            Code Ready
          </div>
          <button 
            onClick={handleComplete}
            disabled={isPending}
            className="bg-[#05b7d6] hover:bg-[#0891B2] text-[#09090B] font-[family-name:var(--font-space-grotesk),sans-serif] font-semibold py-2 px-6 rounded text-sm transition-all shadow-[0_0_0_1px_#05b7d6,0_0_12px_rgba(5,183,214,0.2)] flex items-center gap-2 disabled:opacity-50"
          >
            {isPending ? "Completing..." : "Mark as Complete"}
            {!isPending && (
              <div className="flex items-center gap-1 bg-[#09090B]/20 px-2 py-0.5 rounded text-xs ml-2">
                <Plus className="w-[14px] h-[14px]" />
                10 XP
              </div>
            )}
          </button>
        </div>
      </footer>
    </>
  );
}