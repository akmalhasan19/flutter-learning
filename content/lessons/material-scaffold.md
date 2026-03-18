## Tujuan Belajar
Di lesson ini, kita akan belajar tentang **MaterialApp dan Scaffold**. Setelah menyelesaikan materi ini, kamu akan bisa **membuat kerangka dasar aplikasi Flutter yang siap diisi dengan konten**.

---

## 1. Konsep Dasar
- **MaterialApp**: Ini adalah "bungkus" utama aplikasimu. Ia mengatur hal-hal besar seperti tema warna dasar dan navigasi layar. Bayangkan ini seperti "fondasi rumah".
- **Scaffold**: Ini adalah kerangka untuk satu halaman spesifik. Ia menyediakan tempat standar untuk menaruh AppBar (judul di atas), Body (isi halaman di tengah), dan FloatingActionButton (tombol mengambang di bawah).

---

## 2. Contoh Kode

```dart
import 'package:flutter/material.dart';

void main() {
  runApp(
    MaterialApp( // Fondasi Utama
      home: Scaffold( // Kerangka Halaman
        appBar: AppBar(
          title: Text("Aplikasi Pertamaku"),
        ),
        body: Center(
          child: Text("Halo Dunia!"),
        ),
      ),
    ),
  );
}
```

---

## 3. Latihan
Coba ubah teks `"Aplikasi Pertamaku"` menjadi judul yang kamu inginkan, misalnya `"Belajar Flutter"`.

---

## 4. Kesalahan Umum (Common Mistakes)
- **Lupa `runApp`**: Fungsi utama dari aplikasi Flutter adalah `runApp()`. Tanpa ini, aplikasimu tidak akan pernah mulai menggambar layar.
- **Scaffold tanpa MaterialApp**: `Scaffold` butuh `MaterialApp` sebagai atasannya agar fitur visualnya berfungsi dengan baik.

---

## 5. Ringkasan
1. **MaterialApp** membungkus seluruh aplikasi.
2. **Scaffold** adalah kerangka untuk satu halaman (layar).
