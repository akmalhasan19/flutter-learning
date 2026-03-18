import React from 'react';
import Link from 'next/link';
import { Check, Play, Lock, ChevronRight, Clock, FileText, PlayCircle } from 'lucide-react';
import { ViewTracker } from '@/lib/analytics/ViewTracker';
import { createClient } from '@/lib/supabase/server';
import IdeSidebarStats from '../components/IdeSidebarStats';
import IdeBottomBar from '../components/IdeBottomBar';
import ResizableWorkspace from '../components/ResizableWorkspace';
import RuntimeAdapter from '../components/RuntimeAdapter';
import { loadLessonContent } from '@/lib/content/loader';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

export default async function IdeLessonPage({ 
  params 
}: { 
  params: Promise<{ lessonSlug: string }> 
}) {
  const { lessonSlug } = await params;
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  
  // 1. Fetch current lesson with translation, module, and course context
  const { data: lesson, error } = await supabase
    .from("lessons")
    .select(`
      *,
      modules (
        id, title, slug, order_index,
        courses ( id, title, slug )
      ),
      lesson_translations (*)
    `)
    .eq("slug", lessonSlug)
    .single();

  if (!lesson) {
    return (
      <div className="flex h-screen items-center justify-center bg-slate-900 text-white flex-col gap-4">
        <h1 className="text-2xl font-bold">Lesson not found</h1>
        <p className="text-slate-400">The lesson you are looking for does not exist.</p>
        <Link href="/learn" className="text-blue-400 hover:underline">Return to Curriculum</Link>
      </div>
    );
  }

  // 2. Resolve localization (fallback to 'id')
  const translation = lesson.lesson_translations?.find((t: any) => t.locale === 'id') 
                   || lesson.lesson_translations?.[0]
                   || { title: 'Untitled', summary: '', body_ref: null };

  // 3. Load Markdown Content
  const content = await loadLessonContent(translation.body_ref);

  // 4. Fetch the entire course curriculum to render the sidebar and compute next/prev lessons
  const { data: courseData } = await supabase
    .from("courses")
    .select(`
      id,
      modules (
        id, title, slug, order_index,
        lessons (
          id, title:slug, slug, order_index,
          lesson_translations (title, locale)
        )
      )
    `)
    .eq("id", lesson.modules.courses.id)
    .single();

  // Fetch user progress for gating logic
  const { data: userProgress } = await supabase
    .from("user_lesson_progress")
    .select("lesson_id, status")
    .eq("user_id", user?.id || "");
    
  const progressMap = new Map(userProgress?.map(p => [p.lesson_id, p.status]) || []);

  let sidebarModules: any[] = [];
  let nextLessonSlug: string | null = null;
  let previousLessonSlug: string | null = null;

  if (courseData && courseData.modules) {
    // Sort modules
    courseData.modules.sort((a: any, b: any) => a.order_index - b.order_index);
    
    // Flatten lessons to find next/prev easily
    const flatLessons: any[] = [];

    sidebarModules = courseData.modules.map((m: any) => {
      // Sort lessons in module
      m.lessons.sort((a: any, b: any) => a.order_index - b.order_index);
      
      const mappedLessons = m.lessons.map((l: any) => {
        const trans = l.lesson_translations?.find((t: any) => t.locale === 'id') || l.lesson_translations?.[0];
        const title = trans?.title || l.slug;
        const mappedL = { ...l, displayTitle: title };
        flatLessons.push(mappedL);
        return mappedL;
      });

      return {
        id: m.id,
        title: m.title || m.slug,
        lessons: mappedLessons
      };
    });

    // Compute locked/completed states
    flatLessons.forEach((l, index) => {
      l.completed = progressMap.get(l.id) === 'completed';
      if (index === 0) {
        l.locked = false;
        l.blockingReason = null;
      } else {
        const prevLesson = flatLessons[index - 1];
        l.locked = !prevLesson.completed;
        if (l.locked) {
           l.blockingReason = prevLesson.assessment_mode === 'graded' 
             ? `Must pass project '${prevLesson.displayTitle}' first.`
             : `Must complete '${prevLesson.displayTitle}' first.`;
        }
      }
    });

    const currentIndex = flatLessons.findIndex((l: any) => l.slug === lessonSlug);
    
    // Check lock status for current lesson
    if (currentIndex !== -1 && flatLessons[currentIndex].locked) {
       // Track blocking event via a small script inline or Server Analytics 
       // For Server Analytics, we will just call it before returning the view
       import('@/lib/analytics/events').then(({ trackEvent }) => {
          trackEvent('lesson_blocked_by_assessment', {
            userId: user?.id,
            lessonId: flatLessons[currentIndex].id,
            lessonSlug: lessonSlug,
            reason: flatLessons[currentIndex].blockingReason
          });
       }).catch(console.error);
       
       return (
        <div className="flex h-screen items-center justify-center bg-slate-900 text-white flex-col gap-4">
          <Lock className="w-12 h-12 text-slate-500 mb-2" />
          <h1 className="text-2xl font-bold">Lesson Locked</h1>
          <p className="text-slate-400">{flatLessons[currentIndex].blockingReason}</p>
          <Link href="/learn" className="px-6 py-2 bg-[#05b7d6] text-[#09090B] font-bold rounded-lg mt-4 hover:bg-[#0891B2] transition-colors">
            Return to Curriculum
          </Link>
        </div>
      );
    }

    if (currentIndex > 0) {
      previousLessonSlug = flatLessons[currentIndex - 1].slug;
    }
    if (currentIndex < flatLessons.length - 1) {
      nextLessonSlug = flatLessons[currentIndex + 1].slug;
    }
  }

  // User details
  let displayName = "Learner";
  if (user) {
    const { data: profile } = await supabase
      .from("profiles")
      .select("display_name")
      .eq("id", user.id)
      .single();
    if (profile?.display_name) {
      displayName = profile.display_name;
    }
  }

  return (
    <>
      <ViewTracker event="lesson_started" properties={{ slug: lessonSlug }} />
      
      {/* Main Workspace */}
      <div className="flex flex-1 overflow-hidden h-[calc(100vh-64px)]">
        
        {/* Left Sidebar */}
        <aside className="w-[280px] shrink-0 bg-[#18181B] border-r border-[#27272A] flex flex-col h-full z-10">
          <IdeSidebarStats displayName={displayName} />

          {/* Curriculum List */}
          <div className="flex-1 overflow-y-auto py-4 custom-scrollbar">
            {sidebarModules.map((module: any) => (
              <div key={module.id} className="mb-4">
                <div className="px-4 mb-2">
                  <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider font-[family-name:var(--font-space-grotesk),sans-serif]">
                    {module.title}
                  </h3>
                </div>
                <nav className="flex flex-col space-y-1 px-2">
                  {module.lessons.map((l: any) => {
                    const isActive = l.slug === lessonSlug;
                    const completed = l.completed;
                    const locked = l.locked;

                    if (isActive) {
                      return (
                        <div key={l.slug} className="relative flex items-center gap-3 px-3 py-2 bg-[#27272A] rounded-md text-sm text-slate-100 group">
                          <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-[#05b7d6] rounded-l-md"></div>
                          <div className="w-5 h-5 rounded-full bg-[#05b7d6]/20 flex items-center justify-center shrink-0 border border-[#05b7d6]/50">
                            <Play className="w-[14px] h-[14px] text-[#05b7d6] ml-0.5" />
                          </div>
                          <span className="truncate font-medium">{l.displayTitle}</span>
                        </div>
                      );
                    }
                    if (completed) {
                      return (
                        <Link key={l.slug} href={`/lesson/${l.slug}`} className="flex items-center gap-3 px-3 py-2 rounded-md text-sm text-slate-300 hover:bg-[#27272A] hover:text-slate-100 transition-colors group">
                          <div className="w-5 h-5 rounded-full bg-[#10B981]/20 flex items-center justify-center shrink-0 border border-[#10B981]/30 group-hover:border-[#10B981]/50">
                            <Check className="w-[14px] h-[14px] text-[#10B981]" />
                          </div>
                          <span className="truncate">{l.displayTitle}</span>
                        </Link>
                      );
                    }
                    if (locked) {
                      return (
                        <div key={l.slug} className="flex items-center gap-3 px-3 py-2 rounded-md text-sm text-slate-500 hover:bg-[#27272A] transition-colors group cursor-not-allowed">
                          <div className="w-5 h-5 rounded-full bg-[#27272A] flex items-center justify-center shrink-0 border border-[#27272A]">
                            <Lock className="w-[12px] h-[12px]" />
                          </div>
                          <span className="truncate">{l.displayTitle}</span>
                        </div>
                      );
                    }
                    return (
                      <Link key={l.slug} href={`/lesson/${l.slug}`} className="flex items-center gap-3 px-3 py-2 rounded-md text-sm text-slate-300 hover:bg-[#27272A] hover:text-slate-100 transition-colors group">
                        <div className="w-5 h-5 rounded-full bg-[#27272A] flex items-center justify-center shrink-0 border border-[#27272A]">
                          <Play className="w-[12px] h-[12px] text-slate-500" />
                        </div>
                        <span className="truncate">{l.displayTitle}</span>
                      </Link>
                    );
                  })}
                </nav>
              </div>
            ))}
          </div>
        </aside>

        {/* Main Content Area */}
        <ResizableWorkspace 
          topContent={
            <div className="h-full overflow-y-auto bg-[#09090B] p-8 relative flex flex-col custom-scrollbar">
              <div className="max-w-4xl mx-auto w-full">
                {/* Breadcrumbs & Meta */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center text-sm text-slate-400 gap-2 font-[family-name:var(--font-space-grotesk),sans-serif]">
                    <span>{lesson.modules.title || lesson.modules.slug}</span>
                    <ChevronRight className="w-4 h-4" />
                    <span className="text-[#05b7d6]">{translation.title}</span>
                  </div>
                  <div className="px-2 py-1 border border-[#27272A] rounded text-xs text-slate-400 flex items-center gap-1 bg-[#18181B]">
                    <Clock className="w-[14px] h-[14px]" />
                    {lesson.duration_minutes ? `${lesson.duration_minutes} min` : "5 min read"}
                  </div>
                </div>

                {/* Title */}
                <h1 className="font-[family-name:var(--font-space-grotesk),sans-serif] text-3xl font-bold mb-6 text-slate-100">
                  {translation.title}
                </h1>

                <div className="flex flex-col xl:flex-row gap-8 items-start">
                  {/* Text Content rendered with Markdown */}
                  <div className="flex-1 prose prose-invert prose-slate max-w-none text-slate-300 text-[15px] leading-relaxed">
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                      {content}
                    </ReactMarkdown>
                  </div>

                  {/* Video (if any) */}
                  {lesson.video_path && (
                    <div className="w-full xl:w-[480px] aspect-video shrink-0 bg-[#18181B] border border-[#27272A] rounded-lg relative flex items-center justify-center overflow-hidden group cursor-pointer">
                      {/* Placeholder video thumbnail */}
                      <div className="absolute inset-0 bg-gradient-to-t from-[#09090B]/80 to-transparent"></div>
                      
                      <div className="w-16 h-16 rounded-full bg-[#05b7d6]/20 flex items-center justify-center border-2 border-[#05b7d6]/50 backdrop-blur-sm group-hover:scale-110 transition-transform z-10 shadow-[0_0_0_1px_#05b7d6,0_0_12px_rgba(5,183,214,0.2)]">
                        <Play className="w-8 h-8 text-[#05b7d6] translate-x-0.5 fill-current" />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          }
          bottomContent={lesson.runtime_mode !== 'none' ? <RuntimeAdapter lesson={lesson} /> : undefined}
        />
      </div>

      <IdeBottomBar 
        lessonSlug={lesson.slug} 
        previousSlug={previousLessonSlug}
        assessmentMode={lesson.assessment_mode}
        expectedOutcomes={translation.expected_outcomes || []}
      />
    </>
  );
}
