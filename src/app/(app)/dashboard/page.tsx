import { createClient } from "@/lib/supabase/server";
import { PlayCircle, Award, Target, Flame, Trophy, ArrowRight, CheckCircle2 } from "lucide-react";
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

  // Fetch courses with their modules and lessons in order
  const { data: courses } = await supabase
    .from("courses")
    .select(`
      id,
      slug,
      title,
      modules (
        id, title, slug, order_index,
        lessons (
          id, slug, lesson_type, runtime_mode, assessment_mode, order_index,
          lesson_translations (title, locale)
        )
      )
    `)
    .eq("status", "published")
    .order("created_at", { ascending: true })
    .order("order_index", { foreignTable: "modules", ascending: true })
    .limit(1); // Assume beginner path is the first course for MVP

  // Fetch user progress
  const { data: userProgress } = await supabase
    .from("user_lesson_progress")
    .select("lesson_id, status, completed_at")
    .eq("user_id", user?.id || "");
    
  const progressMap = new Map(userProgress?.map(p => [p.lesson_id, p.status]) || []);

  let nextLesson = null;
  let nextLessonTitle = "";
  let isCourseCompleted = false;
  let progressPercent = 0;
  let recentLessons: any[] = [];

  if (courses && courses.length > 0) {
    const course = courses[0];
    
    // Sort modules and lessons
    course.modules?.sort((a: any, b: any) => a.order_index - b.order_index);
    course.modules?.forEach((mod: any) => {
      mod.lessons?.sort((a: any, b: any) => a.order_index - b.order_index);
    });

    const flatLessons: any[] = [];
    course.modules?.forEach((m: any) => {
      m.lessons?.forEach((l: any) => {
        flatLessons.push({
          ...l,
          moduleTitle: m.title || m.slug
        });
      });
    });

    const completedCount = flatLessons.filter(l => progressMap.get(l.id) === 'completed').length;
    progressPercent = flatLessons.length > 0 ? Math.round((completedCount / flatLessons.length) * 100) : 0;

    // Find first uncompleted lesson
    const nextLessonIndex = flatLessons.findIndex(l => progressMap.get(l.id) !== 'completed');
    
    if (nextLessonIndex !== -1) {
      nextLesson = flatLessons[nextLessonIndex];
      const trans = nextLesson.lesson_translations?.find((t: any) => t.locale === 'id') || nextLesson.lesson_translations?.[0];
      nextLessonTitle = trans?.title || nextLesson.slug;
    } else if (flatLessons.length > 0) {
      isCourseCompleted = true;
    }

    // Get 3 most recently completed/started lessons based on order for now
    // A better approach would be sorting by `completed_at` or `started_at`
    if (nextLessonIndex !== -1) {
      recentLessons = flatLessons.slice(Math.max(0, nextLessonIndex - 2), nextLessonIndex + 1).reverse().map(l => {
         const trans = l.lesson_translations?.find((t: any) => t.locale === 'id') || l.lesson_translations?.[0];
         return {
           title: trans?.title || l.slug,
           type: l.runtime_mode === 'browser' ? 'lab' : l.assessment_mode === 'graded' ? 'project' : 'concept',
           completed: progressMap.get(l.id) === 'completed'
         }
      });
    } else if (flatLessons.length > 0) {
      recentLessons = flatLessons.slice(-3).reverse().map(l => {
        const trans = l.lesson_translations?.find((t: any) => t.locale === 'id') || l.lesson_translations?.[0];
        return {
          title: trans?.title || l.slug,
          type: l.runtime_mode === 'browser' ? 'lab' : l.assessment_mode === 'graded' ? 'project' : 'concept',
          completed: true
        }
     });
    }
  }

  // Fetch badges
  const { data: badges } = await supabase
    .from("user_badges")
    .select("badges(*)")
    .eq("user_id", user?.id || "");

  // Check if they completed a lesson today
  const today = new Date().toISOString().split('T')[0];
  const { data: dailyActivity } = await supabase
    .from('daily_activity')
    .select('lessons_completed')
    .eq('user_id', user?.id || "")
    .eq('activity_date', today)
    .single();
    
  const hasCompletedLessonToday = (dailyActivity?.lessons_completed || 0) > 0;

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
              {isCourseCompleted ? (
                 <>
                  <span className="inline-flex items-center gap-1 px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold rounded-full mb-4">
                    <CheckCircle2 className="w-3 h-3" /> Selesai
                  </span>
                  <h2 className="text-2xl font-bold mb-2 text-slate-100 font-[family-name:var(--font-space-grotesk),sans-serif]">Selamat! 🎉</h2>
                  <p className="text-slate-400 mb-6 max-w-md">Kamu telah menyelesaikan seluruh kurikulum Beginner Path.</p>
                  
                  <Link href="/learn" className="inline-flex items-center justify-center px-6 py-3 bg-[#27272A] hover:bg-[#3F3F46] text-slate-100 font-bold rounded-xl transition-all">
                    Lihat Kurikulum
                  </Link>
                 </>
              ) : nextLesson ? (
                <>
                  <div className="flex items-center gap-2 mb-4">
                    <span className="inline-block px-3 py-1 bg-[#05b7d6]/10 text-[#05b7d6] text-xs font-semibold rounded-full">
                      Lanjutkan Belajar
                    </span>
                    {nextLesson.assessment_mode === 'graded' && (
                      <span className="inline-block px-3 py-1 bg-purple-500/10 text-purple-400 border border-purple-500/20 text-xs font-semibold rounded-full">
                        Project Lab
                      </span>
                    )}
                    {nextLesson.runtime_mode === 'browser' && (
                      <span className="inline-block px-3 py-1 bg-orange-500/10 text-orange-400 border border-orange-500/20 text-xs font-semibold rounded-full">
                        Browser Lab
                      </span>
                    )}
                  </div>
                  <h2 className="text-2xl font-bold mb-2 text-slate-100 font-[family-name:var(--font-space-grotesk),sans-serif]">{nextLessonTitle}</h2>
                  <p className="text-slate-400 mb-6">{courses?.[0]?.title || 'Course'} • {nextLesson.moduleTitle}</p>
                  
                  <Link href={`/lesson/${nextLesson.slug}`} className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#05b7d6] hover:bg-[#0891B2] text-[#09090B] font-bold rounded-xl shadow-[0_0_12px_rgba(5,183,214,0.3)] transition-all">
                    Mulai Belajar <ArrowRight className="w-4 h-4" />
                  </Link>
                </>
              ) : (
                <>
                  <span className="inline-block px-3 py-1 bg-[#05b7d6]/10 text-[#05b7d6] text-xs font-semibold rounded-full mb-4">
                    Mulai Perjalanan
                  </span>
                  <h2 className="text-2xl font-bold mb-2 text-slate-100 font-[family-name:var(--font-space-grotesk),sans-serif]">Pilih Kurikulum</h2>
                  <p className="text-slate-400 mb-6 max-w-md">Pilih jalur belajar yang tersedia untuk mulai mendapatkan XP.</p>
                  
                  <Link href="/learn" className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#05b7d6] hover:bg-[#0891B2] text-[#09090B] font-bold rounded-xl shadow-[0_0_12px_rgba(5,183,214,0.3)] transition-all">
                    Buka Kurikulum <ArrowRight className="w-4 h-4" />
                  </Link>
                </>
              )}
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
                className="bg-[#05b7d6] h-full rounded-full shadow-[0_0_8px_rgba(5,183,214,0.6)] transition-all duration-1000" 
                style={{ width: `${progressPercent}%` }}
              />
            </div>

            <h4 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-4">Aktivitas Terakhir</h4>
            {recentLessons.length > 0 ? (
              <div className="space-y-3">
                {recentLessons.map((lesson, i) => (
                  <div key={i} className="flex flex-col sm:flex-row sm:items-center justify-between p-3 rounded-lg bg-[#09090B] border border-[#27272A]">
                    <div className="flex items-center gap-3">
                      {lesson.completed ? (
                        <div className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                          <CheckCircle2 className="w-4 h-4" />
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
            ) : (
               <p className="text-slate-500 text-sm">Belum ada aktivitas lesson.</p>
            )}
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
            
            {hasCompletedLessonToday ? (
               <div className="h-12 border border-emerald-500/30 rounded-xl flex items-center justify-center gap-2 text-sm font-medium text-emerald-400 bg-emerald-500/10">
                 <CheckCircle2 className="w-4 h-4" /> Target Tercapai
               </div>
            ) : (
              <div className="h-12 border-2 border-dashed border-[#27272A] rounded-xl flex items-center justify-center text-sm font-medium text-slate-500 bg-[#09090B]">
                Belum selesai hari ini
              </div>
            )}
          </div>

          <div className="bg-[#18181B] p-6 rounded-2xl border border-[#27272A] shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-slate-100 font-[family-name:var(--font-space-grotesk),sans-serif]">Lencana</h3>
              <span className="text-xs text-slate-500">{badges?.length || 0} Badge</span>
            </div>
            
            {badges && badges.length > 0 ? (
              <div className="grid grid-cols-2 gap-3">
                {badges.slice(0, 4).map((b: any) => (
                  <div key={b.badges.id} className="flex flex-col items-center justify-center p-3 bg-[#09090B] rounded-xl border border-[#27272A] text-center">
                    <div className="text-2xl mb-1">{b.badges.icon_path || "🏆"}</div>
                    <p className="text-[10px] font-bold text-slate-300 line-clamp-1">{b.badges.name}</p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center p-6 bg-[#09090B] rounded-xl text-center border border-[#27272A]">
                <Award className="w-12 h-12 text-slate-600 mb-3" />
                <p className="text-sm font-medium text-slate-500">Belum ada lencana.</p>
                <p className="text-xs text-slate-600 mt-1">Selesaikan lesson pertama!</p>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}