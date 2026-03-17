"use client";

import { useState } from "react";
import Link from "next/link";
import { PlayCircle, Award, ChevronRight, CheckCircle2, TerminalSquare, Flame, Star } from "lucide-react";

type Locale = "id" | "en";

const translations = {
  id: {
    heroTitle: "Belajar Flutter:",
    heroTitleHighlight: "Simpel, Efektif, & Seru",
    heroSubtitle: "Dari nol sampai mahir tanpa pusing setup. Tonton, ketik, dan langsung lihat hasilnya di browser-mu.",
    ctaStart: "Mulai Gratis Sekarang",
    ctaCurriculum: "Lihat Kurikulum",
    methodTitle: "Metode Spesial Untuk Pemula",
    methodDesc: "Kami membuang teori membosankan dan menggantinya dengan praktik nyata.",
    featVideo: "Video Pendek",
    featVideoDesc: "Konsep dijelaskan dalam 1-2 menit saja, langsung ke intinya.",
    featSnippet: "Coding di Browser",
    featSnippetDesc: "Tidak perlu install apa-apa di awal. Ketik & jalankan Dart langsung.",
    funTitle: "Belajar Jadi Ketagihan",
    funDesc: "Kumpulkan poin, jaga runtunan belajar, dan dapatkan lencana eksklusif.",
    xpTitle: "Dapatkan XP",
    xpDesc: "Setiap latihan memberimu XP untuk memantau perkembanganmu.",
    streakTitle: "Jaga Streak",
    streakDesc: "Belajar sedikit tiap hari membangun kebiasaan coding yang kuat.",
    badgeTitle: "Raih Lencana",
    badgeDesc: "Dapatkan penghargaan setiap melewati tantangan atau modul baru.",
    curriculumTitle: "Intip Kurikulum Kami",
    course1: "Pengenalan Dart Dasar",
    course2: "Mengenal Widget Flutter",
    course3: "Membuat Layout Responsive",
    course4: "State Management Dasar",
    login: "Masuk",
  },
  en: {
    heroTitle: "Learn Flutter:",
    heroTitleHighlight: "Simple, Effective & Fun",
    heroSubtitle: "From zero to hero without setup headaches. Watch, type, and see results directly in your browser.",
    ctaStart: "Start for Free Now",
    ctaCurriculum: "View Curriculum",
    methodTitle: "Special Method for Beginners",
    methodDesc: "We throw away boring theories and replace them with real practice.",
    featVideo: "Short Videos",
    featVideoDesc: "Concepts explained in just 1-2 minutes, straight to the point.",
    featSnippet: "Code in Browser",
    featSnippetDesc: "No need to install anything at first. Type & run Dart right away.",
    funTitle: "Make Learning Addictive",
    funDesc: "Collect points, maintain learning streaks, and earn exclusive badges.",
    xpTitle: "Earn XP",
    xpDesc: "Every exercise grants you XP to track your progress.",
    streakTitle: "Keep Streaks",
    streakDesc: "Learning a little every day builds strong coding habits.",
    badgeTitle: "Earn Badges",
    badgeDesc: "Get rewarded every time you pass a challenge or a new module.",
    curriculumTitle: "Peek Inside Our Curriculum",
    course1: "Basic Dart Introduction",
    course2: "Getting to Know Flutter Widgets",
    course3: "Building Responsive Layouts",
    course4: "Basic State Management",
    login: "Log in",
  }
};

