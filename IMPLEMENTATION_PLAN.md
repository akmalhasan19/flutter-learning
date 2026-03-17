# Implementation Plan

## Project

- Product: Flutter Learning MVP
- Positioning: Simpel, Efektif, dan Seru
- Primary stack: Next.js App Router, Tailwind CSS, shadcn/ui, Supabase, Vercel
- Audience: Pemula Flutter
- MVP goal: Membawa user dari landing page sampai menyelesaikan modul Flutter pertama dengan pengalaman belajar yang cepat, jelas, dan menyenangkan.

## Working Rules

- Gunakan App Router dan Server Components sebagai default.
- Gunakan Client Components hanya untuk interaksi yang memang butuh browser state atau realtime subscription.
- Gunakan Supabase sebagai source of truth untuk auth, progress, rewards, dan curriculum metadata.
- Gunakan repo-managed lesson content untuk mempercepat authoring MVP.
- Semua progress, XP, streak, dan badge dihitung server-side.
- Hindari fitur di luar MVP seperti CMS admin, pembayaran, forum, AI tutor, dan leaderboard publik penuh.

## Milestone Summary

| Phase | Fokus | Outcome utama |
| --- | --- | --- |
| Phase 1 | Scope, IA, content model | Scope terkunci dan struktur produk jelas |
| Phase 2 | Foundation frontend, auth, learning flow | Produk inti sudah bisa dipakai end-to-end |
| Phase 3 | Playground, gamification, storage | Pengalaman belajar terasa interaktif dan seru |
| Phase 4 | CI/CD, QA, launch readiness | MVP siap dideploy ke Vercel |

## Task 1 - Lock MVP Scope dan Product Rules

Objective: Mengunci batasan MVP agar pengembangan 4 minggu tetap realistis.

Deliverables:
- Scope MVP tertulis dan disetujui
- Definisi fitur in-scope dan out-of-scope
- Success criteria untuk first-time user

Dependencies: None

Subtasks:
- [x] Finalkan value proposition: belajar Flutter pertama yang simpel, efektif, dan seru.
- [x] Tetapkan target user utama: pemula total yang belum nyaman dengan Flutter.
- [x] Tetapkan scope pembelajaran hanya 1 beginner learning path.
- [x] Tetapkan format lesson: teks + video singkat + snippet.
- [x] Tetapkan metode auth MVP: email + password.
- [x] Tetapkan scope bahasa: bilingual ID + EN.
- [x] Tetapkan daftar fitur yang sengaja dikeluarkan dari MVP.
- [x] Tetapkan success metric awal: signup, lesson start, lesson complete, return visit.

## Task 2 - Susun Information Architecture dan Routing

Objective: Membuat struktur halaman dan segment route yang rapi sejak awal.

Deliverables:
- Struktur URL utama
- Route groups untuk marketing, auth, dan app area
- Mapping halaman inti MVP

Dependencies: Task 1

Subtasks:
- [x] Tetapkan locale routing pattern dengan format /[locale]/....
- [x] Definisikan route untuk marketing page di /[locale].
- [x] Definisikan route login di /[locale]/login.
- [x] Definisikan route signup di /[locale]/signup.
- [x] Definisikan route dashboard di /[locale]/dashboard.
- [x] Definisikan route learning catalog di /[locale]/learn.
- [x] Definisikan route course detail di /[locale]/learn/[courseSlug].
- [x] Definisikan route lesson detail di /[locale]/lesson/[lessonSlug].
- [x] Tentukan layout terpisah untuk area marketing dan authenticated app.
- [x] Tentukan loading, error, not-found, metadata, sitemap, dan robots strategy.

## Task 3 - Finalkan Content Model dan Authoring Strategy

Objective: Menentukan di mana metadata dan body content disimpan agar authoring cepat tetapi tetap scalable.

Deliverables:
- Keputusan hybrid content model
- Struktur entity course/module/lesson
- Konvensi authoring konten bilingual

