import { createClient } from "@/lib/supabase/server";
import { BookOpen, CheckCircle2, Lock, PlayCircle, Clock, FileText, Code2, PenTool } from "lucide-react";
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
    if (assessmentMode === 'graded') return <PenTool className="w-4 h-4" />;
    if (runtimeMode === 'browser' || runtimeMode === 'project') return <Code2 className="w-4 h-4" />;
    return <FileText className="w-4 h-4" />;
  };

  const getLessonBadge = (runtimeMode: string, assessmentMode: string) => {
    if (assessmentMode === 'graded') {
      return <span className="px-2 py-0.5 bg-purple-100 text-purple-700 text-xs rounded-full font-medium flex items-center gap-1 border border-purple-200">Project</span>;
    }
    if (runtimeMode === 'browser') {
      return <span className="px-2 py-0.5 bg-orange-100 text-orange-700 text-xs rounded-full font-medium flex items-center gap-1 border border-orange-200">Lab</span>;
    }
    return null;
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-2">Kurikulum</h1>
        <p className="text-slate-600">Pilih jalur belajarmu dan mulailah perjalanan coding-mu.</p>
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
              return acc + mod.lessons.filter((l: any) => progressMap.get(l.id) === 'completed').length;
            }, 0) || 0;
            
            const progress = allLessonsCount > 0 ? Math.round((completedLessonsCount / allLessonsCount) * 100) : 0; 
            
            // Sort modules and lessons
            course.modules?.sort((a: any, b: any) => a.order_index - b.order_index);
            course.modules?.forEach((mod: any) => {
              mod.lessons?.sort((a: any, b: any) => a.order_index - b.order_index);
            });

            // Flatten to calculate global locking
            const flatLessons: any[] = [];
            course.modules?.forEach((m: any) => {
              m.lessons?.forEach((l: any) => flatLessons.push(l));
            });

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
                        Jalur Utama
                      </span>
                      <span className="px-3 py-1 bg-white/10 text-white text-xs font-semibold rounded-full flex items-center gap-1">
                        <Clock className="w-3 h-3" /> {course.estimated_minutes ? `${Math.floor(course.estimated_minutes / 60)} Jam` : "TBD"}
                      </span>
                    </div>
                    <h2 className="text-3xl font-bold mb-3">{course.title}</h2>
                    <p className="text-slate-300 max-w-xl">{course.description}</p>
                    
                    <div className="mt-8 flex items-center gap-4">
                      <div className="flex-1 max-w-md">
                        <div className="flex justify-between text-sm mb-2 text-slate-300">
                          <span>Progres {progress}%</span>
                          <span>{completedLessonsCount} / {allLessonsCount} Lesson</span>
                        </div>
                        <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden">
                          <div className="bg-blue-500 h-full transition-all duration-500" style={{ width: `${progress}%` }} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Modules List */}
                <div className="p-6 sm:p-8">
                  <h3 className="text-lg font-bold mb-6">Modul Pembelajaran</h3>
                  
                  <div className="space-y-6">
                    {course.modules?.map((mod: any, index: number) => {
                      const modCompletedCount = mod.lessons?.filter((l: any) => progressMap.get(l.id) === 'completed').length || 0;
                      const modLessonsCount = mod.lessons?.length || 0;
                      const modCompleted = modLessonsCount > 0 && modCompletedCount === modLessonsCount;
                      
                      // Check if the previous lesson across the course is completed to determine if module is unlocked
                      const firstLessonInMod = mod.lessons?.[0];
                      const firstLessonIndex = flatLessons.findIndex(l => l.id === firstLessonInMod?.id);
                      const isUnlocked = firstLessonIndex <= 0 || progressMap.get(flatLessons[firstLessonIndex - 1]?.id) === 'completed';

                      const firstLesson = mod.lessons?.[0]?.slug ? mod.lessons[0] : null;

                      return (
                        <div key={mod.id} className="border border-slate-200 rounded-xl overflow-hidden bg-white">
                          <Link 
                            href={firstLesson ? `/lesson/${firstLesson.slug}` : `#`} 
                            className={`group p-4 sm:p-5 flex items-start sm:items-center justify-between gap-4 block hover:bg-slate-50 transition-all ${!isUnlocked && 'opacity-70 pointer-events-none'}`}
                          >
                            <div className="flex items-start sm:items-center gap-4">
                              {modCompleted ? (
                                <div className="w-10 h-10 shrink-0 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                                  <CheckCircle2 className="w-6 h-6" />
                                </div>
                              ) : isUnlocked ? (
                                <div className="w-10 h-10 shrink-0 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 border border-blue-200">
                                  <PlayCircle className="w-6 h-6" />
                                </div>
                              ) : (
                                <div className="w-10 h-10 shrink-0 rounded-full bg-slate-100 flex items-center justify-center text-slate-400">
                                  <Lock className="w-5 h-5" />
                                </div>
                              )}
                              <div>
                                <h4 className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors">{mod.title}</h4>
                                <p className="text-sm text-slate-500 mt-0.5">{modCompletedCount} / {modLessonsCount} Lesson Selesai • {mod.description}</p>
                              </div>
                            </div>
                            <div className="hidden sm:block">
                              <span className={`text-sm font-medium px-3 py-1 rounded-full transition-colors ${modCompleted ? 'text-green-600 bg-green-50' : isUnlocked ? 'text-blue-600 bg-blue-50 group-hover:bg-blue-100' : 'text-slate-500 bg-slate-100'}`}>
                                {modCompleted ? "Selesai" : isUnlocked ? "Lanjutkan" : "Terkunci"}
                              </span>
                            </div>
                          </Link>
                          
                          {/* Lessons inside Module Preview */}
                          <div className="bg-slate-50 border-t border-slate-100 px-4 py-3 sm:px-16 flex flex-col gap-2">
                            {mod.lessons?.map((lesson: any, lIndex: number) => {
                              const trans = lesson.lesson_translations?.find((t: any) => t.locale === 'id') || lesson.lesson_translations?.[0];
                              const title = trans?.title || lesson.slug;
                              const isLessonCompleted = progressMap.get(lesson.id) === 'completed';
                              const flatIdx = flatLessons.findIndex(l => l.id === lesson.id);
                              const isLessonUnlocked = flatIdx <= 0 || progressMap.get(flatLessons[flatIdx - 1]?.id) === 'completed';

                              return (
                                <Link 
                                  key={lesson.id} 
                                  href={`/lesson/${lesson.slug}`}
                                  className={`flex items-center gap-3 py-2 text-sm ${!isLessonUnlocked ? 'opacity-60 pointer-events-none' : 'hover:text-blue-600'}`}
                                >
                                  <div className={`w-6 h-6 shrink-0 rounded-full flex items-center justify-center border ${isLessonCompleted ? 'bg-green-100 border-green-200 text-green-600' : isLessonUnlocked ? 'bg-white border-slate-300 text-slate-500' : 'bg-slate-100 border-slate-200 text-slate-400'}`}>
                                    {isLessonCompleted ? <CheckCircle2 className="w-4 h-4" /> : isLessonUnlocked ? getLessonIcon(lesson.runtime_mode, lesson.assessment_mode) : <Lock className="w-3 h-3" />}
                                  </div>
                                  <span className={`flex-1 font-medium ${isLessonCompleted ? 'text-slate-700' : isLessonUnlocked ? 'text-slate-900' : 'text-slate-500'}`}>
                                    {title}
                                  </span>
                                  {getLessonBadge(lesson.runtime_mode, lesson.assessment_mode)}
                                </Link>
                              )
                            })}
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
