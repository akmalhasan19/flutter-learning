import 'package:flutter/material.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Hello Flutter',
      home: Scaffold(
        appBar: AppBar(
          title: const Text('My First App'),
        ),
        // TODO: Replace the Center widget below with your own widget tree
        // Requirement: It must contain a Text widget that displays exactly "Hello, Flutter!"
        body: const Center(
          child: Text('Replace me!'),
        ),
      ),
    );
  }
}
