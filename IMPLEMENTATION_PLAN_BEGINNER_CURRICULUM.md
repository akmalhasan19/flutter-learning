# Implementation Plan: Beginner Flutter Curriculum

## Project

- Product: Flutter Learning MVP
- Focus: Beginner curriculum yang benar-benar step-by-step untuk user awam
- Primary stack: Next.js App Router, Supabase, Tailwind CSS, hybrid runtime delivery
- Audience: Pemula total yang belum pernah belajar Flutter secara serius
- Primary goal: Membawa learner dari nol sampai mampu membuat aplikasi Flutter dasar end-to-end dengan alur belajar yang jelas, terarah, dan konsisten

## Product Decisions

- Versi pertama kurikulum ditulis dalam Bahasa Indonesia.
- Target akhir beginner path adalah user mampu membangun app Flutter dasar end-to-end, bukan sekadar memahami teori.
- Kurikulum diakses dari tab `Belajar` dan tombol `Buka Kurikulum` atau CTA belajar di Dashboard.
- Pengembangan fase pertama harus seimbang antara perluasan konten dan perbaikan UX belajar.
- Model delivery tetap mengikuti hybrid learning architecture: concept lesson, browser lab, dan project lab.
- Progression learner harus sequential dan mudah dipahami oleh user yang benar-benar awam.

## Tracking Notes

- Gunakan `[x]` untuk subtask yang sudah tersedia atau sudah didukung oleh fondasi repo saat ini.
- Gunakan `[ ]` untuk subtask yang belum dikerjakan atau masih perlu penguatan.
- Checkbox di bawah mencerminkan kondisi repo saat ini berdasarkan struktur produk, alur belajar, dan fondasi data yang sudah ada.

## Milestone Summary

| Phase | Fokus | Outcome utama |
| --- | --- | --- |
| Phase 1 | Curriculum strategy | Target kompetensi dan peta belajar terkunci |
| Phase 2 | Lesson system and content | Materi beginner tersedia dan konsisten |
| Phase 3 | Learning experience UX | Dashboard, Belajar, dan lesson flow benar-benar membimbing learner |
| Phase 4 | Rollout and validation | Kurikulum siap dipakai end-to-end oleh user baru |

## Task 1 - Lock Beginner Curriculum Scope

Objective: Mengunci target hasil belajar dan batasan beginner path agar kurikulum tidak melebar tanpa arah.

Deliverables:
- Definisi target outcome beginner path
- Batas in-scope dan out-of-scope untuk versi pertama
- Success criteria learner setelah menyelesaikan curriculum

Dependencies: None

Subtasks:
- [x] Tetapkan target akhir learner: mampu membangun aplikasi Flutter dasar end-to-end.
- [x] Tetapkan fokus audience: user yang benar-benar awam dengan Flutter.
- [x] Tetapkan bahasa utama phase pertama: Bahasa Indonesia.
- [x] Tetapkan prinsip bahwa kurikulum harus step-by-step dan sequential.
- [x] Finalkan daftar kemampuan yang wajib dikuasai learner saat lulus beginner path.
- [x] Finalkan daftar topik yang sengaja dikeluarkan dari phase pertama seperti state management lanjutan, testing mendalam, dan arsitektur enterprise.
- [x] Tetapkan success criteria yang terukur untuk completion beginner path.

## Task 2 - Finalize Curriculum Blueprint dan Learning Map

Objective: Menyusun peta pembelajaran yang progresif dari orientasi sampai capstone beginner.

Deliverables:
- Struktur modul beginner path
- Urutan lesson yang logis dan progresif
- Exit criteria per modul

Dependencies: Task 1

Subtasks:
- [x] Finalkan struktur 6 modul utama untuk beginner path.
- [x] Definisikan tujuan belajar untuk setiap modul.
- [x] Definisikan milestone lesson di setiap modul.
- [x] Tetapkan estimasi durasi realistis per modul dan per lesson.
- [x] Tetapkan exit criteria per modul sebelum learner lanjut ke modul berikutnya.
- [x] Pastikan urutan materi tidak mengasumsikan pengetahuan Flutter sebelumnya.
- [x] Pastikan seluruh lesson membentuk satu jalur prerequisite yang sederhana.

## Task 3 - Define Lesson Mix dan Assessment Strategy

Objective: Menentukan komposisi concept lesson, browser lab, dan project lab agar proses belajar terasa bertahap tetapi tetap praktikal.

