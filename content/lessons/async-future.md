## Tujuan Belajar
Di lesson ini, kita akan belajar tentang **operasi Asynchronous dan Future di Dart**. Setelah menyelesaikan materi ini, kamu akan bisa **menangani proses yang membutuhkan waktu lama tanpa membuat aplikasi macet (hang)**.

---

## 1. Konsep Dasar
Pernahkah kamu memesan makanan di restoran? Setelah memesan, kamu tidak berdiri kaku di depan kasir, kan? Kamu duduk dan melakukan hal lain sambil menunggu pesanan datang.
Itulah **Asynchronous** (async).

- **Future**: Janji bahwa sebuah nilai akan tersedia nanti (seperti struk pesanan makanan).
- **async / await**: Kata kunci untuk menunggu Future tersebut selesai tanpa membekukan layar aplikasimu.

---

## 2. Contoh Kode

```dart
// Tambahkan 'async' di sebelah nama fungsi
Future<void> ambilDataDariInternet() async {
  print("1. Sedang mengambil data...");

  // 'await' membuat program menunggu di baris ini secara tidak terlihat
  // Future.delayed dipakai untuk mensimulasikan waktu tunggu 2 detik
  await Future.delayed(Duration(seconds: 2));

  print("2. Data berhasil diambil!");
}

void main() async {
  print("Mulai");
  await ambilDataDariInternet();
  print("Selesai");
}
```

---

## 3. Latihan
Coba ubah waktu tunggu (`seconds: 2`) menjadi 5 detik. Lihat bagaimana program akan menunggu lebih lama sebelum mencetak teks selanjutnya.

---

## 4. Kesalahan Umum (Common Mistakes)
- **Lupa `await`**: Jika kamu memanggil fungsi `async` tapi tidak menambahkan kata `await` di depannya, program akan langsung lanjut ke baris berikutnya sebelum data selesai diambil. Ini akan menyebabkan pesan error *null*.

---

## 5. Ringkasan
Gunakan **Future**, **async**, dan **await** untuk proses yang memakan waktu (seperti mengambil data dari internet) agar layar aplikasi tidak *hang*.
