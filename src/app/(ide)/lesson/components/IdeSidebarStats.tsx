"use client";

import { useRealtime } from "@/components/providers/RealtimeProvider";
import { Star, Flame, Award } from "lucide-react";
import Link from "next/link";

interface Props {
  displayName: string;
}

export default function IdeSidebarStats({ displayName }: Props) {
  const { xp, streak } = useRealtime();

  return (
    <div className="p-4 border-b border-[#27272A] shrink-0">
      <Link href="/profile" className="flex items-center gap-3 mb-4 group cursor-pointer hover:opacity-80 transition-opacity">
        <div className="w-8 h-8 rounded-full bg-[#27272A] overflow-hidden shrink-0 border border-[#27272A] flex items-center justify-center text-xs font-bold text-slate-300 group-hover:border-[#05b7d6] transition-colors">
          {displayName.charAt(0).toUpperCase()}
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-[family-name:var(--font-space-grotesk),sans-serif] font-semibold text-sm truncate group-hover:text-[#05b7d6] transition-colors">{displayName}</p>
          <p className="text-xs text-slate-400 truncate">Beginner Track</p>
        </div>
      </Link>

      <div className="grid grid-cols-3 gap-2">
        <div className="flex flex-col items-center justify-center p-2 rounded bg-[#27272A] border border-[#27272A]">
          <div className="flex items-center gap-1 mb-1 text-yellow-400">
            <Star className="w-4 h-4" />
          </div>
          <p className="font-[family-name:var(--font-space-grotesk),sans-serif] font-bold text-sm">{xp}</p>
          <p className="text-[10px] text-slate-400 uppercase tracking-wider">XP</p>
        </div>
        
        <div className="flex flex-col items-center justify-center p-2 rounded bg-[#27272A] border border-[#27272A]">
          <div className="flex items-center gap-1 mb-1 text-orange-500">
            <Flame className="w-4 h-4" />
          </div>
          <p className="font-[family-name:var(--font-space-grotesk),sans-serif] font-bold text-sm">{streak}</p>
          <p className="text-[10px] text-slate-400 uppercase tracking-wider">Streak</p>
        </div>
        
        <div className="flex flex-col items-center justify-center p-2 rounded bg-[#27272A] border border-[#27272A]">
          <div className="flex items-center gap-1 mb-1 text-[#05b7d6]">
            <Award className="w-4 h-4" />
          </div>
          <p className="font-[family-name:var(--font-space-grotesk),sans-serif] font-bold text-sm">0</p>
          <p className="text-[10px] text-slate-400 uppercase tracking-wider">Badges</p>
        </div>
      </div>
    </div>
  );
}