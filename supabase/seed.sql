-- Seed data for Flutter Beginner Course

-- 1. Course
INSERT INTO courses (id, slug, status, difficulty, estimated_minutes, title, description)
VALUES (
  'c0000000-0000-0000-0000-000000000000',
  'flutter-beginner',
  'published',
  'beginner',
  120,
  'Flutter Beginner Path',
  'Langkah pertamamu membuat aplikasi mobile dengan Flutter & Dart.'
) ON CONFLICT (id) DO UPDATE SET 
  title = EXCLUDED.title, 
  description = EXCLUDED.description;

-- 2. Modules
INSERT INTO modules (id, course_id, slug, order_index, xp_reward, title, description)
VALUES 
  ('m1000000-0000-0000-0000-000000000000', 'c0000000-0000-0000-0000-000000000000', 'pengenalan-dart', 1, 50, 'Pengenalan Dart', 'Dasar-dasar bahasa pemrograman Dart.'),
  ('m2000000-0000-0000-0000-000000000000', 'c0000000-0000-0000-0000-000000000000', 'mengenal-widget', 2, 50, 'Mengenal Widget', 'Konsep dasar UI building dengan Widget di Flutter.')
ON CONFLICT (id) DO UPDATE SET 
  title = EXCLUDED.title, 
  description = EXCLUDED.description;

-- 3. Lessons (Module 1)
INSERT INTO lessons (id, module_id, slug, order_index, lesson_type, runtime_mode, assessment_mode, duration_minutes)
VALUES
  ('l1100000-0000-0000-0000-000000000000', 'm1000000-0000-0000-0000-000000000000', 'apa-itu-dart', 1, 'text', 'none', 'manual', 5),
  ('l1200000-0000-0000-0000-000000000000', 'm1000000-0000-0000-0000-000000000000', 'variabel-tipe-data', 2, 'interactive', 'browser_lab', 'manual', 10)
ON CONFLICT (id) DO NOTHING;

-- 4. Lessons (Module 2)
INSERT INTO lessons (id, module_id, slug, order_index, lesson_type, runtime_mode, assessment_mode, duration_minutes, snippet_id)
VALUES
  ('l2100000-0000-0000-0000-000000000000', 'm2000000-0000-0000-0000-000000000000', 'widgets-101', 1, 'text', 'none', 'manual', 10, NULL),
  ('l2200000-0000-0000-0000-000000000000', 'm2000000-0000-0000-0000-000000000000', 'stateless-widget', 2, 'interactive', 'browser_lab', 'manual', 15, '5c0e154dd50af4a9ac85690802c281bb'),
  ('l2300000-0000-0000-0000-000000000000', 'm2000000-0000-0000-0000-000000000000', 'first-flutter-app', 3, 'interactive', 'project_lab', 'graded', 30, NULL)
ON CONFLICT (id) DO NOTHING;

-- 5. Lesson Translations (id/locale/title/summary/body_ref)
INSERT INTO lesson_translations (lesson_id, locale, title, summary, body_ref, expected_outcomes)
VALUES
  ('l1100000-0000-0000-0000-000000000000', 'id', 'Apa itu Dart?', 'Mengenal bahasa pemrograman Dart.', 'content/lessons/apa-itu-dart.md', '{"Memahami sejarah Dart", "Mengetahui kenapa Dart dipakai di Flutter"}'),
  ('l1200000-0000-0000-0000-000000000000', 'id', 'Variabel & Tipe Data', 'Belajar variabel di Dart.', 'content/lessons/variabel-tipe-data.md', '{"Bisa mendeklarasikan variabel"}'),
  ('l2100000-0000-0000-0000-000000000000', 'id', 'Widgets 101', 'Pengenalan konsep Everything is a Widget.', 'content/lessons/widgets-101.md', '{"Memahami tree widget"}'),
  ('l2200000-0000-0000-0000-000000000000', 'id', 'Stateless Widget', 'Membuat UI statis.', 'content/lessons/stateless-widget.md', '{"Membuat StatelessWidget sederhana"}'),
  ('l2300000-0000-0000-0000-000000000000', 'id', 'First Flutter App (Project)', 'Project pertamamu di Flutter.', 'content/lessons/first-flutter-app.md', '{"Menulis program Flutter utuh", "Lulus autograder"}')
ON CONFLICT (lesson_id, locale) DO UPDATE SET
  title = EXCLUDED.title,
  summary = EXCLUDED.summary,
  body_ref = EXCLUDED.body_ref,
  expected_outcomes = EXCLUDED.expected_outcomes;