export default function LandingPage() {
  const [locale, setLocale] = useState<Locale>("id");
  const t = translations[locale];

  return (
    <div className="min-h-screen bg-[#09090B] text-slate-300 font-sans selection:bg-[#05b7d6] selection:text-[#09090B] overflow-x-hidden">
      {/* HEADER */}
      <header className="fixed top-0 w-full p-4 md:p-6 flex justify-between items-center z-50 bg-[#09090B]/80 backdrop-blur-md border-b border-[#27272A]">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-[#05b7d6] flex items-center justify-center text-[#09090B] font-bold text-xl shadow-[0_0_12px_rgba(5,183,214,0.4)]">
            F
          </div>
          <span className="font-bold text-2xl tracking-tight text-slate-100 hidden sm:block font-[family-name:var(--font-space-grotesk),sans-serif]">
            FlutterCamp
          </span>
        </div>
        <div className="flex items-center gap-4 md:gap-6">
          <div className="flex bg-[#18181B] p-1 rounded-full text-sm font-medium border border-[#27272A]">
            <button
              onClick={() => setLocale("id")}
              className={`px-3 py-1 rounded-full transition-colors ${locale === "id" ? "bg-[#27272A] text-slate-100" : "text-slate-400 hover:text-slate-200"}`}
            >
              ID
            </button>
            <button
              onClick={() => setLocale("en")}
              className={`px-3 py-1 rounded-full transition-colors ${locale === "en" ? "bg-[#27272A] text-slate-100" : "text-slate-400 hover:text-slate-200"}`}
            >
              EN
            </button>
          </div>
          <Link href="/login" className="text-slate-300 hover:text-white transition-colors text-sm font-medium hidden md:block">
            {t.login}
          </Link>
          <Link
            href="/signup"
            className="bg-[#05b7d6] hover:bg-[#0891B2] text-[#09090B] px-5 py-2 rounded-lg font-semibold transition-all shadow-[0_0_12px_rgba(5,183,214,0.3)] hover:shadow-[0_0_20px_rgba(5,183,214,0.5)] text-sm"
          >
            {t.ctaStart}
          </Link>
        </div>
      </header>

      <main className="pt-32 pb-20 px-6">
        {/* HERO SECTION */}
        <div className="max-w-6xl mx-auto flex flex-col items-center text-center">
          
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 text-slate-100 font-[family-name:var(--font-space-grotesk),sans-serif] max-w-4xl leading-tight">
            {t.heroTitle} <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#05b7d6] to-cyan-200">{t.heroTitleHighlight}</span>
          </h1>
          
          <p className="text-lg md:text-xl text-slate-400 mb-10 max-w-2xl leading-relaxed">
            {t.heroSubtitle}
          </p>
          
          <div className="flex flex-col sm:flex-row items-center gap-4 w-full justify-center">
            <Link
              href="/signup"
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-[#05b7d6] hover:bg-[#0891B2] text-[#09090B] font-bold text-lg transition-all shadow-[0_0_20px_rgba(5,183,214,0.4)] flex items-center justify-center gap-2"
            >
              {t.ctaStart}
              <ChevronRight className="w-5 h-5" />
            </Link>
            <Link
              href="#curriculum"
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-[#18181B] hover:bg-[#27272A] border border-[#27272A] text-slate-200 font-bold text-lg transition-colors flex items-center justify-center"
            >
              {t.ctaCurriculum}
            </Link>
          </div>
        </div>

        {/* IDE MOCKUP (Using user's provided HTML design as a visual element) */}
        <div className="max-w-6xl mx-auto mt-20 relative">
          <div className="absolute -inset-1 rounded-2xl bg-gradient-to-tr from-[#05b7d6]/20 via-transparent to-[#05b7d6]/10 blur-xl opacity-70"></div>
          
          <div className="relative rounded-2xl border border-[#27272A] bg-[#09090B] shadow-2xl overflow-hidden flex flex-col items-stretch max-h-[800px] w-full">
            {/* Top IDE Header fake */}
            <div className="h-10 bg-[#18181B] border-b border-[#27272A] flex items-center px-4 gap-2 shrink-0">
              <div className="flex gap-1.5 mr-4">
                <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
              </div>
              <div className="bg-[#27272A] px-6 py-1 rounded text-xs text-slate-400 font-mono tracking-wider">
                learning-workspace - main.dart
              </div>
            </div>

            {/* Content Split fake */}
            <div className="flex flex-1 overflow-hidden min-h-[400px]">
              
              {/* Fake Sidebar */}
              <div className="w-48 bg-[#18181B] border-r border-[#27272A] hidden md:block shrink-0 p-4">
                <div className="text-xs text-slate-500 font-bold mb-4 uppercase tracking-wider">Curriculum</div>
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-sm text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                    <span className="truncate">Dart Basics</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-[#05b7d6] bg-[#05b7d6]/10 py-1.5 px-2 rounded-md -ml-2 border-l-2 border-[#05b7d6]">
                    <PlayCircle className="w-4 h-4" />
                    <span className="truncate font-medium">Widgets 101</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-slate-600">
                    <div className="w-4 h-4 rounded-full border border-slate-700"></div>
                    <span className="truncate">State Mgt</span>
                  </div>
                </div>
                
                <div className="mt-8">
                  <div className="text-xs text-slate-500 font-bold mb-3 uppercase tracking-wider">Your Progress</div>
                  <div className="flex items-center gap-2 p-2 bg-[#27272A] rounded border border-slate-800">
                    <Flame className="w-4 h-4 text-orange-400" />
                    <span className="text-sm font-bold text-slate-200">12 Days</span>
                  </div>
                </div>
              </div>

              {/* Main Content Area */}
              <div className="flex-1 flex flex-col min-w-0 bg-[#09090B]">
                {/* Top Half: Reading / Video Area */}
                <div className="p-6 md:p-8 border-b border-[#27272A] flex flex-col xl:flex-row items-start xl:items-center gap-8 shrink-0">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 text-xs text-slate-400 mb-3 font-mono">
                      <span>Flutter Basics</span>
                      <ChevronRight className="w-3 h-3" />
                      <span className="text-[#05b7d6]">Widgets 101</span>
                    </div>
                    <h3 className="text-2xl font-bold text-slate-100 mb-3 font-[family-name:var(--font-space-grotesk),sans-serif]">Building Your First UI</h3>
                    <p className="text-sm text-slate-400 leading-relaxed">
                      In Flutter, everything is a widget. Watch this short video to understand the basics of 
                      <span className="text-[#05b7d6] font-mono mx-1">StatelessWidget</span> and 
                      <span className="text-[#05b7d6] font-mono mx-1">StatefulWidget</span> before you start coding.
                    </p>
                  </div>
                  
                  {/* Video Mockup */}
                  <div className="w-full xl:w-[320px] aspect-video shrink-0 bg-[#18181B] border border-[#27272A] rounded-xl relative flex items-center justify-center overflow-hidden group cursor-pointer shadow-lg">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img alt="Code on screen" className="absolute inset-0 w-full h-full object-cover opacity-30 group-hover:opacity-40 transition-opacity" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBKD207uxT9g7l_tkbfA6ROalIGh47AdrG0LqoSO6LzFBRRhgmKEpgj2Slk7qhqcpRgWLq07O_DDKUX2AIKBH2wViTyLP0JHUJHyaSG3Q3swY5g2Xa93pZGg6BaVAgFeOsLgQaxygs-fMnDdujowYqEEoCuyrOw4xRyGIrQ3cODBLAwjajskMjcEATJ7mdYWiohHQWNO8Wpggr52J710G_Hs6KAbVycgTeH0B0CZjOwSYZggKQxU7H5D_Wc4iJvf5q7N4EUj654wMRt" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#09090B]/80 to-transparent"></div>
                    <div className="w-12 h-12 rounded-full bg-[#05b7d6]/20 flex items-center justify-center border-2 border-[#05b7d6]/50 backdrop-blur-sm group-hover:scale-110 transition-transform z-10 shadow-[0_0_12px_rgba(5,183,214,0.4)]">
                      <PlayCircle className="w-6 h-6 text-[#05b7d6]" />
                    </div>
                    <div className="absolute bottom-3 left-4 right-4 flex justify-between items-center z-10 text-[10px] text-slate-300 font-mono">
                      <span>Understanding Widgets</span>
                      <span>03:42</span>
                    </div>
                  </div>
                </div>

                {/* Bottom Half: Split Editor & Emulator */}
                <div className="flex flex-1 overflow-hidden min-h-[300px]">
                  {/* Code Area */}
                  <div className="flex-1 bg-[#18181B] flex flex-col p-4 relative overflow-hidden">
                <div className="text-[#05b7d6] font-mono text-sm mb-4 flex items-center justify-between border-b border-[#27272A] pb-2">
                  <span>main.dart</span>
                  <div className="flex items-center gap-2 bg-[#27272A] px-3 py-1 rounded text-emerald-400 text-xs shadow-sm hover:bg-slate-800 transition-colors cursor-pointer">
                    <PlayCircle className="w-3 h-3" /> Run Code
                  </div>
                </div>
                <pre className="text-sm font-mono leading-loose text-slate-300 overflow-hidden relative">
<span className="text-pink-400">import</span> <span className="text-green-300">'package:flutter/material.dart'</span>;<br/><br/>
<span className="text-pink-400">void</span> <span className="text-blue-400">main</span>() {'{'} <br/>
&nbsp;&nbsp;<span className="text-blue-400">runApp</span>(<span className="text-yellow-200">MyApp</span>()); <br/>
{'}'} <br/><br/>
<span className="text-pink-400">class</span> <span className="text-yellow-200">MyApp</span> <span className="text-pink-400">extends</span> <span className="text-yellow-200">StatelessWidget</span> {'{'} <br/>
&nbsp;&nbsp;<span className="text-slate-500 italic">@override</span> <br/>
&nbsp;&nbsp;<span className="text-yellow-200">Widget</span> <span className="text-blue-400">build</span>(<span className="text-yellow-200">BuildContext</span> context) {'{'} <br/>
&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-pink-400">return</span> <span className="text-yellow-200">MaterialApp</span>( <br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;home: <span className="text-yellow-200">Scaffold</span>( <br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;body: <span className="text-yellow-200">Center</span>( <br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;child: <span className="text-yellow-200">Text</span>(<span className="text-green-300">'Hello World!'</span>), <br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;),<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;),<br/>
&nbsp;&nbsp;&nbsp;&nbsp;);<br/>
&nbsp;&nbsp;{'}'} <br/>
{'}'}
                <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#18181B] to-transparent"></div>
                </pre>
              </div>

              {/* Emulator Screen */}
              <div className="w-72 bg-[#09090B] border-l border-[#27272A] hidden lg:flex items-center justify-center p-6 shrink-0 relative bg-grid">
                <div className="absolute inset-0 bg-[#09090B]" style={{ backgroundImage: "radial-gradient(#27272A 1px, transparent 1px)", backgroundSize: "16px 16px" }}></div>
                
                <div className="w-[240px] h-[480px] border-[10px] border-[#27272A] rounded-[2rem] bg-white relative shadow-2xl flex flex-col overflow-hidden z-10">
                  <div className="absolute top-0 inset-x-0 h-5 bg-[#27272A] rounded-b-lg w-24 mx-auto z-20"></div>
                  <div className="h-12 bg-[#05b7d6] flex items-center px-4 shadow-sm text-[#09090B] pt-2 z-10 font-medium">
                    <span className="text-sm">Flutter Demo</span>
                  </div>
                  <div className="flex-1 flex items-center justify-center bg-gray-50 text-slate-800">
                    <span className="text-lg">Hello World!</span>
                  </div>
                  <div className="absolute bottom-1 inset-x-0 h-1 bg-gray-300 w-20 mx-auto rounded-full z-20"></div>
                </div>
              </div>

                </div>
              </div>

            </div>
          </div>
        </div>

        {/* FEATURES GRID */}
        <section className="mt-32 max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4 font-[family-name:var(--font-space-grotesk),sans-serif] text-slate-100">{t.methodTitle}</h2>
            <p className="text-slate-400 max-w-2xl mx-auto text-lg">{t.methodDesc}</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-[#18181B] p-8 rounded-2xl border border-[#27272A] hover:border-[#05b7d6]/50 transition-colors group">
              <div className="w-14 h-14 bg-indigo-500/10 rounded-xl flex items-center justify-center mb-6 text-indigo-400 group-hover:scale-110 transition-transform">
                <PlayCircle className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold mb-3 text-slate-100 font-[family-name:var(--font-space-grotesk),sans-serif]">
                {t.featVideo}
              </h3>
              <p className="text-slate-400 leading-relaxed text-lg">
                {t.featVideoDesc}
              </p>
            </div>

            <div className="bg-[#18181B] p-8 rounded-2xl border border-[#27272A] hover:border-[#05b7d6]/50 transition-colors group">
              <div className="w-14 h-14 bg-[#05b7d6]/10 rounded-xl flex items-center justify-center mb-6 text-[#05b7d6] group-hover:scale-110 transition-transform">
                <TerminalSquare className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold mb-3 text-slate-100 font-[family-name:var(--font-space-grotesk),sans-serif]">
                {t.featSnippet}
              </h3>
              <p className="text-slate-400 leading-relaxed text-lg">
                {t.featSnippetDesc}
              </p>
            </div>
          </div>
        </section>

        {/* GAMIFICATION SECTION */}
        <section className="mt-32 border-t border-b border-[#27272A] bg-[#18181B]/50 py-24 -mx-6 px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold mb-4 font-[family-name:var(--font-space-grotesk),sans-serif] text-slate-100">{t.funTitle}</h2>
              <p className="text-slate-400 max-w-2xl mx-auto text-lg">{t.funDesc}</p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center p-6 bg-[#09090B] rounded-2xl border border-[#27272A]">
                <div className="inline-flex w-16 h-16 rounded-full bg-amber-500/10 items-center justify-center mb-4 border border-amber-500/20">
                  <Star className="w-8 h-8 text-amber-500" />
                </div>
                <h4 className="text-xl font-bold mb-2 font-[family-name:var(--font-space-grotesk),sans-serif] text-slate-200">{t.xpTitle}</h4>
                <p className="text-slate-400">{t.xpDesc}</p>
              </div>

              <div className="text-center p-6 bg-[#09090B] rounded-2xl border border-[#05b7d6]/20 shadow-[0_0_15px_rgba(5,183,214,0.1)] relative">
                <div className="absolute inset-0 bg-gradient-to-b from-[#05b7d6]/5 to-transparent rounded-2xl pointer-events-none"></div>
                <div className="inline-flex w-16 h-16 rounded-full bg-orange-500/10 items-center justify-center mb-4 border border-orange-500/40 shadow-[0_0_15px_rgba(249,115,22,0.6)]">
                  <Flame className="w-8 h-8 text-orange-500" />
                </div>
                <h4 className="text-xl font-bold mb-2 font-[family-name:var(--font-space-grotesk),sans-serif] text-slate-100">{t.streakTitle}</h4>
                <p className="text-slate-400">{t.streakDesc}</p>
              </div>

              <div className="text-center p-6 bg-[#09090B] rounded-2xl border border-[#27272A]">
                <div className="inline-flex w-16 h-16 rounded-full bg-purple-500/10 items-center justify-center mb-4 border border-purple-500/20">
                  <Award className="w-8 h-8 text-purple-400" />
                </div>
                <h4 className="text-xl font-bold mb-2 font-[family-name:var(--font-space-grotesk),sans-serif] text-slate-200">{t.badgeTitle}</h4>
                <p className="text-slate-400">{t.badgeDesc}</p>
              </div>
            </div>
          </div>
        </section>

        {/* CURRICULUM SECTION */}
        <section id="curriculum" className="mt-24 max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-12 font-[family-name:var(--font-space-grotesk),sans-serif] text-slate-100">{t.curriculumTitle}</h2>
          
          <div className="flex flex-col gap-4 text-left">
            {[t.course1, t.course2, t.course3, t.course4].map((course, idx) => (
              <div key={idx} className="flex items-center gap-4 bg-[#18181B] p-5 rounded-xl border border-[#27272A] hover:border-[#05b7d6]/40 transition-colors group cursor-pointer">
                <div className="w-10 h-10 rounded-full bg-[#27272A] group-hover:bg-[#05b7d6]/20 flex items-center justify-center shrink-0 transition-colors">
                  <span className="font-mono text-slate-400 group-hover:text-[#05b7d6] text-sm transition-colors">0{idx + 1}</span>
                </div>
                <div className="font-semibold text-lg text-slate-200 group-hover:text-slate-100 transition-colors">
                  {course}
                </div>
                <ChevronRight className="w-5 h-5 ml-auto text-slate-600 group-hover:text-[#05b7d6] transition-colors" />
              </div>
            ))}
          </div>

          <div className="mt-16">
            <Link
              href="/signup"
              className="inline-flex items-center gap-2 px-10 py-4 mb-4 rounded-xl bg-slate-100 hover:bg-white text-slate-900 font-bold text-lg transition-all"
            >
              {t.ctaStart}
            </Link>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="border-t border-[#27272A] bg-[#09090B] py-12 mt-20">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-[#05b7d6] flex items-center justify-center text-[#09090B] font-bold text-xs shadow-[0_0_8px_rgba(5,183,214,0.3)]">
              F
            </div>
            <span className="font-bold text-slate-300 font-[family-name:var(--font-space-grotesk),sans-serif]">FlutterCamp</span>
          </div>
          <p className="text-slate-500 text-sm">© {new Date().getFullYear()} FlutterCamp MVP. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
