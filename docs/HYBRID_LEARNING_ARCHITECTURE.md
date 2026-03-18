# Hybrid Learning Architecture & Lesson Contract

## 1. Lesson Types
Lesson di dalam curriculum dan dashboard diklasifikasikan ke dalam tipe berikut:
- **Concept Lesson (`text` / `video`)**: Lesson teoritis yang berisi artikel atau video tanpa eksekusi kode. Fokus pada pemahaman fundamental.
- **Browser Lab (`interactive` / `browser_lab`)**: Lesson dengan latihan ringan yang dijalankan langsung di browser menggunakan runtime pihak ketiga (seperti DartPad). Ideal untuk snippet pendek dan pemahaman sintaks.
- **Project Lab (`project_lab`)**: Lesson yang membutuhkan implementasi Flutter nyata. Dikerjakan dengan runner on-demand dan di-grade secara otomatis di backend, bukan di runtime browser yang persisten.

## 2. Assessment Types (Completion vs Graded)
Berdasarkan tipe lesson, mekanisme penyelesaian (assessment) dibagi menjadi dua:
- **Manual Completion**: 
  - Digunakan untuk **Concept Lesson** dan **Browser Lab**.
  - User dapat menyelesaikan lesson secara mandiri dengan membaca materi atau mencoba kode di browser lab (opsional validasi ringan), kemudian menekan tombol "Complete".
  - Tidak membebani infrastruktur grading.
- **Graded Submission**:
  - Digunakan secara eksklusif untuk **Project Lab**.
  - User wajib mengirimkan pekerjaan (submit), yang kemudian dieksekusi dan divalidasi oleh *hidden test suite* pada runner on-demand.
  - Penyelesaian lesson bergantung sepenuhnya pada status `passed` dari sistem autograder. Tidak dapat di-bypass dengan tombol manual.

## 3. Scope Boundary: No Arbitrary Multi-File IDE
MVP memiliki batasan teknis dan produk yang sangat tegas:
**Sistem MVP tidak menyediakan dan tidak akan membangun arbitrary multi-file browser IDE milik sendiri yang menjalankan compiler Flutter secara persisten 24/7 di backend.**

Alasan:
- Efisiensi resource infrastruktur.
- Menjaga fokus pada experience belajar pemula (beginner path), bukan membangun replika VS Code di web.
- Browser lab (menggunakan DartPad) sudah cukup untuk snippet ringan.
- Kebutuhan kode yang kompleks akan menggunakan mekanisme project lab yang divalidasi on-demand.