import React from 'react';
import Link from 'next/link';
import { Check, Play, Lock, ChevronRight, Clock, FileText, PlayCircle } from 'lucide-react';
import { ViewTracker } from '@/lib/analytics/ViewTracker';
import { createClient } from '@/lib/supabase/server';
import IdeSidebarStats from '../components/IdeSidebarStats';
import IdeBottomBar from '../components/IdeBottomBar';
import ResizableWorkspace from '../components/ResizableWorkspace';

// === MOCK DATA ===
const MOCK_COURSE_MODULES = [
  {
    id: 'm1',
    title: 'Introduction to Flutter',
    lessons: [
      { slug: 'what-is-flutter', title: 'What is Flutter?', completed: true, locked: false },
      { slug: 'dart-basics-refresher', title: 'Dart Basics Refresher', completed: true, locked: false },
      { slug: 'widgets-101', title: 'Widgets 101', completed: false, locked: false },
      { slug: 'state-management', title: 'State Management', completed: false, locked: true },
      { slug: 'navigation-routing', title: 'Navigation & Routing', completed: false, locked: true },
    ]
  }
];

const getLessonDetails = (slug: string) => {
  return {
    slug,
    title: "Building Your First UI",
    description: "This is a comprehensive mock guide to understanding this topic in Flutter.",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    content: `In Flutter, everything is a widget. A widget is a descriptive way to build your UI. When the state of a widget changes, the widget rebuilds its description, which the framework diffs against the previous description to determine the minimal changes needed in the underlying render tree.\n\nThere are two main types of widgets you need to know:`,
    gistId: "5c0e154dd50af4a9ac85690802c281bb", 
    snippet: `import 'package:flutter/material.dart';

void main() {
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: Scaffold(
        body: Center(
          child: Text('Hello World'),
        ),
      ),
    );
  }
}`,
    nextLessonSlug: 'state-management',
    previousLessonSlug: 'dart-basics-refresher',
    readTime: "5 min read",
    moduleTitle: "Flutter Basics",
    lessonTitle: "Widgets 101"
  };
};

