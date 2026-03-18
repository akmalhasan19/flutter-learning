## Tujuan Belajar
Di lesson ini, kita akan belajar tentang **StatefulWidget dan setState**. Setelah menyelesaikan materi ini, kamu akan bisa **membuat tampilan aplikasi yang bisa berubah saat tombol ditekan (interaktif)**.

---

## 1. Konsep Dasar
- **StatelessWidget**: Widget statis yang "mati". Tampilannya tidak akan pernah berubah setelah pertama kali digambar.
- **StatefulWidget**: Widget dinamis yang "hidup". Ia punya memori (State) yang bisa menyimpan data (misalnya: angka skor).
- **setState()**: Sebuah perintah ajaib untuk memberitahu Flutter: "Hei, ada data yang berubah! Tolong gambar ulang layarnya ya."

---

## 2. Contoh Kode

```dart
class CounterApp extends StatefulWidget {
  @override
  _CounterAppState createState() => _CounterAppState();
}

class _CounterAppState extends State<CounterApp> {
  int angka = 0; // Ini adalah State (Data)

  void tambahAngka() {
    setState(() {
      angka = angka + 1; // Ubah data, lalu gambar ulang!
    });
  }

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        Text("Skor: $angka"),
        ElevatedButton(
          onPressed: tambahAngka,
          child: Text("Tambah"),
        )
      ],
    );
  }
}
```

---

## 3. Latihan
Coba ubah kode `angka = angka + 1;` menjadi `angka = angka + 10;`. Apa yang terjadi jika tombolnya ditekan?

---

## 4. Kesalahan Umum (Common Mistakes)
- **Lupa memanggil `setState`**: Jika kamu mengubah variabel `angka` tanpa membungkusnya dalam `setState(() {})`, angkanya akan berubah di sistem, tapi layar **tidak akan memperbarui tulisannya**.

---

## 5. Ringkasan
Untuk membuat aplikasi interaktif, gunakan **StatefulWidget** dan ubah variabelmu di dalam **setState()**.
