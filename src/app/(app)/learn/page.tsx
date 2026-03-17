import { createClient } from "@/lib/supabase/server";
import { BookOpen, CheckCircle2, Lock, PlayCircle, Clock } from "lucide-react";
import Link from "next/link";

export default async function LearnPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  // In a real implementation we would fetch dynamic courses from Supabase
  // For MVP UI, we can fetch what exists or use mock structure
  
  const { data: courses } = await supabase
    .from("courses")
    .select("*, modules(*, lessons(*))")
    .order("created_at", { ascending: true });

  // Mock course data just in case the DB is empty at this stage
  const mockCourses = [
    {
      id: "1",
      slug: "flutter-basics",
      title: "Flutter Beginner Path",
      description: "Langkah pertamamu membuat aplikasi mobile dengan Flutter & Dart.",
      status: "available",
      progress: 15,
      total_modules: 4,
      total_duration: "2 Jam",
      modules: [
        { title: "Pengenalan Dart", lessons_count: 5, completed: true },
        { title: "Mengenal Widget", lessons_count: 6, completed: false },
        { title: "Layouting Dasar", lessons_count: 4, completed: false },
        { title: "State Management 101", lessons_count: 3, completed: false },
      ]
    }
  ];

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-2">Kurikulum</h1>
        <p className="text-slate-600">Pilih jalur belajarmu dan mulailah perjalanan coding-mu.</p>
      </div>

      <div className="space-y-6">
        {mockCourses.map((course) => (
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
                    <Clock className="w-3 h-3" /> {course.total_duration}
                  </span>
                </div>
                <h2 className="text-3xl font-bold mb-3">{course.title}</h2>
                <p className="text-slate-300 max-w-xl">{course.description}</p>
                
                <div className="mt-8 flex items-center gap-4">
                  <div className="flex-1 max-w-md">
                    <div className="flex justify-between text-sm mb-2 text-slate-300">
                      <span>Progres {course.progress}%</span>
                    </div>
                    <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden">
                      <div className="bg-blue-500 h-full w-[15%]" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Modules List */}
            <div className="p-6 sm:p-8">
              <h3 className="text-lg font-bold mb-6">Modul Pembelajaran</h3>
              
              <div className="space-y-4">
                {course.modules.map((mod, index) => (
                  <Link 
                    href={`/learn/${course.slug}`} 
                    key={index}
                    className="group border border-slate-200 rounded-xl p-4 sm:p-5 flex items-start sm:items-center justify-between gap-4 block hover:border-blue-300 hover:shadow-md transition-all bg-white"
                  >
                    <div className="flex items-start sm:items-center gap-4">
                      {mod.completed ? (
                        <div className="w-10 h-10 shrink-0 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                          <CheckCircle2 className="w-6 h-6" />
                        </div>
                      ) : index === 1 ? (
                        /* Active Module */
                        <div className="w-10 h-10 shrink-0 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 border border-blue-200">
                          <PlayCircle className="w-6 h-6" />
                        </div>
                      ) : (
                        /* Locked Module */
                        <div className="w-10 h-10 shrink-0 rounded-full bg-slate-100 flex items-center justify-center text-slate-400">
                          <Lock className="w-5 h-5" />
                        </div>
                      )}
                      
                      <div>
                        <div className="text-sm font-semibold text-slate-500 mb-1">Modul {index + 1}</div>
                        <h4 className={`font-bold text-lg group-hover:text-blue-600 transition-colors ${!mod.completed && index !== 1 ? 'text-slate-400' : ''}`}>
                          {mod.title}
                        </h4>
                        <p className="text-slate-500 text-sm mt-1">{mod.lessons_count} lessons</p>
                      </div>
                    </div>
                    
                    <div className="hidden sm:block">
                      <div className="px-4 py-2 rounded-full border border-slate-200 text-sm font-medium group-hover:bg-slate-50 text-slate-600 transition-colors">
                        Mulai
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}