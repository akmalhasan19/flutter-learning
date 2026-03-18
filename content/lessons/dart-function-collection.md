## Tujuan Belajar
Di lesson ini, kita akan belajar tentang **Function dan Collections (List & Map) di Dart**. Setelah menyelesaikan materi ini, kamu akan bisa **membungkus kode agar bisa digunakan berulang kali dan menyimpan banyak data sekaligus**.

---

## 1. Konsep Dasar
- **Function**: Seperti resep masakan. Kamu membuat resepnya sekali, lalu bisa memasaknya berkali-kali hanya dengan memanggil nama resep tersebut.
- **Collections**: Keranjang belanja. Daripada membawa 10 variabel terpisah, kamu bisa menyimpannya dalam satu keranjang. 
  - **List**: Daftar berurutan (seperti daftar belanja).
  - **Map**: Data dengan kunci dan nilai (seperti kamus, kata = kunci, arti = nilai).

---

## 2. Contoh Kode

```dart
// Ini adalah Function
void sapaOrang(String nama) {
  print("Halo, $nama!");
}

void main() {
  // Ini adalah List (Daftar)
  List<String> buah = ["Apel", "Jeruk", "Mangga"];
  
  // Memanggil function
  sapaOrang(buah[0]); // Output: Halo, Apel!
}
```

---

## 3. Latihan
Di editor sebelah kanan, coba tambahkan "Pisang" ke dalam List `buah`, lalu panggil function `sapaOrang("Pisang");`.

---

## 4. Kesalahan Umum (Common Mistakes)
- **Index List Dimulai dari 0**: Elemen pertama di dalam List ada di posisi `0`, bukan `1`. Jadi `buah[0]` adalah "Apel".

---

## 5. Ringkasan
1. **Function** membantumu menghindari menulis kode yang sama berulang kali.
2. **List** menyimpan banyak data secara berurutan.
