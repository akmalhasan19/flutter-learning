# Implementation Plan: Hybrid Flutter Learning Without 24/7 Flutter Runner

## Project

- Product: Flutter Learning MVP
- Direction: Hybrid learning platform untuk belajar Flutter sungguhan tanpa menjalankan Flutter SDK server 24/7
- Primary stack: Next.js App Router, Supabase, Tailwind CSS, external runtime provider, on-demand grader runner
- Audience: Pemula Flutter
- MVP goal: Membawa user dari lesson konsep sampai menyelesaikan project Flutter beginner dengan kombinasi browser lab, project lab, progress tracking, dan gamification

## Product Decisions

- Website ini berperan sebagai orchestration layer untuk curriculum, progress, auth, gamification, dan analytics
- Browser lab menggunakan runtime pihak ketiga seperti DartPad untuk snippet dan latihan ringan
- Project lab tidak dijalankan di compiler persisten milik sendiri, tetapi di runner on-demand yang hidup hanya saat submission diproses
- Heavy auto-grading hanya dipakai pada lesson tertentu yang benar-benar butuh validasi Flutter sungguhan
- Beginner path menjadi fokus utama MVP

## Tracking Notes

- Gunakan `[x]` untuk subtask yang sudah selesai
- Gunakan `[ ]` untuk subtask yang belum selesai
- Checkbox di bawah sudah disesuaikan dengan kondisi repo saat ini berdasarkan implementasi yang sudah ada dan gap yang masih tersisa

## Milestone Summary

| Phase | Fokus | Outcome utama |
| --- | --- | --- |
| Phase 1 | Product architecture | Model hybrid terkunci dan lesson contract jelas |
| Phase 2 | Data and lesson rendering | Curriculum nyata dan lesson runtime berbasis metadata |
| Phase 3 | Assessment and grading | Submission flow dan on-demand grader berjalan |
| Phase 4 | Progress and product loop | Dashboard, gamification, analytics, dan QA siap dipakai |

## Task 1 - Lock Hybrid Learning Architecture

Objective: Mengunci model produk agar tim tidak mencoba membangun full online Flutter IDE sendiri.

Deliverables:
- Definisi resmi model hybrid learning
- Klasifikasi lesson type dan assessment type
- Scope yang jelas untuk beginner path MVP

Dependencies: None

Subtasks:
- [x] Putuskan bahwa website ini tidak akan memakai Flutter SDK server 24/7.
- [x] Putuskan bahwa model utama produk adalah hybrid: concept lesson, browser lab, dan project lab.
- [x] Putuskan bahwa runtime pihak ketiga boleh dipakai untuk pengalaman belajar.
- [x] Finalkan definisi lesson type yang akan muncul di curriculum dan dashboard.
- [x] Finalkan lesson mana yang cukup manual completion dan lesson mana yang wajib graded submission.
- [x] Tetapkan batasan resmi bahwa MVP tidak menyediakan arbitrary multi-file browser IDE milik sendiri.

## Task 2 - Define Lesson Runtime and Assessment Contract

Objective: Membuat kontrak metadata lesson yang cukup untuk merender UI, runtime, dan completion flow secara benar.

Deliverables:
- Schema metadata lesson baru
- Mapping runtime mode dan assessment mode
- Konvensi authoring untuk starter source dan grader target

Dependencies: Task 1

Subtasks:
- [x] Pastikan schema existing sudah punya dasar metadata seperti `snippet_id`, `video_path`, dan `body_ref`.
- [x] Tambahkan field `runtime_mode` pada lesson metadata.
- [x] Tambahkan field `assessment_mode` pada lesson metadata.
- [x] Tambahkan field `starter_source` untuk lesson yang punya starter template.
- [x] Tambahkan field `grader_target` atau identifier untuk hidden grader.
- [x] Tambahkan field `expected_outcomes` atau checklist objective yang bisa dirender di lesson page.
- [x] Tambahkan field `unlock_rule` untuk gating lesson berikutnya.
- [x] Dokumentasikan kontrak metadata ini di docs atau plan operasional tim.

## Task 3 - Replace Mock Curriculum With Real Data Sources

Objective: Menghilangkan mock data di lesson flow dan menggantinya dengan source of truth yang nyata.

Deliverables:
- Query curriculum dari Supabase
- Loader body lesson dari repo-managed Markdown atau MDX
- Fallback locale yang konsisten

Dependencies: Task 2

Subtasks:
- [x] Pertahankan Supabase sebagai source of truth untuk course, module, lesson, dan progress.
- [x] Ganti mock module dan lesson di lesson page dengan query database nyata.
- [x] Ganti mock curriculum di learn page dengan data course, module, dan lesson dari Supabase.
- [x] Ganti mock next lesson logic dengan urutan lesson nyata dari database.
- [x] Implement loader `body_ref` untuk membaca body lesson dari repo.
- [x] Tambahkan dukungan Markdown atau MDX untuk rendering content lesson.
- [x] Implement fallback locale jika translation belum tersedia.
- [x] Seed minimal satu beginner course yang cocok untuk model hybrid.

