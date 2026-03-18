import 'package:flutter/material.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      home: Scaffold(
        appBar: AppBar(
          title: const Text('Interactive Counter'),
        ),
        // TODO: Ganti body ini menjadi StatefulWidget yang kamu buat
        body: const Center(
          child: Text("Buat StatefulWidget dan panggil di sini"),
        ),
      ),
    );
  }
}

// TODO: Buat class StatefulWidget di sini
// 1. Buat State untuk menyimpan 'nama' (String) dan 'skor' (int)
// 2. Buat TextEditingController untuk membaca input teks
// 3. Buat fungsi tambahSkor() yang memanggil setState
// 4. Susun TextField, ElevatedButton, dan Text dalam Column