Deliverables:
- Komposisi lesson per modul
- Mapping lesson type dan assessment mode
- Strategi checkpoint project untuk beginner path

Dependencies: Task 2

Subtasks:
- [x] Pertahankan tiga tipe lesson utama: concept lesson, browser lab, dan project lab.
- [x] Tetapkan jumlah target lesson untuk versi pertama, misalnya 18 sampai 24 lesson.
- [x] Tetapkan distribusi concept lesson per modul.
- [x] Tetapkan distribusi browser lab per modul.
- [x] Tetapkan jumlah graded project lab untuk beginner path.
- [x] Tentukan project checkpoint yang menutup kompetensi layout, state, dan capstone end-to-end.
- [x] Pastikan setiap graded lesson punya alasan pedagogis yang jelas, bukan hanya variasi format.

## Task 4 - Strengthen Lesson Metadata Contract untuk Curriculum UX

Objective: Memastikan metadata lesson cukup untuk merender roadmap, progress, dan panduan belajar pemula.

Deliverables:
- Audit field metadata yang sudah ada
- Daftar field tambahan bila benar-benar dibutuhkan
- Kontrak metadata yang sinkron dengan UX kurikulum

Dependencies: Task 2, Task 3

Subtasks:
- [x] Gunakan field existing seperti `runtime_mode`, `assessment_mode`, `expected_outcomes`, `body_ref`, `starter_source`, dan `grader_target` sebagai fondasi.
- [x] Gunakan `duration_minutes` sebagai basis estimasi durasi lesson.
- [x] Gunakan `unlock_rule` sebagai fondasi aturan gating lesson.
- [x] Audit apakah lesson membutuhkan field tambahan seperti `difficulty_level` atau `learning_stage`.
- [x] Audit apakah module membutuhkan goal summary yang bisa dirender di roadmap.
- [x] Finalkan field metadata minimum yang akan benar-benar dipakai di UI.
- [x] Dokumentasikan perubahan metadata di kontrak docs jika ada field baru.

## Task 5 - Establish Beginner-Friendly Lesson Authoring Template

Objective: Membuat standar authoring lesson yang konsisten dan mudah diikuti user pemula.

Deliverables:
- Template authoring Markdown untuk lesson beginner
- Struktur section lesson yang konsisten
- Checklist kualitas konten untuk writer atau contributor

Dependencies: Task 2, Task 4

Subtasks:
- [x] Gunakan repo-managed Markdown sebagai source of truth konten lesson.
- [x] Gunakan loader existing sebagai dasar pembacaan body lesson dari repo.
- [x] Definisikan template lesson dengan section tujuan belajar, penjelasan konsep, contoh, latihan, dan ringkasan.
- [x] Definisikan section common mistakes untuk lesson yang rawan membingungkan pemula.
- [x] Definisikan format expected outcomes yang konsisten antar lesson.
- [x] Definisikan gaya bahasa penulisan yang sederhana dan tidak terlalu teknis di awal.
- [x] Finalkan aturan kapan lesson cukup Markdown biasa dan kapan perlu frontmatter atau MDX.

## Task 6 - Author Beginner Curriculum Content Secara Berurutan

Objective: Mengisi materi beginner path secara berurutan dari dasar sampai capstone tanpa lompat konteks.

Deliverables:
- Konten lesson beginner dalam Bahasa Indonesia
- Sequence lesson yang siap di-seed ke sistem
- Peta coverage topik dasar Flutter

Dependencies: Task 2, Task 3, Task 5

Subtasks:
- [x] Pertahankan lesson awal yang sudah ada sebagai fondasi vertical slice.
- [x] Tulis lesson orientasi belajar Flutter dan cara memakai platform.
- [x] Tulis lesson Dart dasar: variables, types, operators, dan control flow.
- [x] Tulis lesson function dan collections yang relevan untuk Flutter.
- [x] Tulis lesson widget tree, MaterialApp, dan Scaffold.
- [x] Tulis lesson layout dasar seperti Row, Column, Padding, Center, dan ListView.
- [x] Tulis lesson stateless widget dan stateful widget.
- [x] Tulis lesson input, button interaction, dan form dasar.
- [x] Tulis lesson navigation dasar.
- [x] Tulis lesson async, Future, dan fetch data sederhana.
- [x] Tulis lesson local persistence ringan untuk level beginner.
- [x] Tulis mini project dan capstone yang menutup seluruh jalur belajar.