## Task 4 - Refactor Lesson Experience Into Runtime Adapters

Objective: Mengubah lesson shell saat ini dari UI mock menjadi renderer yang benar-benar mengikuti runtime lesson.

Deliverables:
- Runtime adapter untuk read-only lesson
- Runtime adapter untuk DartPad browser lab
- Runtime adapter untuk project lab

Dependencies: Task 2, Task 3

Subtasks:
- [x] Reuse komponen DartPad embed yang sudah ada sebagai dasar browser lab.
- [x] Reuse shell lesson dan workspace layout yang sudah ada sebagai dasar lesson experience.
- [x] Hapus editor palsu yang sekarang hanya menampilkan kode statis.
- [x] Render panel lesson berdasarkan `runtime_mode`.
- [x] Tambahkan surface read-only code viewer untuk lesson tanpa runtime aktif.
- [x] Tambahkan surface browser lab yang merender DartPad embed secara dinamis dari metadata lesson.
- [x] Tambahkan surface project lab yang menampilkan starter project info, CTA launch, dan CTA submit.
- [x] Tambahkan fallback UI saat runtime eksternal gagal dimuat.

## Task 5 - Build Completion Flow for Manual and Browser Labs

Objective: Menjaga lesson ringan tetap cepat diselesaikan tanpa merusak akurasi progress.

Deliverables:
- Completion flow untuk manual lesson
- Completion flow untuk browser lab
- Objective checklist yang jelas bagi user

Dependencies: Task 3, Task 4

Subtasks:
- [x] Pertahankan server action completion dasar yang sudah ada sebagai fondasi manual flow.
- [x] Pisahkan jalur completion manual dari jalur completion graded.
- [x] Tampilkan checklist atau objective yang harus diselesaikan user sebelum menekan complete.
- [x] Tambahkan validasi ringan agar lesson tidak selesai tanpa membuka atau mengakses runtime yang relevan bila dibutuhkan.
- [x] Pastikan browser lab dapat ditandai complete tanpa submission runner penuh.
- [x] Pastikan course unlock mengikuti status lesson completion yang nyata.

## Task 6 - Design Submission and Assessment Data Model

Objective: Menyediakan model data yang cukup untuk tracking submission, attempt history, dan result grading.

Deliverables:
- Migration baru untuk submission dan result
- RLS policy untuk submission milik user
- Status lifecycle submission yang jelas

Dependencies: Task 2

Subtasks:
- [x] Buat tabel `lesson_submissions`.
- [x] Buat tabel `assessment_results` atau satukan result ke tabel submission dengan struktur yang jelas.
- [x] Buat relasi ke `lessons`, `profiles`, dan artifact storage.
- [x] Tambahkan field status seperti `queued`, `running`, `passed`, `failed`, dan `infra_error`.
- [x] Tambahkan field `attempt_number`, `runner_job_id`, `summary`, `score`, dan `passed_at`.
- [x] Tambahkan field untuk menyimpan source reference atau snapshot metadata.
- [x] Tambahkan RLS policy agar user hanya melihat submission miliknya.
- [x] Tambahkan index untuk query by user, lesson, dan status.

## Task 7 - Build On-Demand Grader Orchestration

Objective: Menjalankan grading Flutter nyata hanya saat dibutuhkan, bukan lewat server persisten.

Deliverables:
- Submission creation flow
- Dispatcher ke runner provider
- Callback atau polling untuk update hasil grading

Dependencies: Task 6

Subtasks:
- [x] Pilih satu provider runner on-demand yang bisa dipicu secara programatis.
- [x] Definisikan abstraction layer agar provider bisa diganti tanpa rewrite besar.
- [x] Buat server action atau API endpoint untuk membuat submission baru.
- [x] Simpan submission sebagai `queued` sebelum job dikirim ke runner.
- [x] Implement dispatcher yang memicu job grading ke runner provider.
- [x] Implement callback webhook atau polling untuk menerima hasil grading.
- [x] Update submission status dari `queued` ke `running` lalu ke hasil final.
- [x] Simpan hasil ringkas yang bisa langsung dirender di lesson page.
- [x] Tangani timeout, retry, dan infra error secara eksplisit.

## Task 8 - Prepare Starter Projects and Hidden Graders

Objective: Membuat graded project lab yang terkurasi dan aman untuk beginner path.

Deliverables:
- Starter project template per graded lesson
- Hidden test suite per graded lesson
- Konvensi packaging submission yang aman

Dependencies: Task 6, Task 7

