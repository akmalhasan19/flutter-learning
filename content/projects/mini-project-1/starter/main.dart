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
          title: const Text('Profile Card'),
        ),
        body: const Center(
          // TODO: Kerjakan instruksi di dalam sini!
          // 1. Buat sebuah Column
          // 2. Tambahkan CircleAvatar atau Icon besar
          // 3. Tambahkan Text nama dengan style bold
          // 4. Tambahkan Text pekerjaan
          // 5. Tambahkan Row berisi 3 Icon bebas
          child: Text("Hapus teks ini dan mulai membuat Layout"),
        ),
      ),
    );
  }
}
