import { createClient } from "@/lib/supabase/server";
import { BookOpen, CheckCircle2, Lock, PlayCircle, Clock, FileText, Code2, PenTool, Flag, AlertCircle } from "lucide-react";
import Link from "next/link";

export default async function LearnPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Fetch dynamic courses, modules, and lessons from Supabase
  const { data: courses, error } = await supabase
    .from("courses")
    .select(`
      *,
      modules (
        *,
        lessons (
          id,
          slug,
          lesson_type,
          runtime_mode,
          assessment_mode,
          order_index,
          duration_minutes,
          lesson_translations (title, locale)
        )
      )
    `)
    .eq("status", "published")
    .order("created_at", { ascending: true })
    .order("order_index", { foreignTable: "modules", ascending: true });

  const safeCourses = courses || [];

  // Fetch user progress
  const { data: userProgress } = await supabase
    .from("user_lesson_progress")
    .select("lesson_id, status")
    .eq("user_id", user?.id || "");
    
  const progressMap = new Map(userProgress?.map(p => [p.lesson_id, p.status]) || []);

  const getLessonIcon = (runtimeMode: string, assessmentMode: string) => {
    if (assessmentMode === 'graded') return <Flag className="w-4 h-4" />;
    if (runtimeMode === 'browser_lab' || runtimeMode === 'project_lab') return <Code2 className="w-4 h-4" />;
    return <FileText className="w-4 h-4" />;
  };

  const getLessonBadge = (runtimeMode: string, assessmentMode: string) => {
    if (assessmentMode === 'graded') {
      return <span className="px-2 py-0.5 bg-purple-100 text-purple-700 text-[10px] uppercase tracking-wider rounded-full font-bold flex items-center gap-1 border border-purple-200 shrink-0">Checkpoint Project</span>;
    }
    if (runtimeMode === 'browser_lab') {
      return <span className="px-2 py-0.5 bg-orange-100 text-orange-700 text-[10px] uppercase tracking-wider rounded-full font-bold flex items-center gap-1 border border-orange-200 shrink-0">Browser Lab</span>;
    }
    return <span className="px-2 py-0.5 bg-blue-100 text-blue-700 text-[10px] uppercase tracking-wider rounded-full font-bold flex items-center gap-1 border border-blue-200 shrink-0">Konsep</span>;
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto pb-20">
      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-2">Roadmap Belajar</h1>
        <p className="text-slate-600">Peta perjalanan belajarmu dari nol sampai bisa membuat aplikasi Flutter sungguhan.</p>
      </div>

      <div className="space-y-6">
        {safeCourses.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-2xl border border-slate-200">
            <p className="text-slate-500">Belum ada course yang tersedia.</p>
          </div>
        ) : (
          safeCourses.map((course) => {
            const allLessonsCount = course.modules?.reduce((acc: number, mod: any) => acc + (mod.lessons?.length || 0), 0) || 0;
            const completedLessonsCount = course.modules?.reduce((acc: number, mod: any) => {
              return acc + (mod.lessons?.filter((l: any) => progressMap.get(l.id) === 'completed').length || 0);
            }, 0) || 0;
            
            const progress = allLessonsCount > 0 ? Math.round((completedLessonsCount / allLessonsCount) * 100) : 0; 
            
            // Sort modules and lessons
            course.modules?.sort((a: any, b: any) => a.order_index - b.order_index);
            course.modules?.forEach((mod: any) => {
              mod.lessons?.sort((a: any, b: any) => a.order_index - b.order_index);
            });

            // Flatten to calculate global locking and find "Mulai dari sini"
            const flatLessons: any[] = [];
            course.modules?.forEach((m: any) => {
              m.lessons?.forEach((l: any) => flatLessons.push(l));
            });

            let firstActionableLessonId: string | null = null;
            for (let i = 0; i < flatLessons.length; i++) {
              if (progressMap.get(flatLessons[i].id) !== 'completed') {
                firstActionableLessonId = flatLessons[i].id;
                break;
              }
            }

            return (
              <div key={course.id} className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden text-slate-900">
                {/* Header Course */}
                <div className="p-6 sm:p-8 bg-slate-900 text-white relative overflow-hidden">
                  <div className="absolute -right-10 -bottom-10 opacity-10">
                    <BookOpen className="w-64 h-64" />
                  </div>
                  <div className="relative z-10">
                    <div className="flex flex-wrap items-center gap-3 mb-4">
                      <span className="px-3 py-1 bg-blue-600/30 text-blue-300 text-xs font-semibold rounded-full border border-blue-500/30">
                        Beginner Path
                      </span>
                      <span className="px-3 py-1 bg-white/10 text-white text-xs font-semibold rounded-full flex items-center gap-1">
                        <Clock className="w-3 h-3" /> Estimasi {course.estimated_minutes ? `${Math.floor(course.estimated_minutes / 60)} Jam` : "TBD"}
                      </span>
                    </div>
                    <h2 className="text-3xl font-bold mb-3">{course.title}</h2>
                    <p className="text-slate-300 max-w-xl leading-relaxed">{course.description}</p>
                    
                    <div className="mt-8 flex items-center gap-4">
                      <div className="flex-1 max-w-md">
                        <div className="flex justify-between text-sm mb-2 text-slate-300 font-medium">
                          <span>Progres {progress}%</span>
                          <span>{completedLessonsCount} / {allLessonsCount} Materi</span>
                        </div>
                        <div className="w-full bg-white/10 h-2.5 rounded-full overflow-hidden">
                          <div className="bg-blue-500 h-full transition-all duration-500 rounded-full" style={{ width: `${progress}%` }} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Modules List */}
                <div className="p-6 sm:p-8">
                  <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                    <MapPinIcon className="w-5 h-5 text-blue-600" />
                    Peta Modul Pembelajaran
                  </h3>
                  
                  <div className="space-y-8 pl-2 sm:pl-4 border-l-2 border-slate-100">
                    {course.modules?.map((mod: any, index: number) => {
                      const modCompletedCount = mod.lessons?.filter((l: any) => progressMap.get(l.id) === 'completed').length || 0;
                      const modLessonsCount = mod.lessons?.length || 0;
                      const modCompleted = modLessonsCount > 0 && modCompletedCount === modLessonsCount;
                      
                      // Check if the previous lesson across the course is completed to determine if module is unlocked
                      const firstLessonInMod = mod.lessons?.[0];
                      const firstLessonIndex = flatLessons.findIndex(l => l.id === firstLessonInMod?.id);
                      const isUnlocked = firstLessonIndex <= 0 || progressMap.get(flatLessons[firstLessonIndex - 1]?.id) === 'completed';

                      const firstActionableInMod = mod.lessons?.find((l: any) => l.id === firstActionableLessonId);
                      const targetUrl = firstActionableInMod ? `/lesson/${firstActionableInMod.slug}` : (firstLessonInMod ? `/lesson/${firstLessonInMod.slug}` : `#`);

                      return (
                        <div key={mod.id} className="relative">
                          {/* Timeline dot */}
                          <div className={`absolute -left-[13px] sm:-left-[21px] top-6 w-6 h-6 rounded-full border-4 border-white flex items-center justify-center ${modCompleted ? 'bg-green-500' : isUnlocked ? 'bg-blue-500' : 'bg-slate-300'}`}></div>

                          <div className="border border-slate-200 rounded-xl overflow-hidden bg-white ml-6">
                            <Link 
                              href={targetUrl} 
                              className={`group p-4 sm:p-5 flex items-start sm:items-center justify-between gap-4 block hover:bg-slate-50 transition-all ${!isUnlocked ? 'opacity-70 pointer-events-none' : ''}`}
                            >
                              <div className="flex items-start sm:items-center gap-4">
                                {modCompleted ? (
                                  <div className="w-12 h-12 shrink-0 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                                    <CheckCircle2 className="w-7 h-7" />
                                  </div>
                                ) : isUnlocked ? (
                                  <div className="w-12 h-12 shrink-0 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 border border-blue-200">
                                    <PlayCircle className="w-7 h-7" />
                                  </div>
                                ) : (
                                  <div className="w-12 h-12 shrink-0 rounded-full bg-slate-100 flex items-center justify-center text-slate-400">
                                    <Lock className="w-6 h-6" />
                                  </div>
                                )}
                                <div>
                                  <div className="flex items-center gap-2 mb-1">
                                    <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Modul {index + 1}</span>
                                    {modCompleted && <span className="text-xs font-medium px-2 py-0.5 rounded-full text-green-700 bg-green-100">Selesai</span>}
                                  </div>
                                  <h4 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors">{mod.title}</h4>
                                  <p className="text-sm text-slate-600 mt-1">{mod.description}</p>
                                </div>
                              </div>
                            </Link>
                            
                            {/* Lessons inside Module Preview */}
                            <div className="bg-slate-50/80 border-t border-slate-100 px-4 py-4 sm:px-6 flex flex-col gap-3">
                              {mod.lessons?.map((lesson: any) => {
                                const trans = lesson.lesson_translations?.find((t: any) => t.locale === 'id') || lesson.lesson_translations?.[0];
                                const title = trans?.title || lesson.slug;
                                const isLessonCompleted = progressMap.get(lesson.id) === 'completed';
                                const flatIdx = flatLessons.findIndex(l => l.id === lesson.id);
                                const isLessonUnlocked = flatIdx <= 0 || progressMap.get(flatLessons[flatIdx - 1]?.id) === 'completed';
                                const isNextUp = lesson.id === firstActionableLessonId;

                                return (
                                  <div key={lesson.id} className="relative group/lesson">
                                    {isNextUp && (
                                      <div className="absolute -left-2 top-1/2 -translate-y-1/2 w-1 h-full max-h-8 bg-blue-500 rounded-r-full"></div>
                                    )}
                                    <Link 
                                      href={`/lesson/${lesson.slug}`}
                                      className={`flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 p-3 rounded-lg border ${isNextUp ? 'bg-white border-blue-200 shadow-sm' : 'bg-transparent border-transparent hover:bg-white hover:border-slate-200'} transition-all ${!isLessonUnlocked ? 'opacity-60 pointer-events-none' : ''}`}
                                    >
                                      <div className="flex items-center gap-3 flex-1 min-w-0">
                                        <div className={`w-8 h-8 shrink-0 rounded-full flex items-center justify-center border ${isLessonCompleted ? 'bg-green-100 border-green-200 text-green-600' : isNextUp ? 'bg-blue-100 border-blue-200 text-blue-600' : isLessonUnlocked ? 'bg-white border-slate-300 text-slate-500' : 'bg-slate-100 border-slate-200 text-slate-400'}`}>
                                          {isLessonCompleted ? <CheckCircle2 className="w-4 h-4" /> : isLessonUnlocked ? getLessonIcon(lesson.runtime_mode, lesson.assessment_mode) : <Lock className="w-4 h-4" />}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                          <div className="flex items-center gap-2">
                                            <span className={`font-medium truncate ${isLessonCompleted ? 'text-slate-600 line-through' : isNextUp ? 'text-blue-700 font-bold' : isLessonUnlocked ? 'text-slate-900' : 'text-slate-500'}`}>
                                              {title}
                                            </span>
                                            {isNextUp && (
                                              <span className="hidden sm:flex px-2 py-0.5 bg-blue-600 text-white text-[10px] uppercase tracking-wider rounded-full font-bold items-center shrink-0 animate-pulse">
                                                Mulai dari sini
                                              </span>
                                            )}
                                          </div>
                                          {lesson.duration_minutes && (
                                            <span className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                                              <Clock className="w-3 h-3" /> Estimasi {lesson.duration_minutes} menit
                                            </span>
                                          )}
                                        </div>
                                      </div>

                                      <div className="flex items-center gap-3 pl-11 sm:pl-0">
                                        {getLessonBadge(lesson.runtime_mode, lesson.assessment_mode)}
                                        {!isLessonUnlocked && (
                                          <span className="text-xs text-slate-400 italic hidden sm:inline-block">Selesaikan materi sebelumnya</span>
                                        )}
                                      </div>
                                    </Link>
                                  </div>
                                )
                              })}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

function MapPinIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  )
}