Dependencies: Task 1

Subtasks:
- [x] Putuskan bahwa course, module, lesson, progress, rewards disimpan di Supabase.
- [x] Putuskan bahwa body lesson disimpan di repo sebagai markdown atau MDX.
- [x] Definisikan struktur folder content untuk bahasa Indonesia.
- [x] Definisikan struktur folder content untuk bahasa Inggris.
- [x] Definisikan schema metadata lesson yang konsisten untuk kedua bahasa.
- [x] Definisikan aturan slug agar stabil lintas locale.
- [x] Definisikan field snippet metadata untuk kebutuhan DartPad embed.
- [x] Definisikan field video metadata untuk lesson yang punya video.
- [x] Tentukan fallback rule jika translasi lesson belum lengkap.

## Task 4 - Bootstrap Frontend Foundation

Objective: Menyiapkan fondasi project Next.js modern yang siap dikembangkan cepat.

Deliverables:
- Project Next.js App Router berjalan
- Tailwind CSS dan shadcn/ui terpasang
- Struktur folder dasar production-ready

Dependencies: Task 2, Task 3

Subtasks:
- [x] Inisialisasi project Next.js dengan TypeScript, ESLint, dan App Router.
- [x] Gunakan src folder untuk memisahkan source code dari config root.
- [x] Pasang dan konfigurasi Tailwind CSS.
- [x] Pasang dan konfigurasi shadcn/ui.
- [x] Buat design token dasar untuk warna, spacing, radius, dan typography.
- [x] Buat root layout dan locale layout.
- [x] Siapkan folder components, lib, app actions, content, dan public.
- [x] Siapkan komponen layout global seperti header, footer, dan container.
- [x] Siapkan state visual untuk loading, empty state, dan error state.
- [x] Siapkan metadata dasar untuk SEO dan social preview.

## Task 5 - Implement Supabase Project Setup

Objective: Menyiapkan Supabase sebagai backbone backend MVP.

Deliverables:
- Project Supabase aktif
- Environment variable map jelas
- Struktur migration siap dipakai

Dependencies: Task 4

Subtasks:
- [x] Buat project Supabase untuk environment development.
- [x] Siapkan variable NEXT_PUBLIC_SUPABASE_URL.
- [x] Siapkan variable NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY.
- [x] Siapkan server-side secret yang dibutuhkan hanya untuk backend.
- [x] Buat folder supabase/migrations.
- [x] Definisikan strategi seed data untuk course dan lesson awal.
- [x] Definisikan naming convention untuk table, enum, dan SQL functions.
- [x] Definisikan policy bahwa schema changes wajib lewat migration.

## Task 6 - Implement Authentication dan Access Control

Objective: Menyediakan login flow yang aman dan sesuai best practice App Router + Supabase SSR.

Deliverables:
- Signup/login/logout flow berjalan
- Session refresh strategy berjalan
- Access control dasar dan RLS aktif

Dependencies: Task 5

Subtasks:
- [x] Pasang package @supabase/supabase-js dan @supabase/ssr.
- [x] Buat browser Supabase client.
- [x] Buat server Supabase client.
- [x] Buat proxy helper untuk session refresh berbasis cookie.
- [x] Tambahkan proxy route matcher yang aman.
- [x] Buat form signup dengan validasi server-side.
- [x] Buat form login dengan validasi server-side.
- [x] Buat action logout.
- [x] Buat Data Access Layer untuk verifikasi session.
- [x] Hindari auth check utama di layout; letakkan di DAL dan action layer.
- [x] Buat RLS policy untuk data profile dan progress milik user.
- [x] Uji signup, login, logout, refresh session, dan route protection.

## Task 7 - Rancang Database Schema MVP

Objective: Menetapkan schema Supabase yang cukup untuk learning flow dan gamification.

Deliverables:
- Tabel inti MVP
- Relasi utama
- SQL migration pertama

