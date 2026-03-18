## Tujuan Belajar
Di lesson ini, kita akan belajar tentang **cara pindah antar halaman (Navigasi)**. Setelah menyelesaikan materi ini, kamu akan bisa **membuat aplikasi dengan lebih dari satu layar dan berpindah di antaranya**.

---

## 1. Konsep Dasar
Pindah halaman di Flutter itu seperti menumpuk kertas:
- **Navigator.push()**: Menaruh halaman baru di atas halaman lama. (Maju ke halaman baru).
- **Navigator.pop()**: Mengambil halaman paling atas lalu membuangnya, sehingga kita kembali ke halaman sebelumnya. (Mundur/Kembali).

---

## 2. Contoh Kode

```dart
// Dari Halaman 1, kita mau pindah ke Halaman 2
ElevatedButton(
  onPressed: () {
    Navigator.push(
      context,
      MaterialPageRoute(builder: (context) => HalamanDua()),
    );
  },
  child: Text("Pergi ke Halaman 2"),
)

// Di Halaman 2, kita mau kembali ke Halaman 1
ElevatedButton(
  onPressed: () {
    Navigator.pop(context);
  },
  child: Text("Kembali"),
)
```

---

## 3. Latihan
Coba perhatikan kode di atas. Bagaimana cara kamu kembali dari `HalamanDua`? Betul sekali, menggunakan `Navigator.pop(context)`.

---

## 4. Kesalahan Umum (Common Mistakes)
- **Error "Navigator operation requested..."**: Biasanya terjadi jika kamu memanggil `Navigator` tanpa memberikan konteks (`context`) yang valid. Selalu berikan `context` dari `build(BuildContext context)`.

---

## 5. Ringkasan
- Gunakan **push** untuk maju.
- Gunakan **pop** untuk mundur.
