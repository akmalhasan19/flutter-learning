"use client";

import React, { useEffect } from "react";
import DartpadEmbed from "@/components/learn/DartpadEmbed";
import { Download, Upload, Terminal } from "lucide-react";
import { trackEvent } from "@/lib/analytics/events";

interface RuntimeAdapterProps {
  lesson: any;
}

export default function RuntimeAdapter({ lesson }: RuntimeAdapterProps) {
  const runtimeMode = lesson.runtime_mode || "none";

  useEffect(() => {
    if (runtimeMode !== "none") {
      trackEvent('runtime_opened', {
        lessonId: lesson.id,
        lessonSlug: lesson.slug,
        runtimeMode: runtimeMode
      });
    }
  }, [lesson.id, lesson.slug, runtimeMode]);

  if (runtimeMode === "none") {
    // Return null, handled by ResizableWorkspace to hide bottom section
    return null;
  }

  if (runtimeMode === "browser_lab" || runtimeMode === "browser") {
    return (
      <div className="flex-1 flex flex-col h-full w-full bg-[#09090B]">
        <div className="flex-1 overflow-hidden p-0 m-0">
          <DartpadEmbed snippetId={lesson.snippet_id} />
        </div>
      </div>
    );
  }

  if (runtimeMode === "project_lab" || runtimeMode === "project") {
    return (
      <div className="flex-1 flex flex-col h-full bg-[#09090B] border-t border-[#27272A] p-6 text-slate-300">
        <div className="max-w-3xl mx-auto w-full flex flex-col gap-6">
          <div className="flex items-center gap-3 border-b border-[#27272A] pb-4">
            <div className="p-2 bg-[#05b7d6]/20 rounded-lg text-[#05b7d6]">
              <Terminal className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white">Project Lab Environment</h3>
              <p className="text-sm text-slate-400">Kerjakan di mesin lokal Anda lalu submit.</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Step 1: Download */}
            <div className="bg-[#18181B] border border-[#27272A] rounded-xl p-5 flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Langkah 1</span>
                <Download className="w-4 h-4 text-slate-400" />
              </div>
              <h4 className="font-semibold text-white">Unduh Starter Project</h4>
              <p className="text-sm text-slate-400 flex-1">
                Unduh template awal dan buka menggunakan VS Code atau Android Studio.
              </p>
              <button 
                className="w-full py-2 bg-[#27272A] hover:bg-[#3f3f46] text-white rounded-md text-sm font-medium transition-colors"
                onClick={() => alert('Download action not implemented yet for ' + lesson.starter_source)}
              >
                Download Starter
              </button>
            </div>

            {/* Step 2: Submit */}
            <div className="bg-[#18181B] border border-[#05b7d6]/30 rounded-xl p-5 flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-[#05b7d6]">Langkah 2</span>
                <Upload className="w-4 h-4 text-[#05b7d6]" />
              </div>
              <h4 className="font-semibold text-white">Submit Pekerjaan</h4>
              <p className="text-sm text-slate-400 flex-1">
                Upload file zip project Anda. Runner on-demand akan menilai pekerjaan Anda secara otomatis.
              </p>
              <button 
                className="w-full py-2 bg-[#05b7d6] hover:bg-[#0494ad] text-white rounded-md text-sm font-medium transition-colors shadow-[0_0_15px_rgba(5,183,214,0.3)]"
                onClick={() => alert('Submit logic will dispatch job to runner for ' + lesson.grader_target)}
              >
                Submit Project
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex items-center justify-center bg-red-900/20 text-red-400">
      Unknown Runtime Mode: {runtimeMode}
    </div>
  );
}
