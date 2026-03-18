# Beginner Curriculum Blueprint dan Learning Map

Dokumen ini mendefinisikan struktur, urutan, tujuan, dan kriteria kelulusan (exit criteria) untuk setiap modul di dalam "Beginner Path" kurikulum Flutter Learning MVP. Jalur pembelajaran dirancang sekuensial (linear) tanpa percabangan agar pemula tidak bingung, dan materi disusun tanpa mengasumsikan pengetahuan Flutter atau Dart sebelumnya.

## Struktur Modul, Tujuan, dan Milestone Lesson

### Modul 1: Orientasi Belajar Flutter
**Tujuan Belajar:** Mengenalkan platform pembelajaran, cara kerja sistem lab (browser dan project lab), dan konsep dasar Flutter (apa itu Flutter, widget tree).
**Milestone Lesson:** Menyelesaikan *Browser Lab* pertama (Hello World).
**Estimasi Durasi:** 30 menit.
**Exit Criteria:** Learner memahami perbedaan concept lesson, browser lab, dan project lab, serta mampu menjalankan kode Flutter pertama di browser.
**Urutan Lesson:**
1. Orientasi platform dan cara belajar (Concept, 10 min)
2. Apa itu Flutter dan cara kerja widget tree (Concept, 10 min)
3. Hello Flutter! (Browser Lab, 10 min)

### Modul 2: Dasar Dart untuk Flutter
**Tujuan Belajar:** Memberikan fondasi bahasa pemrograman Dart yang mutlak dibutuhkan untuk menulis Flutter, tanpa terlalu dalam ke fitur *advanced*.
**Milestone Lesson:** Menguasai penggunaan variabel, control flow, dan function sederhana dalam Dart.
**Estimasi Durasi:** 90 menit.
**Exit Criteria:** Learner mampu memanipulasi variabel, membuat percabangan logika (if/else), dan menulis serta memanggil *function* dalam sintaks Dart.
**Urutan Lesson:**
1. Variables, Types, Operators, dan Control Flow (Browser Lab, 45 min)
2. Function dan Collections dasar (Browser Lab, 45 min)

### Modul 3: Fondasi UI Flutter
**Tujuan Belajar:** Memahami cara merakit antarmuka (UI) dengan menggabungkan widget bawaan Flutter.
**Milestone Lesson:** Menyelesaikan **Mini Project 1** (merakit layout statis).
**Estimasi Durasi:** 150 menit.
**Exit Criteria:** Learner sukses *pass* Graded Mini Project 1 yang memvalidasi struktur `Scaffold`, `Row`, `Column`, dan `Container`.
**Urutan Lesson:**
1. MaterialApp dan Scaffold (Concept, 20 min)
2. Layout dasar: Row, Column, Padding, Center (Browser Lab, 45 min)
3. List rendering dengan ListView (Browser Lab, 45 min)
4. *Graded Submission*: Mini Project 1 - Profile Card Layout (Project Lab, 40 min)

### Modul 4: Interaksi dan State
**Tujuan Belajar:** Membuat aplikasi statis menjadi interaktif dan dinamis.
**Milestone Lesson:** Menyelesaikan **Mini Project 2** (aplikasi interaktif dengan state).
**Estimasi Durasi:** 150 menit.
**Exit Criteria:** Learner sukses *pass* Graded Mini Project 2 yang memvalidasi penggunaan `StatefulWidget`, `setState`, dan handling user input.
**Urutan Lesson:**
1. Stateless Widget (Concept, 20 min)
2. User Input dan Button Interaction (Browser Lab, 40 min)
3. Stateful Widget dan `setState` (Browser Lab, 50 min)
4. *Graded Submission*: Mini Project 2 - Interactive Counter/Form (Project Lab, 40 min)

### Modul 5: Navigasi, Data, dan Async
**Tujuan Belajar:** Menghubungkan layar yang berbeda (navigasi) dan menangani operasi *asynchronous* dasar seperti *fetch data* dari internet.
**Milestone Lesson:** Memahami konsep `Future` dan membangun multi-screen app yang dapat mengambil data simulasi.
**Estimasi Durasi:** 120 menit.
**Exit Criteria:** Learner dapat bernavigasi antar layar dan menggunakan `Future`/`async-await` secara tepat untuk mensimulasikan pemuatan data.
**Urutan Lesson:**
1. Navigation dasar (Push & Pop) (Browser Lab, 40 min)
2. Async dan Future di Dart (Concept, 20 min)
3. Fetch data sederhana (Browser Lab, 40 min)
4. Persistence ringan (Concept/Browser Lab, 20 min)

### Modul 6: Capstone Beginner App
**Tujuan Belajar:** Merangkai seluruh konsep dari Modul 1 hingga Modul 5 ke dalam satu aplikasi yang fungsional secara *end-to-end*.
**Milestone Lesson:** Merilis dan menyelesaikan *Capstone Project*.
**Estimasi Durasi:** 180 menit.
**Exit Criteria:** Learner sukses *pass* Graded Capstone Project. Kode harus berhasil dikompilasi (bebas error), UI ter-render sesuai rubrik, state update bekerja benar, dan navigasi berfungsi sesuai skenario.
**Urutan Lesson:**
1. Merencanakan arsitektur aplikasi (Concept, 30 min)
2. *Graded Submission*: Capstone Project (Project Lab, 150 min)

---
## Peta Pembelajaran (Learning Map Rules)
- **Sequential Prerequisite:** Seluruh lesson membentuk jalur linear (Lesson N membutuhkan Lesson N-1 komplit). Tidak ada tree bercabang.
- **Asumsi Zero-Knowledge:** Materi di Modul 1 dan Modul 2 sepenuhnya dirancang untuk audiens yang tidak pernah menyentuh Dart dan Flutter.
