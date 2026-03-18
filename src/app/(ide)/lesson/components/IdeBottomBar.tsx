"use client";

import { useTransition, useState, useEffect } from "react";
import { toast, Toaster } from "sonner";
import { markLessonComplete, submitGradedLesson } from "@/app/(ide)/lesson/actions";
import { GamificationResult } from "@/lib/gamification/engine";
import { ArrowLeft, ArrowRight, Check, Plus, AlertCircle, Loader2, Play } from "lucide-react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { GraderStatus } from "@/lib/grader/provider";
import { useRouter } from "next/navigation";

interface Props {
  lessonSlug: string;
  previousSlug: string | null;
  nextSlug: string | null;
  assessmentMode: string;
  expectedOutcomes: string[];
}

export default function IdeBottomBar({ lessonSlug, previousSlug, nextSlug, assessmentMode, expectedOutcomes }: Props) {
  const [isPending, startTransition] = useTransition();
  const [checkedItems, setCheckedItems] = useState<Record<number, boolean>>({});
  const router = useRouter();

  // Grader specific state
  const [submissionStatus, setSubmissionStatus] = useState<GraderStatus | null>(null);
  const [submissionScore, setSubmissionScore] = useState<number | null>(null);
  const [submissionSummary, setSubmissionSummary] = useState<string | null>(null);
  const [lessonId, setLessonId] = useState<string | null>(null);
  const [isCompleted, setIsCompleted] = useState(false);

  const supabase = createClient();

  useEffect(() => {
    async function fetchStatus() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data: lesson } = await supabase.from('lessons').select('id').eq('slug', lessonSlug).single();
      if (!lesson) return;
      setLessonId(lesson.id);

      const { data: progress } = await supabase
        .from('user_lesson_progress')
        .select('status')
        .eq('lesson_id', lesson.id)
        .eq('user_id', user.id)
        .single();
        
      if (progress?.status === 'completed') {
        setIsCompleted(true);
      }

      if (assessmentMode === 'graded') {
        const { data: submission } = await supabase
          .from('lesson_submissions')
          .select('status, score, summary')
          .eq('lesson_id', lesson.id)
          .eq('user_id', user.id)
          .order('created_at', { ascending: false })
          .limit(1)
          .single();

        if (submission) {
          setSubmissionStatus(submission.status as GraderStatus);
          setSubmissionScore(submission.score);
          setSubmissionSummary(submission.summary);
          
          if (submission.status === 'passed') {
             setIsCompleted(true);
          }
        }
      }
    }
    
    fetchStatus();
  }, [lessonSlug, assessmentMode, supabase]);

  // Realtime updates for grading
  useEffect(() => {
    if (assessmentMode !== 'graded' || !lessonId) return;

    const channel = supabase.channel('submission_updates')
      .on('postgres_changes', {
        event: 'UPDATE',
        schema: 'public',
        table: 'lesson_submissions',
        filter: `lesson_id=eq.${lessonId}`
      }, (payload) => {
        const newStatus = payload.new.status as GraderStatus;
        setSubmissionStatus(newStatus);
        setSubmissionScore(payload.new.score);
        setSubmissionSummary(payload.new.summary);
        
        if (newStatus === 'passed') {
          setIsCompleted(true);
          toast.success("Project tests lulus! Kerja bagus!");
          router.refresh();
        } else if (newStatus === 'failed') {
          toast.error("Tests gagal. Cek kembali kodemu dan coba lagi.");
        } else if (newStatus === 'infra_error') {
          toast.error("Terjadi masalah sistem. Silakan coba lagi nanti.");
        }
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    }
  }, [assessmentMode, lessonId, supabase, router]);

  const isAllChecked = expectedOutcomes && expectedOutcomes.length > 0
    ? expectedOutcomes.every((_, i) => checkedItems[i])
    : true;

  const handleComplete = () => {
    if (!isAllChecked) return;
    
    startTransition(async () => {
      const result = await markLessonComplete(lessonSlug) as GamificationResult;
      
      if (!result) return;

      if (!result.success) {
        toast.error(result.error || "Failed to complete lesson");
        return;
      }

      setIsCompleted(true);

      toast.success(
        <div className="flex flex-col gap-1">
          <span className="font-semibold">Materi Selesai! 🎉</span>
          <span className="text-sm border-t pt-1 text-emerald-400">+{result.earnedXp} XP Didapatkan! 🚀</span>
          {result.streak > 1 && (
            <span className="text-sm text-orange-500 font-medium mt-1 border-t border-slate-700/50 pt-1">
              🔥 Streak {result.streak} Hari!
            </span>
          )}
          {result.badges && result.badges.length > 0 && (
            <span className="text-sm text-yellow-500 font-medium mt-1 border-t border-slate-700/50 pt-1">
              🏆 Lencana Baru Terbuka!
            </span>
          )}
        </div>,
        { duration: 5000 }
      );
    });
  };

  const handleSubmitCode = () => {
    if (!lessonId) return;
    
    // Get code from localStorage (saved by RuntimeAdapter)
    const savedCode = localStorage.getItem(`dartpad_code_${lessonSlug}`);
    if (!savedCode) {
      toast.error("Please write some code in the editor before submitting.");
      return;
    }

    setSubmissionStatus('queued');
    
    startTransition(async () => {
      const result = await submitGradedLesson(lessonId, lessonSlug, savedCode);
      if (!result.success) {
        toast.error(result.error || "Failed to submit code.");
        setSubmissionStatus(null);
      } else {
        toast.success("Code submitted for grading!");
      }
    });
  };

  const toggleCheck = (index: number) => {
    setCheckedItems(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  return (
    <>
      <Toaster />
      <footer className="bg-[#09090B] border-t border-[#27272A] shrink-0 flex flex-col z-20 relative">
        {/* Grader Status Overlay */}
        {assessmentMode === 'graded' && submissionStatus && submissionStatus !== 'queued' && submissionStatus !== 'running' && (
          <div className={`border-b border-[#27272A] px-6 py-3 flex items-center justify-between ${
            submissionStatus === 'passed' ? 'bg-emerald-500/10' :
            submissionStatus === 'failed' ? 'bg-rose-500/10' :
            'bg-amber-500/10'
          }`}>
            <div className="flex items-center gap-3">
              <span className={`px-2 py-1 text-xs font-bold uppercase rounded ${
                submissionStatus === 'passed' ? 'bg-emerald-500/20 text-emerald-400' :
                submissionStatus === 'failed' ? 'bg-rose-500/20 text-rose-400' :
                'bg-amber-500/20 text-amber-400'
              }`}>
                {submissionStatus}
              </span>
              <span className="text-sm text-slate-300">
                {submissionSummary || (submissionStatus === 'passed' ? 'All tests passed successfully.' : 'Some tests failed. Check your logic and try again.')}
              </span>
            </div>
            {submissionScore !== null && (
              <div className="text-sm font-bold text-slate-200">
                Score: <span className={submissionStatus === 'passed' ? 'text-emerald-400' : 'text-rose-400'}>{submissionScore}/100</span>
              </div>
            )}
          </div>
        )}

        {/* Checklist Section for Manual Lessons */}
        {assessmentMode === "manual" && expectedOutcomes && expectedOutcomes.length > 0 && !isCompleted && (
          <div className="border-b border-[#27272A] bg-[#18181B] px-6 py-3">
            <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Checklist Belajar</h4>
            <div className="flex flex-col gap-2">
              {expectedOutcomes.map((outcome, index) => (
                <label key={index} className="flex items-center gap-2 cursor-pointer group">
                  <input 
                    type="checkbox" 
                    className="w-4 h-4 rounded border-slate-600 text-[#05b7d6] bg-transparent focus:ring-[#05b7d6] focus:ring-offset-[#18181B]"
                    checked={!!checkedItems[index]}
                    onChange={() => toggleCheck(index)}
                  />
                  <span className={`text-sm transition-colors ${checkedItems[index] ? "text-slate-500 line-through" : "text-slate-300 group-hover:text-slate-200"}`}>
                    {outcome}
                  </span>
                </label>
              ))}
            </div>
          </div>
        )}

        <div className="h-16 flex items-center justify-between px-6">
          {previousSlug ? (
            <Link 
              href={`/lesson/${previousSlug}`}
              className="flex items-center gap-2 text-slate-400 hover:text-slate-200 font-[family-name:var(--font-space-grotesk),sans-serif] text-sm transition-colors py-2 px-4 rounded hover:bg-[#27272A]"
            >
              <ArrowLeft className="w-[18px] h-[18px]" />
              Previous Lesson
            </Link>
          ) : (
            <div className="w-[150px]"></div>
          )}

          <div className="flex items-center gap-4">
            <div className="text-sm text-slate-400 font-mono flex items-center gap-2">
              <span className={`w-2 h-2 rounded-full ${assessmentMode === 'graded' ? 'bg-amber-500' : 'bg-emerald-500'}`}></span>
              {assessmentMode === 'graded' ? 'Lingkungan Grader' : 'Siap Dijalankan'}
            </div>
            
            {assessmentMode === "graded" ? (
              <button 
                onClick={handleSubmitCode}
                disabled={isPending || submissionStatus === 'queued' || submissionStatus === 'running' || isCompleted}
                className={`font-[family-name:var(--font-space-grotesk),sans-serif] font-semibold py-2 px-6 rounded text-sm flex items-center gap-2 transition-all ${
                  isCompleted ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 
                  submissionStatus === 'failed' ? 'bg-rose-600 hover:bg-rose-500 text-white shadow-[0_0_12px_rgba(225,29,72,0.3)]' :
                  'bg-amber-500 hover:bg-amber-400 text-[#09090B] shadow-[0_0_12px_rgba(245,158,11,0.3)]'
                } disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                {isPending || submissionStatus === 'queued' || submissionStatus === 'running' ? (
                   <>
                     <Loader2 className="w-[16px] h-[16px] animate-spin" /> Menilai...
                   </>
                ) : isCompleted ? (
                   <>
                     <Check className="w-[16px] h-[16px]" /> Lulus
                   </>
                ) : submissionStatus === 'failed' ? (
                   <>
                     <Play className="w-[16px] h-[16px]" /> Coba Lagi
                   </>
                ) : (
                  <>
                    <Play className="w-[16px] h-[16px]" /> Jalankan Test
                  </>
                )}
              </button>
            ) : (
              <button 
                onClick={handleComplete}
                disabled={isPending || !isAllChecked || isCompleted}
                className={`font-[family-name:var(--font-space-grotesk),sans-serif] font-semibold py-2 px-6 rounded text-sm transition-all flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed ${
                  isCompleted 
                    ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' 
                    : 'bg-[#05b7d6] hover:bg-[#0891B2] text-[#09090B] shadow-[0_0_0_1px_#05b7d6,0_0_12px_rgba(5,183,214,0.2)]'
                }`}
                title={!isAllChecked ? "Selesaikan semua checklist terlebih dahulu" : ""}
              >
                {isPending ? "Menyelesaikan..." : isCompleted ? "Selesai" : "Tandai Selesai"}
                {!isPending && !isCompleted && (
                  <div className="flex items-center gap-1 bg-[#09090B]/20 px-2 py-0.5 rounded text-xs ml-2">
                    <Plus className="w-[14px] h-[14px]" />
                    10 XP
                  </div>
                )}
                {isCompleted && <Check className="w-[16px] h-[16px] ml-1" />}
              </button>
            )}
            
            {/* Next Lesson CTA */}
            {isCompleted && nextSlug && (
              <Link 
                href={`/lesson/${nextSlug}`}
                className="ml-2 px-5 py-2 bg-emerald-500 hover:bg-emerald-400 text-[#09090B] font-bold text-sm rounded transition-colors flex items-center gap-2 shadow-[0_0_12px_rgba(16,185,129,0.3)] animate-in fade-in zoom-in duration-300"
              >
                Materi Berikutnya <ArrowRight className="w-4 h-4" />
              </Link>
            )}
            {isCompleted && !nextSlug && (
              <Link 
                href="/dashboard"
                className="ml-2 px-5 py-2 bg-emerald-500 hover:bg-emerald-400 text-[#09090B] font-bold text-sm rounded transition-colors flex items-center gap-2 shadow-[0_0_12px_rgba(16,185,129,0.3)] animate-in fade-in zoom-in duration-300"
              >
                Kembali ke Dashboard <Check className="w-4 h-4" />
              </Link>
            )}
          </div>
        </div>
      </footer>
    </>
  );
}
