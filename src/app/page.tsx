"use client";

import { useState } from "react";
import Link from "next/link";
import { PlayCircle, Code2, Trophy, Flame, Award, ChevronRight, CheckCircle2 } from "lucide-react";

type Locale = "id" | "en";

const translations = {
  id: {
    heroTitle: "Belajar Flutter: Simpel, Efektif, dan Seru",
    heroSubtitle: "Dari nol sampai mahir tanpa pusing setup. Tonton, ketik, dan langsung lihat hasilnya di browser-mu.",
    ctaStart: "Mulai Gratis Sekarang",
    ctaCurriculum: "Lihat Kurikulum",
    methodTitle: "Metode Belajar Spesial Untuk Pemula",
    methodDesc: "Kami membuang teori membosankan dan menggantinya dengan praktik nyata.",
    featVideo: "Video Pendek & Jelas",
    featVideoDesc: "Konsep dijelaskan dalam 1-2 menit saja, langsung ke intinya.",
    featSnippet: "Coding Langsung di Browser",
    featSnippetDesc: "Tidak perlu install Android Studio di awal. Ketik dan jalankan Dart langsung!",
    funTitle: "Bikin Belajar Jadi Ketagihan",
    funDesc: "Kumpulkan poin, jaga runtunan belajar, dan dapatkan lencana eksklusif.",
    xpTitle: "Dapatkan XP",
    xpDesc: "Setiap latihan memberimu XP untuk memantau sejauh mana kamu berkembang.",
    streakTitle: "Jaga Streak Harian",
    streakDesc: "Belajar sedikit tiap hari membangun kebiasaan coding yang kuat.",
    badgeTitle: "Raih Lencana",
    badgeDesc: "Dapatkan penghargaan setiap melewati tantangan atau modul baru.",
    flowTitle: "Cara Kerjanya?",
    step1: "1. Pahami Konsep",
    step1Desc: "Tonton penjelasan singkat atau baca ringkasan materi.",
    step2: "2. Praktik Langsung",
    step2Desc: "Selesaikan tantangan koding ringan per lesson.",
    step3: "3. Dapatkan Reward",
    step3Desc: "Raih XP atau badge saat berhasil menyelesaikannya.",
    curriculumTitle: "Intip Kurikulum Kami",
    course1: "Pengenalan Dart Dasar",
    course2: "Mengenal Widget Flutter",
    course3: "Membuat Layout Responsive",
    course4: "State Management Dasar",
    login: "Masuk",
  },
  en: {
    heroTitle: "Learn Flutter: Simple, Effective, and Fun",
    heroSubtitle: "From zero to hero without setup headaches. Watch, type, and see results directly in your browser.",
    ctaStart: "Start for Free Now",
    ctaCurriculum: "View Curriculum",
    methodTitle: "Special Learning Method for Beginners",
    methodDesc: "We throw away boring theories and replace them with real practice.",
    featVideo: "Short & Clear Videos",
    featVideoDesc: "Concepts explained in just 1-2 minutes, straight to the point.",
    featSnippet: "Code Directly in Browser",
    featSnippetDesc: "No need to install Android Studio at first. Type and run Dart right away!",
    funTitle: "Make Learning Addictive",
    funDesc: "Collect points, maintain learning streaks, and earn exclusive badges.",
    xpTitle: "Earn XP",
    xpDesc: "Every exercise grants you XP to track your progress.",
    streakTitle: "Keep Daily Streaks",
    streakDesc: "Learning a little every day builds strong coding habits.",
    badgeTitle: "Earn Badges",
    badgeDesc: "Get rewarded every time you pass a challenge or a new module.",
    flowTitle: "How It Works?",
    step1: "1. Understand Concept",
    step1Desc: "Watch a short explanation or read the material summary.",
    step2: "2. Hands-on Practice",
    step2Desc: "Complete light coding challenges per lesson.",
    step3: "3. Get Rewarded",
    step3Desc: "Earn XP or badges upon successful completion.",
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
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-blue-200">
      {/* Header */}
      <header className="absolute top-0 w-full p-6 flex justify-between items-center z-10 max-w-6xl mx-auto left-0 right-0">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded bg-blue-600 flex items-center justify-center text-white font-bold text-xl">F</div>
          <span className="font-bold text-xl tracking-tight hidden sm:block">FlutterCamp</span>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex bg-slate-200 p-1 rounded-full text-sm font-medium">
            <button 
              onClick={() => setLocale("id")} 
              className={`px-3 py-1 rounded-full transition-colors ${locale === "id" ? "bg-white shadow-sm" : "text-slate-500 hover:text-slate-800"}`}
            >
              ID
            </button>
            <button 
              onClick={() => setLocale("en")} 
              className={`px-3 py-1 rounded-full transition-colors ${locale === "en" ? "bg-white shadow-sm" : "text-slate-500 hover:text-slate-800"}`}
            >
              EN
            </button>
          </div>
          <Link href="/login" className="text-slate-600 font-medium hover:text-blue-600 transition-colors">
            {t.login}
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6 sm:px-12 text-center max-w-5xl mx-auto">
        <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-slate-900 mb-6 leading-tight">
          {t.heroTitle.split(":")[0]}: <br/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">
            {t.heroTitle.split(":")[1]}
          </span>
        </h1>
        <p className="text-lg sm:text-xl text-slate-600 mb-10 max-w-2xl mx-auto leading-relaxed">
          {t.heroSubtitle}
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/signup" className="flex items-center justify-center w-full sm:w-auto px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-full shadow-lg shadow-blue-200 transition-all hover:-translate-y-0.5">
            {t.ctaStart}
            <ChevronRight className="ml-2 w-5 h-5" />
          </Link>
          <a href="#curriculum" className="flex items-center justify-center w-full sm:w-auto px-8 py-4 bg-white border border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-slate-700 font-medium rounded-full shadow-sm transition-all">
            {t.ctaCurriculum}
          </a>
        </div>
      </section>

      {/* Value Props / Learning Method */}
      <section className="py-20 px-6 bg-white shrink-0">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">{t.methodTitle}</h2>
            <p className="text-slate-500 max-w-xl mx-auto">{t.methodDesc}</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center text-blue-600">
                  <PlayCircle className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">{t.featVideo}</h3>
                  <p className="text-slate-600">{t.featVideoDesc}</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-indigo-100 flex items-center justify-center text-indigo-600">
                  <Code2 className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">{t.featSnippet}</h3>
                  <p className="text-slate-600">{t.featSnippetDesc}</p>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-100 to-indigo-50 rounded-3xl transform rotate-3 scale-105 opacity-50"></div>
              <div className="relative bg-slate-900 rounded-2xl shadow-xl overflow-hidden p-6 text-sm font-mono text-blue-300">
                <div className="flex gap-2 mb-4 pb-4 border-b border-slate-700">
                  <span className="w-3 h-3 rounded-full bg-red-400"></span>
                  <span className="w-3 h-3 rounded-full bg-yellow-400"></span>
                  <span className="w-3 h-3 rounded-full bg-green-400"></span>
                </div>
                <p><span className="text-pink-400">import</span> {`'package:flutter/material.dart';`}</p>
                <div className="my-4" />
                <p><span className="text-pink-400">void</span> <span className="text-blue-200">main</span>() {'{'}</p>
                <p className="pl-4">runApp(<span className="text-green-300">MyApp</span>());</p>
                <p>{'}'}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Gamification Section */}
      <section className="py-24 px-6 bg-slate-900 text-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">{t.funTitle}</h2>
            <p className="text-slate-400 max-w-xl mx-auto">{t.funDesc}</p>
          </div>

          <div className="grid sm:grid-cols-3 gap-8">
            <div className="p-8 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition">
              <Trophy className="w-10 h-10 text-yellow-400 mb-6" />
              <h3 className="text-xl font-bold mb-3">{t.xpTitle}</h3>
              <p className="text-slate-400 leading-relaxed">{t.xpDesc}</p>
            </div>
            <div className="p-8 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition">
              <Flame className="w-10 h-10 text-orange-500 mb-6" />
              <h3 className="text-xl font-bold mb-3">{t.streakTitle}</h3>
              <p className="text-slate-400 leading-relaxed">{t.streakDesc}</p>
            </div>
            <div className="p-8 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition">
              <Award className="w-10 h-10 text-purple-400 mb-6" />
              <h3 className="text-xl font-bold mb-3">{t.badgeTitle}</h3>
              <p className="text-slate-400 leading-relaxed">{t.badgeDesc}</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3 Steps Flow */}
      <section className="py-20 px-6 bg-slate-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-16">{t.flowTitle}</h2>
          
          <div className="space-y-8">
            {[ 
              { title: t.step1, desc: t.step1Desc },
              { title: t.step2, desc: t.step2Desc },
              { title: t.step3, desc: t.step3Desc },
            ].map((step, i) => (
              <div key={i} className="flex gap-6 items-start bg-white p-6 rounded-2xl shadow-sm border border-slate-100 transition hover:shadow-md">
                <div className="w-12 h-12 shrink-0 rounded-full bg-blue-50 text-blue-600 font-bold flex items-center justify-center text-lg shadow-inner">
                  {i + 1}
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                  <p className="text-slate-500">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Curriculum Preview */}
      <section id="curriculum" className="py-24 px-6 bg-white border-t border-slate-100">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">{t.curriculumTitle}</h2>
          
          <div className="bg-slate-50 border border-slate-200 rounded-3xl overflow-hidden shadow-sm">
            <div className="p-6 bg-white border-b border-slate-100 flex items-center justify-between">
              <div className="font-bold text-lg">Path: Flutter Beginner</div>
              <div className="text-sm font-medium text-blue-600 bg-blue-50 px-3 py-1 rounded-full">4 Modules</div>
            </div>
            <div className="divide-y divide-slate-100">
              {[t.course1, t.course2, t.course3, t.course4].map((course, i) => (
                <div key={i} className="p-6 flex items-center hover:bg-slate-100 transition-colors">
                  <CheckCircle2 className="w-6 h-6 text-slate-300 mr-4 shrink-0" />
                  <span className="font-medium text-slate-700">Modul {i+1}: {course}</span>
                </div>
              ))}
            </div>
          </div>
          
          <div className="mt-12 text-center">
            <Link href="/signup" className="inline-flex items-center justify-center px-8 py-4 bg-slate-900 hover:bg-slate-800 text-white font-semibold rounded-full shadow-lg transition-all hover:-translate-y-0.5">
              {t.ctaStart}
              <ChevronRight className="ml-2 w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 text-center text-slate-500 border-t border-slate-200 bg-white">
        <p>© 2026 FlutterCamp. Simpel, Efektif, Seru.</p>
      </footer>
    </div>
  );
}
