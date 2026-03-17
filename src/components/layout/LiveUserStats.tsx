'use client';

import { useRealtime } from '@/components/providers/RealtimeProvider';

export function LiveUserStats() {
  const { xp, streak } = useRealtime();

  return (
    <div className="hidden sm:flex items-center gap-3 bg-[#18181B] border border-[#27272A] rounded-full px-4 py-1.5 text-sm font-medium text-slate-200">
      <div className="flex items-center gap-1.5">
        <span className="text-orange-500">🔥</span>
        <span>{streak}</span>
      </div>
      <div className="w-px h-4 bg-[#27272A]"></div>
      <div className="flex items-center gap-1.5">
        <span className="text-yellow-500">🏆</span>
        <span>{xp} XP</span>
      </div>
    </div>
  );
}
