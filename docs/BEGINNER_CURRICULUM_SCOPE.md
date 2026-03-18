# Beginner Curriculum Scope

Dokumen ini mendefinisikan batasan, target akhir, dan kriteria sukses untuk kurikulum "Beginner Path" di platform Flutter Learning MVP. Dokumen ini dibuat untuk memenuhi fase *Lock Beginner Curriculum Scope*.

## 1. Daftar Kemampuan yang Wajib Dikuasai (In-Scope)
Setelah lulus dari beginner path, learner wajib menguasai kemampuan berikut:
- **Fundamental Dart**: Pemahaman tentang variabel, tipe data, control flow (if/else, loops), function, dan collection dasar (List, Map).
- **Fundamental Flutter**: Memahami konsep Widget tree, `MaterialApp`, dan `Scaffold`.
- **Layouting UI**: Mampu menyusun antarmuka menggunakan widget layout dasar (`Row`, `Column`, `Container`, `Padding`, `Center`, `ListView`).
- **State Dasar**: Memahami perbedaan dan penggunaan `StatelessWidget` dan `StatefulWidget`, serta mampu mengelola state lokal sederhana menggunakan `setState`.
- **Interaksi**: Mampu menangani interaksi pengguna seperti button click, text input, dan form dasar.
- **Navigasi**: Mampu melakukan perpindahan antar layar (routing dasar).
- **Asynchronous Programming**: Memahami penggunaan `Future` dan `async/await` secara ringan, termasuk fetch data sederhana dari API.
- **Persistensi Lokal**: Mampu menyimpan data ringan di sisi device (contoh: `SharedPreferences`).
- **End-to-end Application**: Mampu merakit seluruh komponen di atas menjadi sebuah aplikasi Flutter sederhana yang fungsional dari awal hingga akhir.

## 2. Daftar Topik yang Dikeluarkan (Out-of-Scope)
Untuk menjaga agar kurikulum tetap fokus dan tidak membebani pemula secara kognitif, topik-topik berikut **sengaja dikeluarkan** dari versi MVP Beginner Path:
- **State Management Lanjutan**: Provider, Riverpod, BLoC, GetX, dll.
- **Architecture Pattern**: Clean Architecture, MVVM, MVC, dll.
- **Testing**: Unit testing, Widget testing, dan Integration testing yang mendalam.
- **DevOps**: CI/CD, flavor, dan deployment aplikasi ke App Store / Play Store.
- **Animasi Lanjut**: `CustomPainter`, explicit animations yang kompleks.
- **Native Integration**: Method channels, menulis kode spesifik platform (Swift/Kotlin).
- **Database Kompleks**: Integrasi SQLite/Drift atau database lokal yang berat.

## 3. Success Criteria Completion Beginner Path
Kriteria terukur yang menandakan learner sukses menyelesaikan Beginner Path:
- Learner telah membaca dan menandai **"Complete"** pada seluruh *Concept Lesson* dan *Browser Lab* di kurikulum.
- Learner berhasil melakukan submission kode dan mendapatkan status **"Passed"** dari automated grader pada semua *Project Lab* yang wajib (contoh: Mini Projects dan Capstone).
- Pada **Capstone Project**, aplikasi yang di-submit dapat dikompilasi tanpa error dan memenuhi seluruh ekspektasi (UI layout dan state behavior) yang dikonfigurasi dalam hidden test suite.
- Sistem progress mencatat course completion mencapai 100% pada dashboard learner.
