import 'package:flutter_test/flutter_test.dart';
import 'package:flutter/material.dart';
// Note: In real environment, it would import from learner's code
import '../starter/main.dart'; 

void main() {
  testWidgets('Mini Project 2: State and Interaction Validation', (WidgetTester tester) async {
    await tester.pumpWidget(const MyApp());

    // 1. Check for required widgets
    expect(find.byType(TextField), findsOneWidget, reason: 'Harus ada satu TextField untuk input nama');
    expect(find.byType(ElevatedButton), findsOneWidget, reason: 'Harus ada ElevatedButton untuk menambah skor');

    // 2. Simulate User Interaction
    await tester.enterText(find.byType(TextField), 'Budi');
    await tester.tap(find.byType(ElevatedButton));
    await tester.pumpAndSettle(); // Wait for setState to rebuild UI

    // 3. Validate State Change in UI
    expect(find.textContaining('Budi'), findsWidgets, reason: 'Nama yang diinput harus ditampilkan di layar setelah state berubah');
    
    // Tap again
    await tester.tap(find.byType(ElevatedButton));
    await tester.pumpAndSettle();

    // Just check if there is a number greater than 0 displayed in the text, indicating state changed
    final textWidgets = tester.widgetList<Text>(find.byType(Text));
    bool foundScoreChange = false;
    for (var widget in textWidgets) {
      if (widget.data != null && (widget.data!.contains('1') || widget.data!.contains('2'))) {
        foundScoreChange = true;
        break;
      }
    }
    expect(foundScoreChange, isTrue, reason: 'Skor tidak bertambah di layar, pastikan memanggil setState()');
  });
}