export default async function IdeLessonPage({ 
  params 
}: { 
  params: Promise<{ lessonSlug: string }> 
}) {
  const { lessonSlug } = await params;
  const lesson = getLessonDetails(lessonSlug);

  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  
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
            {MOCK_COURSE_MODULES.map(module => (
              <div key={module.id} className="mb-4">
                <div className="px-4 mb-2">
                  <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider font-[family-name:var(--font-space-grotesk),sans-serif]">
                    {module.title}
                  </h3>
                </div>
                <nav className="flex flex-col space-y-1 px-2">
                  {module.lessons.map(l => {
                    const isActive = l.slug === lessonSlug;
                    if (isActive) {
                      return (
                        <div key={l.slug} className="relative flex items-center gap-3 px-3 py-2 bg-[#27272A] rounded-md text-sm text-slate-100 group">
                          <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-[#05b7d6] rounded-l-md"></div>
                          <div className="w-5 h-5 rounded-full bg-[#05b7d6]/20 flex items-center justify-center shrink-0 border border-[#05b7d6]/50">
                            <Play className="w-[14px] h-[14px] text-[#05b7d6] ml-0.5" />
                          </div>
                          <span className="truncate font-medium">{l.title}</span>
                        </div>
                      );
                    }
                    if (l.completed) {
                      return (
                        <Link key={l.slug} href={`/lesson/${l.slug}`} className="flex items-center gap-3 px-3 py-2 rounded-md text-sm text-slate-300 hover:bg-[#27272A] hover:text-slate-100 transition-colors group">
                          <div className="w-5 h-5 rounded-full bg-[#10B981]/20 flex items-center justify-center shrink-0 border border-[#10B981]/30 group-hover:border-[#10B981]/50">
                            <Check className="w-[14px] h-[14px] text-[#10B981]" />
                          </div>
                          <span className="truncate">{l.title}</span>
                        </Link>
                      );
                    }
                    if (l.locked) {
                      return (
                        <div key={l.slug} className="flex items-center gap-3 px-3 py-2 rounded-md text-sm text-slate-500 hover:bg-[#27272A] transition-colors group cursor-not-allowed">
                          <div className="w-5 h-5 rounded-full bg-[#27272A] flex items-center justify-center shrink-0 border border-[#27272A]">
                            <Lock className="w-[12px] h-[12px]" />
                          </div>
                          <span className="truncate">{l.title}</span>
                        </div>
                      );
                    }
                    return (
                      <Link key={l.slug} href={`/lesson/${l.slug}`} className="flex items-center gap-3 px-3 py-2 rounded-md text-sm text-slate-300 hover:bg-[#27272A] hover:text-slate-100 transition-colors group">
                        <div className="w-5 h-5 rounded-full bg-[#27272A] flex items-center justify-center shrink-0 border border-[#27272A]">
                          <Play className="w-[12px] h-[12px] text-slate-500" />
                        </div>
                        <span className="truncate">{l.title}</span>
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
                    <span>{lesson.moduleTitle}</span>
                    <ChevronRight className="w-4 h-4" />
                    <span className="text-[#05b7d6]">{lesson.lessonTitle}</span>
                  </div>
                  <div className="px-2 py-1 border border-[#27272A] rounded text-xs text-slate-400 flex items-center gap-1 bg-[#18181B]">
                    <Clock className="w-[14px] h-[14px]" />
                    {lesson.readTime}
                  </div>
                </div>

                {/* Title */}
                <h1 className="font-[family-name:var(--font-space-grotesk),sans-serif] text-3xl font-bold mb-6 text-slate-100">
                  {lesson.title}
                </h1>

                <div className="flex flex-col xl:flex-row gap-8 items-start">
                  {/* Text Content */}
                  <div className="flex-1 prose prose-invert max-w-none text-slate-300 text-[15px] leading-relaxed">
                    <p className="mb-4 whitespace-pre-line">{lesson.content}</p>
                    <ul className="list-disc pl-5 mb-4 space-y-2">
                      <li><strong className="text-[#05b7d6]">StatelessWidget:</strong> A widget that does not require mutable state.</li>
                      <li><strong className="text-[#05b7d6]">StatefulWidget:</strong> A widget that has mutable state.</li>
                    </ul>
                    <p>Let's start by building a simple stateless widget that displays a "Hello World" text in the center of the screen. Look at the code editor below and try running it.</p>
                  </div>

                  {/* Video Mockup */}
                  <div className="w-full xl:w-[480px] aspect-video shrink-0 bg-[#18181B] border border-[#27272A] rounded-lg relative flex items-center justify-center overflow-hidden group cursor-pointer">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img alt="Code on screen" className="absolute inset-0 w-full h-full object-cover opacity-30 group-hover:opacity-40 transition-opacity" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBKD207uxT9g7l_tkbfA6ROalIGh47AdrG0LqoSO6LzFBRRhgmKEpgj2Slk7qhqcpRgWLq07O_DDKUX2AIKBH2wViTyLP0JHUJHyaSG3Q3swY5g2Xa93pZGg6BaVAgFeOsLgQaxygs-fMnDdujowYqEEoCuyrOw4xRyGIrQ3cODBLAwjajskMjcEATJ7mdYWiohHQWNO8Wpggr52J710G_Hs6KAbVycgTeH0B0CZjOwSYZggKQxU7H5D_Wc4iJvf5q7N4EUj654wMRt" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#09090B]/80 to-transparent"></div>
                    
                    {/* Play Button */}
                    <div className="w-16 h-16 rounded-full bg-[#05b7d6]/20 flex items-center justify-center border-2 border-[#05b7d6]/50 backdrop-blur-sm group-hover:scale-110 transition-transform z-10 shadow-[0_0_0_1px_#05b7d6,0_0_12px_rgba(5,183,214,0.2)]">
                      <Play className="w-8 h-8 text-[#05b7d6] translate-x-0.5 fill-current" />
                    </div>
                    
                    <div className="absolute bottom-3 left-4 right-4 flex justify-between items-center z-10 text-xs text-slate-300 font-mono">
                      <span>Understanding Widgets</span>
                      <span>03:42</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          }
          bottomContent={
            <div className="h-full flex bg-[#09090B] min-h-0">
              {/* Code Editor (60%) */}
              <div className="flex-[3] flex flex-col border-r border-[#27272A] bg-[#18181B] min-w-0">
                
                {/* Editor Tabs */}
                <div className="flex items-center h-10 border-b border-[#27272A] bg-[#09090B] shrink-0 px-2 justify-between">
                  <div className="flex items-center h-full">
                    <div className="flex items-center gap-2 px-4 h-full bg-[#18181B] border-t-2 border-t-[#05b7d6] border-r border-r-[#27272A] border-l border-l-[#27272A] font-mono text-sm text-[#05b7d6]">
                      <FileText className="w-4 h-4" />
                      main.dart
                    </div>
                    <div className="flex items-center gap-2 px-4 h-full text-slate-500 font-mono text-sm hover:bg-[#27272A] cursor-pointer">
                      pubspec.yaml
                    </div>
                  </div>
                  {/* Run Button */}
                  <button className="flex items-center gap-2 px-3 py-1 bg-[#18181B] border border-[#27272A] rounded text-[#10B981] hover:bg-[#27272A] transition-colors font-[family-name:var(--font-space-grotesk),sans-serif] text-sm mr-2 shadow-sm">
                    <PlayCircle className="w-4 h-4" />
                    Run Code
                  </button>
                </div>

                {/* Editor Area */}
                <div className="flex-1 overflow-auto p-4 font-mono text-[13px] leading-relaxed text-slate-300 relative custom-scrollbar">
                  {/* Line Numbers */}
                  <div className="absolute left-0 top-0 bottom-0 w-12 bg-[#18181B] border-r border-[#27272A] flex flex-col items-end py-4 pr-2 text-slate-600 select-none">
                    {[...Array(16)].map((_, i) => <span key={i}>{i + 1}</span>)}
                  </div>
                  
                  {/* Code Content */}
                  <div className="pl-10">
                    <pre className="m-0 whitespace-pre">
                      <span className="text-pink-400">import</span> <span className="text-green-300">'package:flutter/material.dart'</span>;{'\n\n'}
                      <span className="text-pink-400">void</span> <span className="text-blue-400">main</span>() {'{\n'}
                      {'  '}<span className="text-blue-400">runApp</span>(<span className="text-yellow-200">MyApp</span>());{'\n'}
                      {'}\n\n'}
                      <span className="text-pink-400">class</span> <span className="text-yellow-200">MyApp</span> <span className="text-pink-400">extends</span> <span className="text-yellow-200">StatelessWidget</span> {'{\n'}
                      {'  '}<span className="text-slate-500 italic">@override</span>{'\n'}
                      {'  '}<span className="text-yellow-200">Widget</span> <span className="text-blue-400">build</span>(<span className="text-yellow-200">BuildContext</span> context) {'{\n'}
                      {'    '}<span className="text-pink-400">return</span> <span className="text-yellow-200">MaterialApp</span>({'\n'}
                      {'      '}home: <span className="text-yellow-200">Scaffold</span>({'\n'}
                      {'        '}body: <span className="text-yellow-200">Center</span>({'\n'}
                      {'          '}child: <span className="text-yellow-200">Text</span>(<span className="text-green-300">'Hello World'</span>),{'\n'}
                      {'        '}),{'\n'}
                      {'      '}),{'\n'}
                      {'    '});{'\n'}
                      {'  }\n'}
                      {'}'}
                    </pre>
                  </div>
                </div>
              </div>

              {/* Device Simulator (40%) */}
              <div className="flex-[2] bg-[#09090B] p-6 flex flex-col items-center justify-center relative min-w-[300px]">
                <div className="absolute top-4 left-4 text-xs font-mono text-slate-500">
                  Console Output / Simulator
                </div>
                
                {/* Simulated Device Bezel */}
                <div className="w-[300px] h-[500px] border-[12px] border-[#27272A] rounded-[1.5rem] bg-white relative shadow-[0_0_30px_rgba(0,0,0,0.5)] overflow-hidden flex flex-col max-h-full">
                  {/* Notch area */}
                  <div className="absolute top-0 inset-x-0 h-6 bg-[#27272A] rounded-b-xl w-32 mx-auto z-20"></div>
                  
                  {/* Screen Content (Simulated Flutter App) */}
                  <div className="flex-1 flex flex-col relative z-10 bg-white pt-2">
                    {/* Simulated App Bar */}
                    <div className="h-14 bg-blue-500 flex items-center px-4 shadow-sm text-white pt-4">
                      <span className="font-medium text-sm">Flutter Demo</span>
                    </div>
                    {/* Simulated Body */}
                    <div className="flex-1 flex items-center justify-center bg-gray-50 text-gray-900">
                      <span className="text-base">Hello World</span>
                    </div>
                  </div>
                  
                  {/* Home indicator */}
                  <div className="absolute bottom-2 inset-x-0 h-1 bg-gray-300 w-24 mx-auto rounded-full z-20"></div>
                </div>
              </div>
            </div>
          }
        />
      </div>

      <IdeBottomBar lessonSlug={lessonSlug} previousSlug={lesson.previousLessonSlug} />
      
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
    </>
  );
}