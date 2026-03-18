# Stateless Widget

Stateless Widget adalah widget yang state-nya tidak dapat berubah setelah dibangun. Cocok untuk komponen UI statis seperti label, ikon, atau layout dasar.

## Contoh

```dart
import 'package:flutter/material.dart';

class MyStatelessWidget extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Container(
      child: Text('Halo Dunia!'),
    );
  }
}
```

Cobalah mengubah teks pada editor di samping, dan perhatikan hasilnya.