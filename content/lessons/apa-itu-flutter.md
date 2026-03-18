## Tujuan Belajar
Di lesson ini, kita akan belajar tentang **apa itu Flutter dan bagaimana Widget Tree bekerja**. Setelah menyelesaikan materi ini, kamu akan bisa **memahami mengapa Flutter menggunakan istilah "Everything is a Widget"**.

---

## 1. Konsep Dasar
Flutter adalah alat pembuat aplikasi dari Google. Keunggulannya? Kamu cukup menulis kode satu kali, dan aplikasinya bisa berjalan di Android, iOS, hingga Web.
Di Flutter, **semuanya adalah Widget**. Tombol adalah widget. Teks adalah widget. Bahkan spasi atau jarak kosong di layar juga widget!

Semua widget ini disusun seperti cabang pohon, yang kita sebut **Widget Tree**.

- Akar pohon adalah aplikasi itu sendiri.
- Cabangnya bisa berupa halaman, tombol, dan teks di dalam tombol tersebut.

---

## 2. Contoh Kode
Bayangkan struktur layar seperti ini (ini bukan kode Dart yang sebenarnya, hanya ilustrasi):
```text
App
 └─ Halaman (Scaffold)
     ├─ Judul Atas (AppBar)
     └─ Isi Tengah (Center)
         └─ Teks ("Halo Flutter")
```

---

## 3. Ringkasan
Mari kita ingat kembali:
1. Flutter bisa membuat aplikasi untuk banyak platform sekaligus.
2. Di Flutter, UI dibangun dengan merakit komponen kecil yang disebut **Widget**.
3. Susunan dari komponen-komponen ini disebut **Widget Tree**.

*Jangan lupa klik tombol **Complete** di bawah jika kamu sudah paham dan siap lanjut ke materi berikutnya!*