Dependencies: Task 5

Subtasks:
- [x] Buat tabel profiles.
- [x] Buat tabel courses.
- [x] Buat tabel modules.
- [x] Buat tabel lessons.
- [x] Buat tabel lesson_translations atau metadata equivalent sesuai keputusan final.
- [x] Buat tabel user_lesson_progress.
- [x] Buat tabel daily_activity.
- [x] Buat tabel xp_events.
- [x] Buat tabel badges.
- [x] Buat tabel user_badges.
- [x] Tambahkan foreign key dan unique constraint yang relevan.
- [x] Tambahkan index untuk query learning path dan progress lookup.
- [x] Tambahkan timestamp field standar untuk auditing minimum.

## Task 8 - Bangun Landing Page dan Marketing Experience

Objective: Membuat landing page yang langsung menjelaskan manfaat produk dan mendorong signup.

Deliverables:
- Landing page bilingual
- CTA yang jelas
- Preview kurikulum dan gamification hooks

Dependencies: Task 4, Task 6

Subtasks:
- [x] Tulis hero section dengan promise produk yang tajam.
- [x] Tampilkan penjelasan learning method yang to-the-point.
- [x] Tampilkan preview learning path beginner.
- [x] Tampilkan section “kenapa seru” dengan XP, streak, dan badge.
- [x] Tampilkan contoh lesson flow dalam 3 langkah singkat.
- [x] Tampilkan CTA signup dan CTA lihat kurikulum.
- [x] Siapkan copy ID dan EN untuk seluruh section utama.
- [x] Optimalkan layout mobile dan desktop.

## Task 9 - Bangun Learning Dashboard dan Curriculum Experience

Objective: Menyediakan home base untuk learner setelah login.

Deliverables:
- Dashboard learner
- Halaman curriculum overview
- Course detail page

Dependencies: Task 6, Task 7, Task 8

Subtasks:
- [x] Buat dashboard dengan greeting, total XP, current streak, dan progress ringkas.
- [x] Buat section “lanjutkan belajar” yang menunjuk lesson berikutnya.
- [x] Buat halaman /learn untuk overview curriculum.
- [x] Buat halaman course detail dengan daftar module dan lesson.
- [x] Tampilkan estimasi durasi per lesson.
- [x] Tampilkan state locked, available, dan completed.
- [x] Tampilkan badge progress atau completion percent per course.
- [x] Pastikan data dashboard hanya menampilkan data milik user aktif.

## Task 10 - Bangun Lesson Experience End-to-End

Objective: Membuat halaman lesson yang nyaman dipakai pemula dan jelas langkahnya.

Deliverables:
- Lesson page dengan content, video, snippet, dan CTA completion
- Progress sidebar atau navigator
- Completion flow yang terasa rewarding

Dependencies: Task 3, Task 6, Task 7, Task 9

Subtasks:
- [x] Buat lesson layout dengan fokus baca yang nyaman.
- [x] Tampilkan title, objective, durasi, dan prerequisite jika ada.
- [x] Tampilkan video singkat bila lesson punya video.
- [x] Tampilkan snippet atau playground section bila tersedia.
- [x] Tampilkan highlight point atau checklist pembelajaran per lesson.
- [x] Buat tombol “mark as complete” yang memicu server action.
- [x] Buat tombol “next lesson” setelah completion.
- [x] Tampilkan progress sidebar atau mini navigator antar lesson.
- [x] Tampilkan state completion yang jelas setelah action berhasil.
- [x] Pastikan lesson page tetap usable di mobile viewport.

## Task 11 - Integrasikan DartPad sebagai Playground MVP

Objective: Memberi ruang praktik cepat tanpa membangun playground custom yang mahal.

Deliverables:
- Wrapper DartPad embed
- Mapping snippet per lesson
- Fallback open external

Dependencies: Task 3, Task 10

