import { createClient } from "@/lib/supabase/server";
import { ArrowLeft, PlayCircle, BookOpen, ExternalLink, CheckCircle2, Lock } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function CourseDetailPage({
  params,
}: {
  params: Promise<{ courseSlug: string }>;
}) {
  const { courseSlug } = await params;
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  // For MVP, we mock the module and lesson structure if not pulling actual DB state 
  // In a full implementation, you'd fetch courses/modules/lessons here for the slug
  
  const mockCourseInfo = {
    title: "Pengenalan Dart Dasar",
    module: "Modul 1",
    description: "Pelajari dasar-dasar bahasa pemrograman Dart yang akan menjadi fondasi untuk membuat aplikasi Flutter."
  };

  const mockLessons = [
    { id: 1, title: "Apa itu Dart?", duration: "2 min", type: "video", status: "completed" },
    { id: 2, title: "Hello World", duration: "5 min", type: "snippet", status: "completed" },
    { id: 3, title: "Variabel dan Tipe Data", duration: "10 min", type: "snippet", status: "available" },
    { id: 4, title: "Control Flow (If/Else)", duration: "8 min", type: "snippet", status: "locked" },
    { id: 5, title: "Loops (For/While)", duration: "10 min", type: "snippet", status: "locked" },
  ];

  return (
    <div className="max-w-3xl mx-auto py-4">
      {/* Back navigation */}
      <Link href="/learn" className="inline-flex items-center text-sm font-medium text-slate-500 hover:text-slate-800 mb-8 transition-colors">
        <ArrowLeft className="w-4 h-4 mr-2" />
        Kembali ke Kurikulum
      </Link>

      {/* Course Header */}
      <div className="mb-10">
        <div className="flex items-center gap-3 mb-4">
          <span className="px-3 py-1 bg-slate-100 text-slate-600 text-xs font-semibold rounded-full uppercase tracking-wider">
            {mockCourseInfo.module}
          </span>
        </div>
        <h1 className="text-4xl font-extrabold tracking-tight mb-4">{mockCourseInfo.title}</h1>
        <p className="text-lg text-slate-600 leading-relaxed max-w-2xl">{mockCourseInfo.description}</p>
      </div>

      {/* Lessons List */}
      <div className="space-y-4 relative">
        {/* Connection line for lessons (timeline style) */}
        <div className="absolute left-[1.35rem] top-8 bottom-8 w-1 bg-slate-100 rounded-full hidden sm:block z-0" />

        {mockLessons.map((lesson, i) => (
          <Link 
             key={lesson.id} 
             href={lesson.status !== "locked" ? `/lesson/${lesson.id}` : "#"}
             className={`relative z-10 flex items-center p-4 sm:p-5 rounded-2xl border transition-all ${
               lesson.status === "available" ? "bg-white border-blue-500 shadow-md shadow-blue-100" :
               lesson.status === "completed" ? "bg-white border-slate-200 hover:border-slate-300" :
               "bg-slate-50 border-slate-200 text-slate-400 cursor-not-allowed"
             }`}
          >
            {/* Status Icon */}
            <div className="mr-6 shrink-0 z-10 bg-white">
              {lesson.status === "completed" ? (
                <div className="w-10 h-10 rounded-full bg-green-100 text-green-600 flex items-center justify-center">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
              ) : lesson.status === "available" ? (
                <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-lg shadow-blue-200">
                  <PlayCircle className="w-6 h-6" fill="currentColor" />
                </div>
              ) : (
                <div className="w-10 h-10 rounded-full bg-slate-200 text-slate-500 flex items-center justify-center border-4 border-slate-50">
                  <Lock className="w-4 h-4" />
                </div>
              )}
            </div>

            {/* Lesson Content Info */}
            <div className="flex-1 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className={`text-xs font-semibold uppercase ${lesson.status === "available" ? "text-blue-600" : lesson.status === "completed" ? "text-slate-500" : "text-slate-400"}`}>
                    Lesson {i + 1}
                  </span>
                  <span className="text-slate-300">•</span>
                  <span className="text-xs text-slate-500 flex items-center gap-1">
                    {lesson.type === 'video' ? <PlayCircle className="w-3 h-3"/> : <ExternalLink className="w-3 h-3"/>}
                    {lesson.type}
                  </span>
                </div>
                <h3 className={`font-bold text-lg ${lesson.status === "locked" ? "text-slate-400" : "text-slate-900"}`}>
                  {lesson.title}
                </h3>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-sm font-medium px-3 py-1 bg-slate-100 rounded-full text-slate-600 shrink-0">
                  {lesson.duration}
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}