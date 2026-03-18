"use client";

import { useState, useEffect } from "react";
import { trackEvent } from "@/lib/analytics/events";
import { AlertCircle } from "lucide-react";

interface DartpadEmbedProps {
  gistId?: string;
  snippetId?: string;
}

export default function DartpadEmbed({ gistId, snippetId }: DartpadEmbedProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const id = gistId || snippetId;

  useEffect(() => {
    if (id) {
      trackEvent('dartpad_opened', { id });
    }

    // Set a timeout to show error if DartPad fails to load within 15 seconds
    const timeout = setTimeout(() => {
      if (isLoading) {
         setHasError(true);
      }
    }, 15000);

    return () => clearTimeout(timeout);
  }, [id, isLoading]);

  if (!id) {
    return (
      <div className="flex items-center justify-center p-8 bg-slate-900 rounded-lg border border-slate-700 my-6">
        <p className="text-slate-400">No DartPad snippet provided.</p>
      </div>
    );
  }

  const embedUrl = `https://dartpad.dev/embed-flutter.html?theme=dark&id=${id}`;
  const externalUrl = `https://dartpad.dev/?id=${id}`;

  return (
    <div className="flex flex-col gap-2 w-full my-8">
      <div className="flex justify-between items-center px-1">
        <span className="text-sm font-medium text-slate-300 font-[family-name:var(--font-space-grotesk),sans-serif]">Interactive Editor</span>
        <a
          href={externalUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs flex items-center gap-1.5 text-[#05b7d6] hover:text-cyan-300 transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
            <polyline points="15 3 21 3 21 9"></polyline>
            <line x1="10" y1="14" x2="21" y2="3"></line>
          </svg>
          Open in DartPad
        </a>
      </div>

      <div className="relative w-full rounded-xl overflow-hidden shadow-[0_0_15px_rgba(0,0,0,0.3)] border border-[#27272A] bg-[#09090B]" style={{ height: "600px" }}>
        {isLoading && !hasError && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#09090B]/80 backdrop-blur-sm z-10 transition-opacity duration-300">        
            <svg className="animate-spin -ml-1 mr-3 h-8 w-8 text-[#05b7d6]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <span className="mt-4 text-sm font-medium text-slate-300">Initializing DartPad...</span>
          </div>
        )}

        {hasError && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#18181B] z-20">
            <AlertCircle className="w-10 h-10 text-orange-500 mb-3" />
            <h3 className="text-white font-bold mb-2">Gagal Memuat Editor</h3>
            <p className="text-slate-400 text-sm mb-4 text-center max-w-sm">Runtime eksternal DartPad memerlukan waktu terlalu lama untuk merespon. Silakan periksa koneksi Anda atau coba buka di tab baru.</p>
            <a 
               href={externalUrl} 
               target="_blank" 
               rel="noreferrer"
               className="px-4 py-2 bg-[#27272A] hover:bg-[#3f3f46] text-white rounded text-sm transition-colors"
            >
              Buka di Tab Baru
            </a>
          </div>
        )}

        <iframe
          src={embedUrl}
          className="w-full h-full border-0"
          title={`DartPad - ID ${id}`}
          onLoad={() => setIsLoading(false)}
          allow="clipboard-write"
          sandbox="allow-scripts allow-same-origin allow-popups"
        />
      </div>
    </div>
  );
}
