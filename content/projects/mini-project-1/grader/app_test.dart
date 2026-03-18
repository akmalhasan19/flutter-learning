import 'package:flutter_test/flutter_test.dart';
import 'package:flutter/material.dart';
// Note: In real environment, it would import from learner's code
import '../starter/main.dart'; 

void main() {
  testWidgets('Mini Project 1: Layout Validation', (WidgetTester tester) async {
    await tester.pumpWidget(const MyApp());

    // 1. Check if Column exists inside Center/Body
    expect(find.byType(Column), findsWidgets, reason: 'Harus menggunakan widget Column');

    // 2. Check for avatar/icon at the top
    final hasAvatar = find.byType(CircleAvatar).evaluate().isNotEmpty;
    final hasIcon = find.byType(Icon).evaluate().isNotEmpty;
    expect(hasAvatar || hasIcon, isTrue, reason: 'Harus ada CircleAvatar atau Icon untuk foto profil');

    // 3. Check for Row (for social media icons)
    expect(find.byType(Row), findsWidgets, reason: 'Harus menggunakan widget Row untuk menyusun ikon kontak');

    // 4. Check if there is more than 1 Text widget (Name and Job)
    expect(find.byType(Text), findsWidgets, reason: 'Harus ada widget Text untuk nama dan jabatan');
  });
}
