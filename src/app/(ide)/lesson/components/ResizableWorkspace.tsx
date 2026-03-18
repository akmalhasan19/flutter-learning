"use client";

import React, { useState, useRef, useEffect } from "react";

interface Props {
  topContent: React.ReactNode;
  bottomContent?: React.ReactNode;
}

export default function ResizableWorkspace({ topContent, bottomContent }: Props) {
  const [topHeight, setTopHeight] = useState(50); // percentage
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    isDragging.current = true;
    document.body.style.cursor = "row-resize";
  };

  const handleMouseUp = () => {
    isDragging.current = false;
    document.body.style.cursor = "default";
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging.current || !containerRef.current) return;
    
    const containerRect = containerRef.current.getBoundingClientRect();
    const newTopHeight = ((e.clientY - containerRect.top) / containerRect.height) * 100;
    
    // Allow full collapsing, optionally snapping to 0 or 100 near the edges
    if (newTopHeight < 5) {
      setTopHeight(0);
    } else if (newTopHeight > 95) {
      setTopHeight(100);
    } else {
      setTopHeight(newTopHeight);
    }
  };

  useEffect(() => {
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  if (!bottomContent) {
    return (
      <main className="flex-1 flex flex-col min-w-0 h-full">
        <div className="flex-col min-h-0 h-full flex">
          {topContent}
        </div>
      </main>
    );
  }

  return (
    <main ref={containerRef} className="flex-1 flex flex-col min-w-0 h-full">
      {/* Top Panel */}
      <div 
        style={{ height: `${topHeight}%`, display: topHeight === 0 ? 'none' : 'flex' }} 
        className="flex-col min-h-0"
      >
        {topContent}
      </div>
      
      {/* Draggable Divider */}
      <div 
        className="h-1.5 shrink-0 bg-[#18181B] border-y border-[#27272A] cursor-row-resize flex items-center justify-center hover:bg-[#05b7d6]/20 group transition-colors z-20"
        onMouseDown={handleMouseDown}
      >
        <div className="w-8 h-0.5 bg-slate-600 rounded-full group-hover:bg-[#05b7d6] transition-colors" />
      </div>
      
      {/* Bottom Panel */}
      <div 
        style={{ height: `${100 - topHeight}%`, display: topHeight === 100 ? 'none' : 'flex' }} 
        className="flex-col min-h-0"
      >
        {bottomContent}
      </div>
    </main>
  );
}