## Task 7 - Prepare Project Labs, Starter Projects, dan Hidden Graders

Objective: Menyediakan checkpoint project yang benar-benar memvalidasi kemampuan learner secara bertahap.

Deliverables:
- Starter project per graded lesson
- Hidden grader per graded lesson
- Rubrik lulus untuk setiap project lab

Dependencies: Task 3, Task 6

Subtasks:
- [x] Gunakan packaging convention dan contoh starter project existing sebagai referensi.
- [x] Gunakan fondasi submission flow dan grader provider yang sudah ada.
- [x] Finalkan project lab 1 untuk validasi layout dan widget composition.
- [x] Finalkan project lab 2 untuk validasi state dan interaction.
- [x] Finalkan capstone project untuk validasi flow app dasar end-to-end.
- [x] Siapkan starter source untuk setiap project lab.
- [x] Siapkan hidden grader target untuk setiap project lab.
- [x] Finalkan kriteria `passed` yang jelas dan relevan untuk pemula.

## Task 8 - Redesign Learn Page Menjadi Roadmap Kurikulum

Objective: Membuat tab Belajar benar-benar menjadi peta belajar yang memandu user dari titik mulai sampai modul terakhir.

Deliverables:
- Roadmap curriculum di halaman Belajar
- Visual hierarchy yang jelas untuk modul dan lesson
- CTA mulai belajar yang mudah dipahami user baru

Dependencies: Task 2, Task 4, Task 6

Subtasks:
- [x] Reuse halaman `Belajar` existing sebagai dasar surface roadmap.
- [x] Reuse progress aggregation course dan badge lesson yang sudah ada.
- [x] Tambahkan penanda `mulai dari sini` untuk learner baru.
- [x] Tampilkan deskripsi singkat tujuan setiap modul di roadmap.
- [x] Tampilkan estimasi durasi dan tingkat kesulitan lesson jika diperlukan.
- [x] Tampilkan alasan lock yang lebih mudah dipahami pemula.
- [x] Tampilkan milestone atau checkpoint per modul.
- [x] Pastikan roadmap mudah dipindai di desktop dan mobile.

## Task 9 - Upgrade Dashboard Entry Point untuk Kurikulum

Objective: Membuat Dashboard selalu menampilkan langkah berikutnya yang paling relevan untuk learner.

Deliverables:
- Onboarding state untuk learner baru
- Continue state yang lebih terarah
- Konsistensi CTA antara Dashboard dan tab Belajar

Dependencies: Task 2, Task 6, Task 8

Subtasks:
- [x] Gunakan Dashboard existing sebagai entry point utama learner setelah login.
- [x] Gunakan CTA `Buka Kurikulum` dan `Mulai Belajar` yang sudah ada sebagai fondasi.
- [x] Tambahkan onboarding card untuk user yang belum pernah memulai lesson.
- [x] Tampilkan current module dan next lesson yang lebih eksplisit.
- [x] Tampilkan target hasil belajar modul aktif di Dashboard.
- [x] Pastikan CTA pada state kosong mengarah ke roadmap kurikulum yang benar.
- [x] Pastikan CTA pada state in-progress mengarah ke next actionable lesson yang benar.
- [x] Sinkronkan copywriting Dashboard dengan terminology roadmap di halaman Belajar.

## Task 10 - Tighten Lesson Experience untuk Sequential Learning

Objective: Memastikan setiap halaman lesson membantu learner memahami posisi, tujuan, dan langkah berikutnya.

Deliverables:
- Lesson flow yang jelas dari satu lesson ke lesson berikutnya
- Expected outcomes yang terlihat dan actionable
- Pesan lock dan navigasi yang lebih membantu learner awam

Dependencies: Task 4, Task 6, Task 8, Task 9

Subtasks:
- [x] Gunakan lesson shell, sidebar, dan bottom bar existing sebagai fondasi.
- [x] Gunakan expected outcomes di bottom bar sebagai dasar checklist completion.
- [x] Gunakan gating sequential di lesson page sebagai fondasi rule unlock.
- [x] Tambahkan breadcrumb course, module, dan lesson yang lebih informatif.
- [x] Tampilkan konteks `kamu sedang di modul mana` dengan lebih jelas.
- [x] Tampilkan next lesson CTA setelah learner complete atau pass.
- [x] Perjelas pesan lesson terkunci dan langkah yang harus dikerjakan terlebih dulu.
- [x] Tampilkan recap singkat atau next step prompt setelah lesson selesai.