Subtasks:
- [x] Tetapkan strategi embed menggunakan iframe berbasis gist.
- [x] Buat komponen dartpad-embed client-side.
- [x] Tambahkan loading state untuk iframe.
- [x] Tambahkan empty state jika snippet tidak tersedia.
- [x] Tambahkan tombol “Open in DartPad”.
- [x] Siapkan daftar gist atau snippet source untuk lesson yang dipilih.
- [x] Validasi bahwa embed tidak merusak hydration dan route transition.
- [x] Catat event analytics saat playground dibuka.

## Task 12 - Implement Gamification Engine

Objective: Membuat pengalaman belajar terasa hidup lewat progres yang terlihat.

Deliverables:
- XP awarding flow
- Streak update flow
- Badge awarding flow

Dependencies: Task 7, Task 10

Subtasks:
- [x] Definisikan aturan XP per lesson completion.
- [x] Definisikan aturan streak berdasarkan daily activity.
- [x] Definisikan rule badge untuk first lesson, module completion, dan streak milestone.
- [x] Buat server action untuk completion event yang authoritative.
- [x] Simpan event ke xp_events saat lesson selesai.
- [x] Update total_xp di profile atau lewat SQL function yang setara.
- [x] Update current_streak dan longest_streak.
- [x] Insert user_badges jika milestone terpenuhi.
- [x] Buat UI feedback seperti toast atau reward state setelah completion.
- [x] Pastikan event tidak bisa dipicu berulang untuk farming XP.

## Task 13 - Tambahkan Supabase Realtime untuk Feedback Live

Objective: Memperbarui UI progres dan reward tanpa refresh manual.

Deliverables:
- Subscription realtime untuk progress atau reward state
- Dashboard/header update live

Dependencies: Task 12

Subtasks:
- [x] Tentukan channel realtime yang dibutuhkan.
- [x] Tentukan apakah memakai Postgres Changes atau broadcast untuk MVP.
- [x] Tambahkan subscription di komponen client yang relevan.
- [x] Update widget XP dan streak secara live setelah event baru masuk.
- [x] Update badge state secara live setelah badge diberikan.
- [x] Pastikan unsubscribe berjalan saat component unmount.
- [x] Uji behavior saat dua tab dibuka bersamaan.

## Task 14 - Implement Asset dan Video Storage Strategy

Objective: Menyimpan asset pembelajaran secara sederhana tetapi tetap rapih dan aman.

Deliverables:
- Bucket strategy dasar
- Asset path convention
- Media policy untuk MVP

Dependencies: Task 5, Task 10

Subtasks:
- [x] Tentukan bucket untuk thumbnails, illustrations, badges, dan videos.
- [x] Tetapkan naming convention file asset.
- [x] Simpan path asset di database bila relevan.
- [x] Tentukan batas ukuran video untuk MVP.
- [x] Siapkan compression workflow sederhana sebelum upload video.
- [x] Definisikan access policy untuk asset publik vs private.
- [x] Uji load asset pada lesson dan landing page.

## Task 15 - Tambahkan Analytics dan Event Tracking

Objective: Mengukur funnel utama dan menguji apakah MVP benar-benar dipakai.

Deliverables:
- Event list MVP
- Tracking di titik funnel penting
- Dasar evaluasi activation dan retention awal

Dependencies: Task 8, Task 10, Task 11, Task 12

Subtasks:
- [x] Definisikan event signup_started.
- [x] Definisikan event signup_completed.
- [x] Definisikan event lesson_started.
- [x] Definisikan event lesson_completed.
- [x] Definisikan event dartpad_opened.
- [x] Definisikan event badge_awarded.
- [x] Pasang tracking di halaman atau action yang relevan.
- [x] Pastikan event naming konsisten lintas locale.
- [x] Tentukan dashboard metrik yang akan dipantau setelah launch.

## Task 16 - Set Up CI/CD dan Deployment ke Vercel

Objective: Membuat alur deploy yang aman, cepat, dan mudah dipantau.

