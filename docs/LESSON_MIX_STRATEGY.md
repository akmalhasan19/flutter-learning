# Lesson Mix dan Assessment Strategy: Beginner Path

Dokumen ini menjelaskan strategi komposisi tipe lesson dan mekanisme assessment untuk memastikan kurikulum MVP tidak hanya bersifat pasif, tetapi benar-benar memvalidasi kemampuan pemula melalui praktik yang bertahap.

## 1. Target Total Lesson
Target jumlah lesson untuk rilis pertama kurikulum pemula (Beginner Path) ditetapkan sebanyak **19 Lesson**. Angka ini (berada dalam rentang ideal 18-24) cukup ringkas untuk menjaga motivasi pemula tanpa kehilangan esensi fundamental pemrograman Flutter.

## 2. Distribusi Tipe Lesson per Modul
Komposisi lesson dirancang agar porsi teori (Concept) selalu diikuti dengan latihan (Browser Lab) dan diuji di titik-titik krusial (Project Lab).

- **Modul 1: Orientasi Belajar Flutter (3 Lesson)**
  - 2 Concept Lesson
  - 1 Browser Lab
- **Modul 2: Dasar Dart untuk Flutter (2 Lesson)**
  - 0 Concept Lesson (Konsep di-blend di dalam Browser Lab agar langsung praktik)
  - 2 Browser Lab
- **Modul 3: Fondasi UI Flutter (4 Lesson)**
  - 1 Concept Lesson
  - 2 Browser Lab
  - 1 Project Lab (Graded)
- **Modul 4: Interaksi dan State (4 Lesson)**
  - 1 Concept Lesson
  - 2 Browser Lab
  - 1 Project Lab (Graded)
- **Modul 5: Navigasi, Data, dan Async (4 Lesson)**
  - 2 Concept Lesson
  - 2 Browser Lab
- **Modul 6: Capstone Beginner App (2 Lesson)**
  - 1 Concept Lesson
  - 1 Project Lab (Graded)

**Total Keseluruhan:**
- **7 Concept Lessons** (~37%)
- **9 Browser Labs** (~47%)
- **3 Project Labs (Graded)** (~16%)

## 3. Strategi Project Checkpoint dan Alasan Pedagogis
Setiap *graded project lab* tidak dibuat sekadar sebagai variasi format penugasan, melainkan sebagai *checkpoint* kompetensi yang mutlak diperlukan sebelum *learner* dapat melanjutkan ke tahap yang lebih rumit.

- **Project Checkpoint 1 (Modul 3): Mini Project - Profile Card Layout**
  - **Kompetensi:** Layout & Struktur Widget.
  - **Alasan Pedagogis:** Memvalidasi pemahaman tentang *Widget Tree* dan tata letak ruang (*spatial layouting*). Jika *learner* tidak bisa menyusun `Row`, `Column`, `Padding`, dan `Container` dengan benar, mereka akan kesulitan saat harus memanipulasi UI yang dinamis di modul berikutnya.
- **Project Checkpoint 2 (Modul 4): Mini Project - Interactive Counter/Form**
  - **Kompetensi:** State & Interaksi.
  - **Alasan Pedagogis:** Memvalidasi siklus *state* dan penanganan *event*. *Learner* harus bisa mengikat variabel dengan UI dan memanggil `setState` secara tepat. Ini memastikan mereka paham bagaimana aplikasi bereaksi terhadap input pengguna.
- **Project Checkpoint 3 (Modul 6): Capstone Project**
  - **Kompetensi:** Integrasi End-to-End.
  - **Alasan Pedagogis:** Memvalidasi kemampuan merangkai seluruh konsep. *Learner* harus menggabungkan UI statis, interaksi (state), dan navigasi menjadi satu aplikasi utuh yang kompilabel (bebas error syntaks) dan berfungsi penuh.

## 4. Tipe Assessment
- **Manual Completion:** Diterapkan pada Concept Lesson dan Browser Lab. Mengurangi friksi belajar, mendorong *learner* untuk membaca, mencoba sendiri, dan menandai selesai bila mereka merasa paham.
- **Graded Submission:** Diterapkan eksklusif pada 3 Project Labs. Bertindak sebagai *hard gate*; *learner* diwajibkan melakukan *submission* kode yang valid dan lulus tes tersembunyi (*passed*) sebelum dapat melanjutkan kurikulum.
