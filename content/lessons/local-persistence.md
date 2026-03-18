## Tujuan Belajar
Di lesson ini, kita akan belajar tentang **cara menyimpan data kecil di dalam memori HP (Persistence)**. Setelah menyelesaikan materi ini, kamu akan bisa **membuat aplikasi yang bisa mengingat data (misal: mode gelap/terang) meskipun sudah ditutup dan dibuka lagi**.

---

## 1. Konsep Dasar
Jika kamu menyimpan data di variabel (seperti `int skor = 0;`), data itu akan hilang saat aplikasinya dimatikan.
Untuk membuat data itu bertahan, kita menggunakan penyimpanan lokal. Di Flutter, alat yang sering dipakai untuk data ringan adalah **SharedPreferences**.

*(Anggap saja SharedPreferences ini seperti laci kecil tempat aplikasimu menaruh catatan).*

---

## 2. Contoh Kode (Simulasi)

*Catatan: Ini adalah konsep. Di dalam Browser Lab, penyimpanan mungkin tidak bertahan selamanya, tapi ini cara kerjanya di aplikasi asli.*

```dart
import 'package:shared_preferences/shared_preferences.dart';

// Fungsi untuk Menyimpan Data
Future<void> simpanSkor(int skorBaru) async {
  final laci = await SharedPreferences.getInstance();
  await laci.setInt('skor_tertinggi', skorBaru); // Menyimpan dengan nama kunci 'skor_tertinggi'
}

// Fungsi untuk Mengambil Data
Future<int> ambilSkor() async {
  final laci = await SharedPreferences.getInstance();
  // Ambil data. Jika kosong (belum pernah disimpan), kembalikan angka 0.
  return laci.getInt('skor_tertinggi') ?? 0; 
}
```

---

## 3. Kesalahan Umum (Common Mistakes)
- **Lupa `await`**: Mengambil laci penyimpanan butuh waktu, jadi selalu gunakan `await`.
- **Salah Tipe Data**: Jika kamu menyimpan teks menggunakan `setString`, kamu harus mengambilnya dengan `getString`, bukan `getInt`.

---

## 4. Ringkasan
Untuk menyimpan data permanen yang jumlahnya sedikit, gunakan **SharedPreferences** untuk menyimpan (`set...`) dan membaca (`get...`).
