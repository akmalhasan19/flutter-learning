## Tujuan Belajar
Di lesson ini, kita akan belajar tentang **widget layout dasar: Row, Column, Padding, Center, dan ListView**. Setelah menyelesaikan materi ini, kamu akan bisa **menyusun tampilan antarmuka yang rapi dan responsif**.

---

## 1. Konsep Dasar
Flutter menggunakan beberapa widget khusus untuk mengatur posisi widget lainnya:
- **Center**: Menaruh sesuatu persis di tengah.
- **Padding**: Memberi jarak atau ruang kosong di sekeliling widget.
- **Row**: Menyusun elemen menyamping dari kiri ke kanan (Horizontal).
- **Column**: Menyusun elemen dari atas ke bawah (Vertikal).
- **ListView**: Sama seperti Column, tapi bisa di-scroll jika isinya terlalu banyak!

---

## 2. Contoh Kode

```dart
Column(
  children: [
    Padding(
      padding: EdgeInsets.all(16.0),
      child: Text("Ini di atas, dan punya jarak 16 pixel."),
    ),
    Row(
      mainAxisAlignment: MainAxisAlignment.spaceEvenly,
      children: [
        Text("Kiri"),
        Text("Kanan"),
      ],
    ),
  ],
)
```

---

## 3. Latihan
Di editor, cobalah ubah `Column` menjadi `Row` dan lihat bagaimana posisi teks tersebut berubah.

---

## 4. Kesalahan Umum (Common Mistakes)
- **Overflow (Kelebihan Ruang)**: Jika kamu menaruh terlalu banyak barang di dalam `Row` atau `Column`, isinya akan keluar dari layar (ditandai dengan pita kuning-hitam di layar). Solusinya: gunakan `Expanded` atau `ListView`.
- **Lupa `children`**: Row dan Column menggunakan properti `children` (bisa banyak widget), bukan `child` (hanya satu widget).

---

## 5. Ringkasan
- Gunakan **Row** untuk menyamping.
- Gunakan **Column** untuk menurun.
- Gunakan **ListView** jika butuh scroll.
