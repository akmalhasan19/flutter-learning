import { createClient } from "@/lib/supabase/server";
import { Star, Flame, CheckCircle, Terminal, Award, Lock, User } from "lucide-react";
import Link from "next/link";

export default async function ProfilePage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user?.id)
    .single();

  const displayName = profile?.display_name || "FlutterDev99";
  const xp = profile?.total_xp || 0;
  const streak = profile?.current_streak || 0;
  const joinDate = new Date(profile?.created_at || new Date()).toLocaleDateString('en-US', { month: 'short', year: 'numeric' });

  // Heatmap helper (mocking 7x12 weeks)
  const totalDays = 7 * 12;
  const getMockHeatmapColor = (index: number) => {
    // Generate some deterministic pattern based on index for visual effect
    const val = Math.abs((Math.sin(index * 12.9898) * 43758.5453) % 1);
    if (val > 0.8) return "bg-[#05b7d6] shadow-[0_0_8px_rgba(5,183,214,0.5)]";
    if (val > 0.6) return "bg-[#05b7d6]/80";
    if (val > 0.4) return "bg-[#05b7d6]/50";
    if (val > 0.2) return "bg-[#05b7d6]/20";
    return "bg-[#27272A] border border-[#27272A]";
  };

  return (
    <div className="w-full max-w-[1024px] mx-auto pb-12 flex flex-col gap-8 text-slate-100">
      
      {/* Header Profile Section */}
      <header className="flex items-center gap-6 pb-6 border-b border-[#27272A]">
        <div className="w-20 h-20 rounded-lg border border-[#27272A] overflow-hidden bg-[#18181B] flex items-center justify-center">
          <User className="w-10 h-10 text-[#05b7d6]" />
        </div>
        <div>
          <h1 className="font-[family-name:var(--font-space-grotesk),sans-serif] text-3xl font-bold tracking-tight mb-1">{displayName}</h1>
          <div className="flex items-center gap-3 text-sm font-mono text-slate-400">
            <span className="flex items-center gap-1">
              <Award className="w-4 h-4 text-[#FBBF24]" /> 
              Rank: Widget Architect
            </span>
            <span className="text-[#27272A]">|</span>
            <span>Joined: {joinDate}</span>
          </div>
        </div>
      </header>

      {/* Stat Cards Grid */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* XP Card */}
        <div className="bg-[#18181B] border border-[#27272A] rounded-lg p-6 flex flex-col items-start relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <Star className="w-16 h-16" />
          </div>
          <div className="flex items-center gap-2 mb-2">
            <Star className="text-[#FBBF24] w-5 h-5" />
            <h2 className="font-mono text-sm text-slate-400 uppercase tracking-wider">Total Experience</h2>
          </div>
          <p className="font-[family-name:var(--font-space-grotesk),sans-serif] text-[32px] font-bold leading-tight">
            {xp.toLocaleString()} <span className="text-lg text-slate-400 font-normal">XP</span>
          </p>
        </div>

        {/* Streak Card */}
        <div className="bg-[#18181B] border border-[#27272A] rounded-lg p-6 flex flex-col items-start relative overflow-hidden shadow-[0_0_0_1px_#05b7d6,0_0_12px_rgba(5,183,214,0.2)]">
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <Flame className="w-16 h-16" />
          </div>
          <div className="flex items-center gap-2 mb-2">
            <Flame className="text-[#F59E0B] w-5 h-5" />
            <h2 className="font-mono text-sm text-[#05b7d6] uppercase tracking-wider">Current Streak</h2>
          </div>
          <p className="font-[family-name:var(--font-space-grotesk),sans-serif] text-[32px] font-bold leading-tight text-[#05b7d6]">
            {streak} <span className="text-lg text-[#05b7d6]/70 font-normal">Days</span>
          </p>
        </div>

        {/* Modules Card */}
        <div className="bg-[#18181B] border border-[#27272A] rounded-lg p-6 flex flex-col items-start relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <CheckCircle className="w-16 h-16" />
          </div>
          <div className="flex items-center gap-2 mb-2">
            <CheckCircle className="text-[#10B981] w-5 h-5" />
            <h2 className="font-mono text-sm text-slate-400 uppercase tracking-wider">Modules Completed</h2>
          </div>
          <p className="font-[family-name:var(--font-space-grotesk),sans-serif] text-[32px] font-bold leading-tight">
            2 <span className="text-lg text-slate-400 font-normal">/ 24</span>
          </p>
        </div>
      </section>

      {/* Activity Heatmap */}
      <section className="bg-[#18181B] border border-[#27272A] rounded-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="font-[family-name:var(--font-space-grotesk),sans-serif] text-xl font-bold">Coding Consistency</h3>
          <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
            <span>Less</span>
            <div className="flex gap-1">
              <div className="w-3 h-3 bg-[#27272A] rounded-sm border border-[#27272A]"></div>
              <div className="w-3 h-3 bg-[#05b7d6]/20 rounded-sm"></div>
              <div className="w-3 h-3 bg-[#05b7d6]/50 rounded-sm"></div>
              <div className="w-3 h-3 bg-[#05b7d6]/80 rounded-sm"></div>
              <div className="w-3 h-3 bg-[#05b7d6] rounded-sm shadow-[0_0_8px_rgba(5,183,214,0.5)]"></div>
            </div>
            <span>More</span>
          </div>
        </div>
        
        <div className="overflow-x-auto pb-2 custom-scrollbar">
          <div className="grid grid-rows-7 grid-flow-col gap-1 w-max">
            {Array.from({ length: totalDays }).map((_, i) => (
              <div 
                key={i} 
                className={`w-[14px] h-[14px] rounded-sm ${getMockHeatmapColor(i)}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Bottom Row: Badges & Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Badge Cabinet */}
        <section className="bg-[#18181B] border border-[#27272A] rounded-lg p-6 flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-[family-name:var(--font-space-grotesk),sans-serif] text-xl font-bold">Badge Cabinet</h3>
            <span className="font-mono text-sm text-[#05b7d6]">3 Earned</span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            
            {/* Earned Badges */}
            <div className="border border-[#05b7d6] rounded-lg p-4 flex flex-col items-center justify-center gap-3 bg-[#05b7d6]/5 shadow-[0_0_0_1px_#05b7d6,0_0_12px_rgba(5,183,214,0.2)] group cursor-pointer transition-all hover:bg-[#05b7d6]/10">
              <svg className="w-12 h-12 text-[#05b7d6]" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                <path d="M14.25 9.75L16.5 12l-2.25 2.25m-4.5 0L7.5 12l2.25-2.25M6 20.25h12A2.25 2.25 0 0020.25 18V6A2.25 2.25 0 0018 3.75H6A2.25 2.25 0 003.75 6v12A2.25 2.25 0 006 20.25z" strokeLinecap="round" strokeLinejoin="round"></path>
              </svg>
              <span className="font-[family-name:var(--font-space-grotesk),sans-serif] text-sm font-semibold text-center">First Compile</span>
            </div>
            
            <div className="border border-[#05b7d6] rounded-lg p-4 flex flex-col items-center justify-center gap-3 bg-[#05b7d6]/5 shadow-[0_0_0_1px_#05b7d6,0_0_12px_rgba(5,183,214,0.2)] group cursor-pointer transition-all hover:bg-[#05b7d6]/10">
              <svg className="w-12 h-12 text-[#05b7d6]" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                <path d="M2.25 7.125C2.25 6.504 2.754 6 3.375 6h6c.621 0 1.125.504 1.125 1.125v3.75c0 .621-.504 1.125-1.125 1.125h-6a1.125 1.125 0 01-1.125-1.125v-3.75zM14.25 8.625c0-.621.504-1.125 1.125-1.125h5.25c.621 0 1.125.504 1.125 1.125v8.25c0 .621-.504 1.125-1.125 1.125h-5.25a1.125 1.125 0 01-1.125-1.125v-8.25zM3.75 16.125c0-.621.504-1.125 1.125-1.125h5.25c.621 0 1.125.504 1.125 1.125v2.25c0 .621-.504 1.125-1.125 1.125h-5.25a1.125 1.125 0 01-1.125-1.125v-2.25z" strokeLinecap="round" strokeLinejoin="round"></path>
              </svg>
              <span className="font-[family-name:var(--font-space-grotesk),sans-serif] text-sm font-semibold text-center">Widget Master</span>
            </div>
            
            <div className="border border-[#05b7d6] rounded-lg p-4 flex flex-col items-center justify-center gap-3 bg-[#05b7d6]/5 shadow-[0_0_0_1px_#05b7d6,0_0_12px_rgba(5,183,214,0.2)] group cursor-pointer transition-all hover:bg-[#05b7d6]/10">
              <svg className="w-12 h-12 text-[#05b7d6]" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                <path d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25m18 0A2.25 2.25 0 0018.75 3H5.25A2.25 2.25 0 003 5.25m18 0V12a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 12V5.25" strokeLinecap="round" strokeLinejoin="round"></path>
              </svg>
              <span className="font-[family-name:var(--font-space-grotesk),sans-serif] text-sm font-semibold text-center">State Architect</span>
            </div>

            {/* Locked Badges */}
            <div className="border border-[#27272A] rounded-lg p-4 flex flex-col items-center justify-center gap-3 opacity-40 grayscale bg-[#09090B]">
              <svg className="w-12 h-12 text-slate-400" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                <path d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.433 4.433 0 002.771 2.771 4.902 4.902 0 003.123.024 4.5 4.5 0 001.59-1.04m4.39-9.214a6.002 6.002 0 01-3.6 1.76M5.53 10.158a6.002 6.002 0 011.76-3.6" strokeLinecap="round" strokeLinejoin="round"></path>
              </svg>
              <span className="font-[family-name:var(--font-space-grotesk),sans-serif] text-sm font-semibold text-center text-slate-400">Anim Master</span>
            </div>
            
            <div className="border border-[#27272A] rounded-lg p-4 flex flex-col items-center justify-center gap-3 opacity-40 grayscale bg-[#09090B]">
              <Lock className="w-10 h-10 text-slate-400" />
              <span className="font-[family-name:var(--font-space-grotesk),sans-serif] text-sm font-semibold text-center text-slate-400">???</span>
            </div>
            
            <div className="border border-[#27272A] rounded-lg p-4 flex flex-col items-center justify-center gap-3 opacity-40 grayscale bg-[#09090B]">
              <Lock className="w-10 h-10 text-slate-400" />
              <span className="font-[family-name:var(--font-space-grotesk),sans-serif] text-sm font-semibold text-center text-slate-400">???</span>
            </div>
          </div>
        </section>

        {/* Recent Activity Log */}
        <section className="bg-[#18181B] border border-[#27272A] rounded-lg p-6 flex flex-col h-full">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-[family-name:var(--font-space-grotesk),sans-serif] text-xl font-bold">Terminal Log</h3>
            <Terminal className="text-slate-400 w-5 h-5" />
          </div>
          <div className="font-mono text-[13px] leading-relaxed text-slate-400 flex flex-col gap-2 overflow-y-auto max-h-[300px] pr-2 custom-scrollbar">
            
            <div className="flex gap-2 group hover:bg-[#27272A] p-1 rounded transition-colors">
              <span className="text-[#05b7d6] shrink-0">&gt;</span>
              <span className="text-slate-400 shrink-0">[10/24 14:32]</span>
              <span className="text-[#10B981] shrink-0">Module_Complete:</span>
              <span className="text-slate-100">Navigation Basics</span>
              <span className="text-[#FBBF24] ml-auto shrink-0">+50 XP</span>
            </div>
            
            <div className="flex gap-2 group hover:bg-[#27272A] p-1 rounded transition-colors">
              <span className="text-[#05b7d6] shrink-0">&gt;</span>
              <span className="text-slate-400 shrink-0">[10/24 14:15]</span>
              <span className="text-[#05b7d6]/70 shrink-0">Lesson_Pass:</span>
              <span className="text-slate-100">Push and Pop</span>
              <span className="text-[#FBBF24] ml-auto shrink-0">+10 XP</span>
            </div>
            
            <div className="flex gap-2 group hover:bg-[#27272A] p-1 rounded transition-colors">
              <span className="text-[#05b7d6] shrink-0">&gt;</span>
              <span className="text-slate-400 shrink-0">[10/24 13:40]</span>
              <span className="text-[#F59E0B] shrink-0">Badge_Earned:</span>
              <span className="text-slate-100">State Architect</span>
              <span className="text-[#FBBF24] ml-auto shrink-0">+100 XP</span>
            </div>
            
            <div className="flex gap-2 group hover:bg-[#27272A] p-1 rounded transition-colors">
              <span className="text-[#05b7d6] shrink-0">&gt;</span>
              <span className="text-slate-400 shrink-0">[10/23 09:12]</span>
              <span className="text-[#10B981] shrink-0">Module_Complete:</span>
              <span className="text-slate-100">Stateful Widgets</span>
              <span className="text-[#FBBF24] ml-auto shrink-0">+50 XP</span>
            </div>
            
            <div className="flex gap-2 group hover:bg-[#27272A] p-1 rounded transition-colors">
              <span className="text-[#05b7d6] shrink-0">&gt;</span>
              <span className="text-slate-400 shrink-0">[10/23 08:55]</span>
              <span className="text-[#05b7d6]/70 shrink-0">Lesson_Pass:</span>
              <span className="text-slate-100">setState() deep dive</span>
              <span className="text-[#FBBF24] ml-auto shrink-0">+10 XP</span>
            </div>
            
            <div className="flex gap-2 group hover:bg-[#27272A] p-1 rounded transition-colors opacity-70">
              <span className="text-[#05b7d6] shrink-0">&gt;</span>
              <span className="text-slate-400 shrink-0">[10/22 16:20]</span>
              <span className="text-[#05b7d6]/70 shrink-0">Lesson_Pass:</span>
              <span className="text-slate-100">Intro to State</span>
              <span className="text-[#FBBF24] ml-auto shrink-0">+10 XP</span>
            </div>
            
            <div className="flex gap-2 mt-2">
              <span className="text-[#05b7d6] animate-pulse">_</span>
            </div>
          </div>
        </section>

      </div>

      <style dangerouslySetInnerHTML={{__html:`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
          height: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #09090B;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #27272A;
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #3f3f46;
        }
      `}} />
    </div>
  );
}
