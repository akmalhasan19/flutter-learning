## Tujuan Belajar
Di lesson ini, kita akan belajar tentang **dasar pemrograman Dart: variabel, tipe data, dan control flow**. Setelah menyelesaikan materi ini, kamu akan bisa **menyimpan data dan membuat percabangan logika sederhana**.

---

## 1. Konsep Dasar
Dart adalah bahasa yang dipakai oleh Flutter. Mari berkenalan dengan dua hal paling dasar:
- **Variabel & Tipe Data**: Tempat menyimpan data. `String` untuk teks, `int` untuk angka bulat, `double` untuk angka desimal, dan `bool` untuk benar/salah.
- **Control Flow (if/else)**: Cara membuat keputusan. "Jika X terjadi, maka lakukan Y."

---

## 2. Contoh Kode

```dart
void main() {
  // Variabel
  String nama = "Budi";
  int umur = 25;
  bool sudahBelajar = true;

  // Control Flow (Percabangan)
  if (sudahBelajar == true) {
    print("Bagus, $nama!");
  } else {
    print("Ayo belajar dulu.");
  }
}
```

---

## 3. Latihan 
Coba jalankan kode di atas pada *editor* di sebelah kanan. 
Lalu, ubah `sudahBelajar` menjadi `false` dan lihat perubahannya!

---

## 4. Kesalahan Umum (Common Mistakes)
- **Lupa Tipe Data**: Dart adalah *strongly typed language*. Kamu tidak bisa memasukkan teks ke dalam variabel `int`.
- **Lupa Titik Koma (`;`)**: Pastikan setiap baris perintah diakhiri dengan `;`.

---

## 5. Ringkasan
1. Variabel dipakai untuk menyimpan data (String, int, bool).
2. `if` dan `else` dipakai untuk membuat program mengambil keputusan.

*Jangan lupa klik tombol **Complete** di bawah jika kamu sudah paham!*