## Tujuan Belajar
Di lesson ini, kita akan belajar tentang **cara mengambil input pengguna lewat TextField dan Button**. Setelah menyelesaikan materi ini, kamu akan bisa **membuat form sederhana untuk membaca teks yang diketik pengguna**.

---

## 1. Konsep Dasar
Untuk berinteraksi dengan pengguna, kita butuh alat.
- **ElevatedButton**: Tombol biasa yang bisa diklik.
- **TextField**: Kotak teks tempat pengguna bisa mengetik sesuatu (seperti kolom pencarian atau input nama).
- **TextEditingController**: Ini adalah "mata-mata" yang kita pasang di TextField untuk membaca teks apa pun yang sedang diketik di sana.

---

## 2. Contoh Kode

```dart
class FormSederhana extends StatefulWidget {
  @override
  _FormSederhanaState createState() => _FormSederhanaState();
}

class _FormSederhanaState extends State<FormSederhana> {
  // Controller untuk membaca isi kotak teks
  TextEditingController myController = TextEditingController();
  String nama = "";

  void simpanNama() {
    setState(() {
      nama = myController.text; // Ambil teks dari controller
    });
  }

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        TextField(
          controller: myController, // Pasang controller di sini
          decoration: InputDecoration(labelText: "Masukkan Nama"),
        ),
        ElevatedButton(
          onPressed: simpanNama,
          child: Text("Simpan"),
        ),
        Text("Halo, $nama!"),
      ],
    );
  }
}
```

---

## 3. Latihan
Jalankan kode di atas, ketik namamu di kotak teks, lalu tekan tombol "Simpan".

---

## 4. Kesalahan Umum (Common Mistakes)
- **Lupa memasang `controller`**: Jika kamu membuat `TextEditingController` tapi tidak meletakkannya di dalam `TextField(controller: ...)`, kamu tidak akan pernah bisa membaca teks yang diketik.

---

## 5. Ringkasan
1. Gunakan **TextField** untuk menerima ketikan.
2. Gunakan **TextEditingController** untuk membaca isi ketikan tersebut.