Deliverables:
- Project Vercel terhubung ke repo
- Preview deployment aktif
- Production deployment siap dipakai

Dependencies: Task 4, Task 5, Task 6

Subtasks:
- [ ] Hubungkan repository ke Vercel.
- [ ] Siapkan environment local, preview, dan production.
- [ ] Masukkan env vars Supabase ke Vercel project settings.
- [ ] Validasi bahwa server-side secrets tidak bocor ke client.
- [ ] Uji preview deployment dari branch atau pull request.
- [ ] Uji production deployment dari main branch.
- [ ] Validasi route auth, lesson, dan content di preview environment.
- [ ] Dokumentasikan langkah recovery jika deploy gagal.

## Task 17 - QA, Hardening, dan Launch Checklist

Objective: Memastikan core journey MVP stabil sebelum dipublikasikan.

Deliverables:
- Checklist QA lintas fitur
- Critical issues ditutup
- MVP siap soft launch

Dependencies: Task 6 sampai Task 16

Subtasks:
- [ ] Uji landing page ke signup flow.
- [ ] Uji signup ke dashboard redirect flow.
- [ ] Uji start lesson sampai mark as complete.
- [ ] Uji XP, streak, dan badge update setelah completion.
- [ ] Uji consistency data saat page di-refresh.
- [ ] Uji bilingual content untuk halaman utama dan lesson.
- [ ] Uji access control untuk user yang belum login.
- [ ] Uji RLS agar user tidak bisa mengakses data user lain.
- [ ] Uji mobile responsiveness pada landing, dashboard, dan lesson page.
- [ ] Uji fallback behavior untuk DartPad embed.
- [ ] Uji broken link, missing translation, dan missing asset.
- [ ] Uji preview deploy dan production deploy terakhir.

## Task 18 - Soft Launch Preparation

Objective: Menutup loop MVP dari sisi produk, operasional, dan pembelajaran awal setelah launch.

Deliverables:
- Soft launch checklist
- Early feedback loop
- Post-launch observation plan

Dependencies: Task 17

Subtasks:
- [ ] Pilih domain dan branding minimum untuk production.
- [ ] Siapkan seed data final untuk learning path pertama.
- [ ] Siapkan 1 jalur onboarding user baru yang jelas.
- [ ] Tentukan siapa tester awal atau batch user pertama.
- [ ] Siapkan formulir feedback atau channel feedback awal.
- [ ] Tetapkan 7 hari observasi metrik setelah launch.
- [ ] Catat backlog perbaikan pasca soft launch.

## Verification Checklist

- [ ] User baru dapat signup tanpa hambatan besar.
- [ ] User yang sudah login langsung melihat dashboard yang relevan.
- [ ] User dapat membuka lesson pertama dan menyelesaikannya.
- [ ] Progress lesson tersimpan dengan benar.
- [ ] XP bertambah sesuai rule yang ditetapkan.
- [ ] Streak ter-update sesuai aktivitas harian.
- [ ] Badge muncul saat milestone terpenuhi.
- [ ] Realtime update bekerja tanpa perlu hard refresh.
- [ ] DartPad embed tampil dengan fallback yang aman.
- [ ] Konten ID dan EN sama-sama dapat diakses.
- [ ] Preview deployment di Vercel usable untuk QA.
- [ ] Production deployment menarik environment variable yang benar.

## Out of Scope

- [ ] Admin CMS internal
- [ ] Payment atau subscription system
- [ ] Forum atau komunitas diskusi penuh
- [ ] AI tutor
- [ ] Public leaderboard yang kompleks
- [ ] Advanced Flutter track di luar beginner path
- [ ] Offline-first atau PWA penuh

## Notes

- Gunakan dokumen ini sebagai source of truth progres implementasi.
- Jika ada perubahan scope, update Task, Dependencies, dan Verification Checklist bersamaan.
- Jangan mulai task paralel jika dependency utamanya belum jelas.