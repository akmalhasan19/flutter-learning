import 'package:flutter/material.dart';

void main() {
  runApp(const ToDoApp());
}

class ToDoApp extends StatelessWidget {
  const ToDoApp({super.key});

  @override
  Widget build(BuildContext context) {
    return const MaterialApp(
      debugShowCheckedModeBanner: false,
      home: HomeScreen(), // Halaman utama
    );
  }
}

// TODO: Buat HomeScreen (StatefulWidget)
// 1. Simpan daftar tugas dalam List<String>
// 2. Tampilkan tugas menggunakan ListView / ListView.builder
// 3. Buat tombol untuk navigasi ke AddTaskScreen

// TODO: Buat AddTaskScreen (StatefulWidget atau StatelessWidget)
// 1. Buat TextField untuk menulis tugas
// 2. Buat tombol simpan yang mengirim data kembali ke HomeScreen menggunakan Navigator.pop
// 3. Pastikan HomeScreen menerima data dan melakukan setState
