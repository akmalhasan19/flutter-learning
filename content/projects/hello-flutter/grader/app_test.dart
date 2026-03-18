import 'package:flutter_test/flutter_test.dart';
import 'package:flutter/material.dart';

// We import the student's submission dynamically or expect the runner to place it in lib/main.dart
import 'package:hello_flutter/main.dart'; 

void main() {
  testWidgets('Should display "Hello, Flutter!" text', (WidgetTester tester) async {
    // Build the app and trigger a frame.
    await tester.pumpWidget(const MyApp());

    // Verify that our app has a text "Hello, Flutter!".
    final textFinder = find.text('Hello, Flutter!');
    
    expect(textFinder, findsOneWidget, reason: 'Could not find a Text widget with the exact text "Hello, Flutter!"');
  });
}