## Task 11 - Align Progression Rules, Completion Flow, dan Unlock Logic

Objective: Menjaga agar progress learner mengikuti desain kurikulum baru secara konsisten.

Deliverables:
- Rule completion yang tegas per tipe lesson
- Unlock logic yang sinkron dengan sequence kurikulum
- Revalidation behavior yang konsisten di seluruh surface belajar

Dependencies: Task 3, Task 7, Task 10

Subtasks:
- [x] Pertahankan `markLessonComplete()` hanya untuk concept lesson dan browser lab.
- [x] Pertahankan `submitGradedLesson()` sebagai jalur wajib untuk project lab.
- [x] Pertahankan progress tracking dan revalidation flow existing sebagai fondasi.
- [x] Finalkan rule unlock untuk transisi antar lesson di dalam modul.
- [x] Finalkan rule unlock untuk transisi antar modul.
- [x] Sinkronkan roadmap `Belajar`, lesson page, dan Dashboard terhadap state progression yang sama.
- [x] Pastikan capstone hanya terbuka setelah seluruh prerequisite penting benar-benar selesai.
- [x] Validasi bahwa learner selalu melihat next actionable step yang benar setelah completion.

## Task 12 - Seed, Rollout, dan Validate Curriculum End-to-End

Objective: Merilis kurikulum beginner path baru ke root product flow tanpa merusak vertical slice yang sudah ada.

Deliverables:
- Seed atau migration rollout plan untuk course dan lesson baru
- Validasi alur belajar end-to-end
- Checklist QA untuk learner baru

Dependencies: Task 6, Task 7, Task 8, Task 9, Task 10, Task 11

Subtasks:
- [x] Gunakan struktur seed dan migration existing sebagai fondasi rollout.
- [x] Tentukan apakah beginner curriculum baru menggantikan seed lama atau menjadi versi course baru.
- [x] Siapkan update seed atau migration untuk modules, lessons, translations, dan metadata baru.
- [x] Pastikan urutan `order_index` konsisten di seluruh course.
- [x] Validasi alur Dashboard ke Belajar ke Lesson ke completion ke unlock berikutnya.
- [x] Validasi alur graded submission untuk minimal satu project lab beginner.
- [x] Lakukan content QA pada tiga modul pertama untuk memastikan bahasa dan pacing benar-benar cocok bagi pemula.
- [x] Finalkan launch checklist sebelum curriculum dipakai sebagai jalur utama belajar.

## Recommended Initial Module Outline

1. Modul 1 - Orientasi Belajar Flutter
2. Modul 2 - Dasar Dart untuk Flutter
3. Modul 3 - Fondasi UI Flutter
4. Modul 4 - Interaksi dan State
5. Modul 5 - Data, Async, dan Penyimpanan Ringan
6. Modul 6 - Capstone Beginner App

## Recommended Initial Lesson Coverage

- [x] Lesson orientasi platform dan cara belajar
- [x] Lesson apa itu Flutter dan cara kerja widget tree
- [x] Lesson variables, types, operators, dan control flow
- [x] Lesson function dan collections
- [x] Lesson MaterialApp dan Scaffold
- [x] Lesson layout dasar
- [x] Lesson stateless widget
- [x] Lesson stateful widget dan `setState`
- [x] Lesson user input dan button interaction
- [x] Lesson list rendering
- [x] Lesson navigation dasar
- [x] Lesson async dan Future
- [x] Lesson fetch data sederhana
- [x] Lesson persistence ringan
- [x] Mini Project 1
- [x] Mini Project 2
- [x] Capstone Project

## Verification Checklist

- [x] User baru bisa memahami titik mulai hanya dari Dashboard.
- [x] User baru bisa menemukan roadmap lengkap dari tab Belajar.
- [x] Setiap lesson memiliki expected outcomes yang jelas.
- [x] Setiap lesson memiliki prerequisite path yang sederhana.
- [x] Next lesson selalu muncul setelah learner selesai atau lulus.
- [x] Lesson lock reason mudah dipahami user awam.
- [x] Progress antara Dashboard, Belajar, dan lesson page selalu sinkron.
- [x] Minimal satu graded project lab berjalan end-to-end.
- [x] Tiga modul pertama lolos content QA untuk bahasa, urutan, dan tingkat kesulitan.