Subtasks:
- [x] Tentukan format starter project yang akan dibagikan ke user.
- [x] Buat whitelist file yang boleh dinilai untuk MVP.
- [x] Buat hidden test suite untuk setiap graded project lab.
- [x] Pisahkan public instructions dan private grader logic.
- [x] Simpan artifact starter project dan grader di lokasi yang konsisten.
- [x] Batasi graded project pertama pada use case beginner yang bernilai tinggi.

## Task 9 - Integrate Graded Results With Progress and Gamification

Objective: Memastikan XP, streak, badge, dan unlock state mengikuti hasil assessment yang benar.

Deliverables:
- Completion path khusus graded lesson
- Integrasi ke gamification engine
- Anti-double-reward pada graded submission

Dependencies: Task 5, Task 6, Task 7

Subtasks:
- [x] Reuse gamification engine existing untuk reward logic.
- [x] Tambahkan jalur completion khusus saat graded submission `passed`.
- [x] Pastikan graded lesson tidak bisa selesai lewat tombol manual biasa.
- [x] Pastikan reward tidak keluar dua kali untuk submission yang sama.
- [x] Revalidate lesson, dashboard, dan learn page setelah result final masuk.
- [x] Pastikan unlock lesson berikutnya bergantung pada outcome assessment yang benar.

## Task 10 - Upgrade Dashboard and Curriculum UX for Hybrid States

Objective: Membuat learner selalu tahu langkah berikutnya, status runtime, dan status assessment.

Deliverables:
- Dashboard yang menampilkan next actionable step
- Curriculum state untuk manual, browser lab, dan graded lab
- Submission state visibility di lesson dan dashboard

Dependencies: Task 3, Task 4, Task 9

Subtasks:
- [x] Reuse dashboard dan learn route existing sebagai dasar UX.
- [x] Tampilkan lesson type badge di curriculum.
- [x] Tampilkan status `manual`, `browser lab`, atau `graded project` di lesson detail.
- [x] Tampilkan latest submission status pada graded lesson.
- [x] Tampilkan next actionable CTA di dashboard berdasarkan progress nyata user.
- [x] Tampilkan blocking reason jika user belum lulus graded lesson.

## Task 11 - Extend Analytics, Observability, and Failure Handling

Objective: Mengukur efektivitas hybrid model dan menangani failure mode dengan rapi.

Deliverables:
- Event tracking baru
- Error state yang jelas
- Observability dasar untuk grading flow

Dependencies: Task 5, Task 7, Task 9

Subtasks:
- [x] Reuse analytics helper existing sebagai dasar tracking.
- [x] Tambahkan event `runtime_opened`.
- [x] Tambahkan event `submission_created`.
- [x] Tambahkan event `submission_passed` dan `submission_failed`.
- [x] Tambahkan event `grader_infra_error`.
- [x] Tambahkan event `lesson_blocked_by_assessment`.
- [x] Tampilkan error state yang jelas saat DartPad gagal dimuat.
- [x] Tampilkan error state yang jelas saat grading timeout atau provider gagal.

## Task 12 - Ship a Vertical Slice and Validate End-to-End

Objective: Membuktikan model hybrid ini bekerja sebelum memperluas jumlah lesson.

Deliverables:
- Satu vertical slice beginner yang lengkap
- QA checklist end-to-end
- Keputusan go or no-go untuk scale curriculum

Dependencies: Task 3 sampai Task 11

Subtasks:
- [x] Seed satu module contoh dengan 1 manual lesson, 1 browser lab, dan 1 graded project lab.
- [x] Verifikasi signup sampai lesson access berjalan end-to-end.
- [x] Verifikasi browser lab bisa dipakai tanpa backend Flutter milik sendiri.
- [x] Verifikasi graded submission melewati lifecycle `queued` ke hasil final.
- [x] Verifikasi XP, streak, badge, dan unlock state mengikuti hasil yang benar.
- [x] Uji failure mode seperti runtime gagal load, runner timeout, dan callback gagal.
- [x] Jalankan lint dan build untuk memastikan vertical slice stabil.
- [x] Lakukan QA desktop dan mobile untuk lesson experience utama.

## Out of Scope for This Plan

- Full self-hosted online Flutter IDE dengan compiler persisten
- Arbitrary multi-file Flutter project execution langsung di browser milik sendiri
- Auto-grading untuk seluruh lesson dari hari pertama
- Admin CMS internal
- Public leaderboard kompleks
- AI tutor

## Definition of Success

- User bisa login, membuka curriculum, dan memahami tipe lesson yang tersedia
- User bisa menyelesaikan lesson konsep dan browser lab langsung dari website
- User bisa mengerjakan minimal satu graded project Flutter dengan runner on-demand
- Progress, XP, streak, badge, dan unlock state tercatat dengan benar
- Produk memberikan pengalaman belajar Flutter yang nyata tanpa infrastruktur Flutter 24/7