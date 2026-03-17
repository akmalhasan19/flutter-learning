import React from 'react';
import Link from 'next/link';
import { CheckCircle, PlayCircle, Code, ArrowRight } from 'lucide-react';
import DartpadEmbed from '@/components/learn/DartpadEmbed';

// === MOCK DATA ===
const MOCK_COURSE_MODULES = [
  {
    id: 'm1',
    title: 'Getting Started',
    lessons: [
      { slug: 'intro-to-flutter', title: 'Introduction to Flutter', completed: true },
      { slug: 'widgets-101', title: 'Widgets 101', completed: false },
      { slug: 'state-management', title: 'State Management', completed: false },
    ]
  }
];

const getLessonDetails = (slug: string) => {
  return {
    slug,
    title: slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' '),
    description: "This is a comprehensive mock guide to understanding this topic in Flutter.",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", // Placeholder video
    content: "Here is the detailed text content for the lesson. In a real application, this would likely be rendered Markdown or fetched from a CMS like Sanity/Supabase. Flutter makes it easy and fast to build beautiful mobile apps.",
    gistId: "5c0e154dd50af4a9ac85690802c281bb", // Mock gist ID
    snippet: "class MyWidget extends StatelessWidget {\n  @override\n  Widget build(BuildContext context) {\n    return const Text('Hello World');\n  }\n}",
    nextLessonSlug: slug === 'intro-to-flutter' ? 'widgets-101' : slug === 'widgets-101' ? 'state-management' : null
  };
};

export default async function LessonPage({ 
  params 
}: { 
  params: Promise<{ lessonSlug: string }> 
}) {
  // In Next.js 15+, params is a Promise
  const { lessonSlug } = await params;
  const lesson = getLessonDetails(lessonSlug);

  return (
    <div className="flex h-[calc(100vh-4rem)] bg-background">
      {/* Sidebar */}
      <aside className="w-80 border-r bg-muted/10 overflow-y-auto hidden md:block">
        <div className="p-4 border-b font-semibold">Course Content</div>
        <div className="p-2">
          {MOCK_COURSE_MODULES.map(module => (
            <div key={module.id} className="mb-4">
              <h3 className="px-2 mb-2 pt-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                {module.title}
              </h3>
              <div className="space-y-1">
                {module.lessons.map(l => (
                  <Link 
                    key={l.slug} 
                    href={`/lesson/${l.slug}`}
                    className={`flex items-center gap-2 px-2 py-2 rounded-md text-sm transition-colors ${
                      l.slug === lessonSlug 
                        ? 'bg-primary/10 text-primary font-medium' 
                        : 'hover:bg-muted text-foreground'
                    }`}
                  >
                    {l.completed ? (
                      <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                    ) : (
                      <PlayCircle className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                    )}
                    <span className="truncate">{l.title}</span>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto pb-12">
        <div className="max-w-4xl mx-auto p-6 md:p-8 space-y-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">{lesson.title}</h1>
            <p className="text-lg text-muted-foreground">{lesson.description}</p>
          </div>

          {/* Video Player Placeholder */}
          <div className="aspect-video bg-black rounded-xl overflow-hidden shadow-lg border">
            <iframe 
              width="100%" 
              height="100%" 
              src={lesson.videoUrl} 
              title="Course Video Player" 
              frameBorder="0" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
              allowFullScreen
            ></iframe>
          </div>

          {/* Text Content */}
          <div className="prose prose-slate max-w-none dark:prose-invert">
            <h3>Lesson Resources</h3>
            <p className="leading-relaxed">{lesson.content}</p>
          </div>

          {/* Code Snippet Placeholder */}
          <div className="bg-slate-950 rounded-xl p-4 shadow-inner border border-slate-800">
            <div className="flex items-center gap-2 mb-3 text-slate-400 text-sm border-b border-slate-800 pb-2">
              <Code className="w-4 h-4" />
              <span>example.dart</span>
            </div>
            <pre className="text-sm font-mono text-slate-50 overflow-x-auto">
              <code>{lesson.snippet}</code>
            </pre>
          </div>

          <DartpadEmbed gistId={lesson.gistId} />

          {/* Bottom Actions */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t">
            <form action={async () => {
              "use server"
              const { markLessonComplete } = await import("../../lesson/actions");
              await markLessonComplete(lessonSlug);
            }}>
              <button 
                type="submit"
                className="px-6 py-2.5 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/80 transition-colors w-full sm:w-auto font-medium shadow-sm border"
              >
                Mark as Complete
              </button>
            </form>
            
            {lesson.nextLessonSlug ? (
              <Link 
                href={`/lesson/${lesson.nextLessonSlug}`}
                className="flex items-center justify-center gap-2 px-6 py-2.5 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors w-full sm:w-auto font-medium shadow-sm"
              >
                Next Lesson
                <ArrowRight className="w-4 h-4" />
              </Link>
            ) : (
              <button 
                disabled
                className="px-6 py-2.5 bg-muted text-muted-foreground rounded-lg cursor-not-allowed w-full sm:w-auto font-medium"
              >
                Course Finished
              </button>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
