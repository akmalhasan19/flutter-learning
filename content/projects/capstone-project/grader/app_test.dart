import 'package:flutter_test/flutter_test.dart';
import 'package:flutter/material.dart';
// Note: In real environment, it would import from learner's code
import '../starter/main.dart'; 

void main() {
  testWidgets('Capstone Project: End-to-End Validation', (WidgetTester tester) async {
    await tester.pumpWidget(const ToDoApp());

    // 1. Verify Home Screen exists and has a way to add tasks (Button/FAB)
    expect(find.byType(ListView), findsOneWidget, reason: 'Halaman utama harus memiliki ListView untuk daftar tugas');
    
    // Find button to navigate (could be ElevatedButton, FloatingActionButton, IconButton)
    final addNavButton = find.byWidgetPredicate(
      (widget) => widget is ElevatedButton || widget is FloatingActionButton || widget is IconButton || widget is TextButton,
    ).first;
    expect(addNavButton, findsWidgets, reason: 'Harus ada tombol untuk pindah ke halaman tambah tugas');

    // 2. Perform Navigation
    await tester.tap(addNavButton);
    await tester.pumpAndSettle(); // Wait for navigation animation

    // 3. Verify Add Task Screen
    expect(find.byType(TextField), findsOneWidget, reason: 'Halaman kedua harus memiliki TextField');
    
    // Find save button on second screen
    final saveButton = find.byWidgetPredicate(
      (widget) => widget is ElevatedButton || widget is FloatingActionButton || widget is TextButton,
    ).first;
    expect(saveButton, findsWidgets, reason: 'Halaman kedua harus memiliki tombol Simpan');

    // 4. Enter task and save
    final testTask = "Belajar Flutter Lanjutan";
    await tester.enterText(find.byType(TextField), testTask);
    await tester.tap(saveButton);
    await tester.pumpAndSettle(); // Wait for navigation back

    // 5. Verify task is added to Home Screen
    expect(find.text(testTask), findsOneWidget, reason: 'Tugas yang ditambahkan harus muncul di halaman utama (ListView)');
  });
}
