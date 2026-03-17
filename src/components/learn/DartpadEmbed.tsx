"use client";

import { useState, useEffect } from "react";

interface DartpadEmbedProps {
  gistId?: string;
  snippetId?: string;
}

export default function DartpadEmbed({ gistId, snippetId }: DartpadEmbedProps) {
  const [isLoading, setIsLoading] = useState(true);

  const id = gistId || snippetId;

  useEffect(() => {
    if (id) {
      console.log(`Analytics event fired: Dartpad loaded for ID ${id}`);
    }
  }, [id]);

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
        <span className="text-sm font-medium text-slate-300">Interactive Editor</span>
        <a
          href={externalUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs flex items-center gap-1.5 text-blue-400 hover:text-blue-300 transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
            <polyline points="15 3 21 3 21 9"></polyline>
            <line x1="10" y1="14" x2="21" y2="3"></line>
          </svg>
          Open in DartPad
        </a>
      </div>
      
      <div className="relative w-full rounded-xl overflow-hidden shadow-xl border border-slate-700/50 bg-[#121212]" style={{ height: "600px" }}>
        {isLoading && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-900/80 backdrop-blur-sm z-10 transition-opacity duration-300">
            <svg className="animate-spin -ml-1 mr-3 h-8 w-8 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <span className="mt-4 text-sm font-medium text-slate-300">Initializing DartPad...</span>
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
