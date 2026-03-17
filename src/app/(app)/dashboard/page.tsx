import { createClient } from "@/lib/supabase/server";
import { PlayCircle, Award, Target, Flame, Trophy } from "lucide-react";
import Link from "next/link";

export default async function DashboardPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user?.id)
    .single();

  // Mock progress data for MVP UI
  const progressPercent = 15;
  const recentLessons = [
    { title: "Pengenalan Dart Dasar", type: "video", completed: true },
    { title: "Variabel & Tipe Data", type: "snippet", completed: true },
    { title: "Control Flow", type: "text", completed: false },
  ];

  return (
    <div className="space-y-8">
      {/* Greeting */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-2 text-slate-100 font-[family-name:var(--font-space-grotesk),sans-serif]">
          Halo, {profile?.display_name || "Learner"} 👋
        </h1>
        <p className="text-slate-400">Siap untuk melanjutkan petualangan Flutter hari ini?</p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {/* Main Column: Continue and Progress */}
        <div className="md:col-span-2 space-y-6">
          
          {/* Continue Learning Card */}
          <div className="bg-[#18181B] p-6 rounded-2xl border border-[#27272A] shadow-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-5">
              <PlayCircle className="w-40 h-40 text-white" />
            </div>
            <div className="relative z-10">
              <span className="inline-block px-3 py-1 bg-[#05b7d6]/10 text-[#05b7d6] text-xs font-semibold rounded-full mb-4">
                Lanjutkan Belajar
              </span>
              <h2 className="text-2xl font-bold mb-2 text-slate-100 font-[family-name:var(--font-space-grotesk),sans-serif]">Control Flow di Dart</h2>
              <p className="text-slate-400 mb-6">Course 1 • Modul 1</p>
              
              <Link href="/lesson/control-flow" className="inline-flex items-center justify-center px-6 py-3 bg-[#05b7d6] hover:bg-[#0891B2] text-[#09090B] font-bold rounded-xl shadow-[0_0_12px_rgba(5,183,214,0.3)] transition-all">
                Mulai Belajar
              </Link>
            </div>
          </div>

          {/* Current Course Progress */}
          <div className="bg-[#18181B] p-6 rounded-2xl border border-[#27272A] shadow-sm">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-bold text-lg text-slate-100 font-[family-name:var(--font-space-grotesk),sans-serif]">Progres Path Beginner</h3>
              <span className="text-sm font-medium text-[#05b7d6]">{progressPercent}%</span>
            </div>
            
            <div className="w-full bg-[#27272A] h-3 rounded-full overflow-hidden mb-6">
              <div 
                className="bg-[#05b7d6] h-full rounded-full shadow-[0_0_8px_rgba(5,183,214,0.6)]" 
                style={{ width: `${progressPercent}%` }}
              />
            </div>

            <h4 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-4">Lesson Terakhir</h4>
            <div className="space-y-3">
              {recentLessons.map((lesson, i) => (
                <div key={i} className="flex flex-col sm:flex-row sm:items-center justify-between p-3 rounded-lg bg-[#09090B] border border-[#27272A]">
                  <div className="flex items-center gap-3">
                    {lesson.completed ? (
                      <div className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                    ) : (
                      <div className="w-6 h-6 rounded-full bg-[#18181B] border border-[#27272A]" />
                    )}
                    <span className={`font-medium ${lesson.completed ? 'text-slate-300' : 'text-slate-100'}`}>
                      {lesson.title}
                    </span>
                  </div>
                  {lesson.type && (
                     <span className="text-xs text-slate-500 capitalize ml-9 sm:ml-0 mt-2 sm:mt-0">
                       {lesson.type}
                     </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Stats and Gamification */}
        <div className="space-y-6">
          
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-[#18181B] p-5 rounded-2xl border border-[#27272A] shadow-sm flex flex-col items-center justify-center text-center">
              <Flame className="w-8 h-8 text-orange-500 mb-2 drop-shadow-[0_0_8px_rgba(249,115,22,0.4)]" />
              <span className="text-2xl font-bold text-slate-100 font-[family-name:var(--font-space-grotesk),sans-serif]">{profile?.current_streak || 0}</span>
              <span className="text-xs text-slate-500 uppercase font-semibold">Streak Hari</span>
            </div>
            <div className="bg-[#18181B] p-5 rounded-2xl border border-[#27272A] shadow-sm flex flex-col items-center justify-center text-center">
              <Trophy className="w-8 h-8 text-yellow-500 mb-2 drop-shadow-[0_0_8px_rgba(234,179,8,0.4)]" />
              <span className="text-2xl font-bold text-slate-100 font-[family-name:var(--font-space-grotesk),sans-serif]">{profile?.total_xp || 0}</span>
              <span className="text-xs text-slate-500 uppercase font-semibold">Total XP</span>
            </div>
          </div>

          <div className="bg-[#18181B] p-6 rounded-2xl border border-[#27272A] shadow-sm">
            <h3 className="font-bold mb-4 flex items-center gap-2 text-slate-100 font-[family-name:var(--font-space-grotesk),sans-serif]">
              <Target className="w-5 h-5 text-[#05b7d6]" />
              Target Harian
            </h3>
            <p className="text-slate-400 text-sm mb-4">Selesaikan 1 lesson untuk memperpanjang streak belajarmu.</p>
            <div className="h-12 border-2 border-dashed border-[#27272A] rounded-xl flex items-center justify-center text-sm font-medium text-slate-500 bg-[#09090B]">
              Belum selesai hari ini
            </div>
          </div>

          <div className="bg-[#18181B] p-6 rounded-2xl border border-[#27272A] shadow-sm">
            <h3 className="font-bold mb-4 text-slate-100 font-[family-name:var(--font-space-grotesk),sans-serif]">Lencana Terbaru</h3>
            <div className="flex flex-col items-center justify-center p-6 bg-[#09090B] rounded-xl text-center border border-[#27272A]">
              <Award className="w-12 h-12 text-slate-600 mb-3" />
              <p className="text-sm font-medium text-slate-500">Belum ada lencana.</p>
              <p className="text-xs text-slate-600 mt-1">Selesaikan lesson pertama!</p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}