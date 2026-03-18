-- Seed data for Flutter Beginner Course
-- MENGGANTIKAN SEED LAMA DENGAN KURIKULUM BARU SESUAI BEGINNER MVP SCOPE

-- 1. Course
INSERT INTO courses (id, slug, status, difficulty, estimated_minutes, title, description)
VALUES (
  'c0000000-0000-0000-0000-000000000000',
  'flutter-beginner',
  'published',
  'beginner',
  600,
  'Flutter Beginner Path',
  'Langkah pertamamu membuat aplikasi mobile dengan Flutter & Dart dari nol sampai end-to-end.'
) ON CONFLICT (id) DO UPDATE SET 
  title = EXCLUDED.title, 
  description = EXCLUDED.description,
  estimated_minutes = EXCLUDED.estimated_minutes;

-- 2. Modules
INSERT INTO modules (id, course_id, slug, order_index, xp_reward, title, description)
VALUES 
  ('m1000000-0000-0000-0000-000000000000', 'c0000000-0000-0000-0000-000000000000', 'orientasi-belajar-flutter', 1, 50, 'Orientasi Belajar Flutter', 'Mengenal platform pembelajaran dan konsep dasar Flutter (widget tree).'),
  ('m2000000-0000-0000-0000-000000000000', 'c0000000-0000-0000-0000-000000000000', 'dasar-dart-flutter', 2, 100, 'Dasar Dart untuk Flutter', 'Fondasi bahasa pemrograman Dart yang mutlak dibutuhkan untuk menulis Flutter.'),
  ('m3000000-0000-0000-0000-000000000000', 'c0000000-0000-0000-0000-000000000000', 'fondasi-ui-flutter', 3, 150, 'Fondasi UI Flutter', 'Memahami cara merakit antarmuka (UI) statis dengan widget bawaan Flutter.'),
  ('m4000000-0000-0000-0000-000000000000', 'c0000000-0000-0000-0000-000000000000', 'interaksi-dan-state', 4, 150, 'Interaksi dan State', 'Membuat aplikasi menjadi interaktif dan dapat merespon input pengguna menggunakan State.'),
  ('m5000000-0000-0000-0000-000000000000', 'c0000000-0000-0000-0000-000000000000', 'navigasi-data-async', 5, 150, 'Navigasi, Data, dan Async', 'Menghubungkan banyak layar dan mengambil data dari internet tanpa lag.'),
  ('m6000000-0000-0000-0000-000000000000', 'c0000000-0000-0000-0000-000000000000', 'capstone-beginner-app', 6, 300, 'Capstone Beginner App', 'Merakit seluruh konsep menjadi sebuah aplikasi Flutter fungsional end-to-end.')
ON CONFLICT (id) DO UPDATE SET 
  title = EXCLUDED.title, 
  description = EXCLUDED.description;

-- 3. Lessons (Module 1)
INSERT INTO lessons (id, module_id, slug, order_index, lesson_type, runtime_mode, assessment_mode, duration_minutes)
VALUES
  ('l1100000-0000-0000-0000-000000000000', 'm1000000-0000-0000-0000-000000000000', 'orientasi-platform', 1, 'text', 'none', 'manual', 10),
  ('l1200000-0000-0000-0000-000000000000', 'm1000000-0000-0000-0000-000000000000', 'apa-itu-flutter', 2, 'text', 'none', 'manual', 10)
ON CONFLICT (id) DO UPDATE SET slug = EXCLUDED.slug, runtime_mode = EXCLUDED.runtime_mode, assessment_mode = EXCLUDED.assessment_mode, duration_minutes = EXCLUDED.duration_minutes;

-- 4. Lessons (Module 2)
INSERT INTO lessons (id, module_id, slug, order_index, lesson_type, runtime_mode, assessment_mode, duration_minutes)
VALUES
  ('l2100000-0000-0000-0000-000000000000', 'm2000000-0000-0000-0000-000000000000', 'dart-dasar', 1, 'interactive', 'browser_lab', 'manual', 45),
  ('l2200000-0000-0000-0000-000000000000', 'm2000000-0000-0000-0000-000000000000', 'dart-function-collection', 2, 'interactive', 'browser_lab', 'manual', 45)
ON CONFLICT (id) DO UPDATE SET slug = EXCLUDED.slug, runtime_mode = EXCLUDED.runtime_mode, assessment_mode = EXCLUDED.assessment_mode, duration_minutes = EXCLUDED.duration_minutes;

-- 5. Lessons (Module 3)
INSERT INTO lessons (id, module_id, slug, order_index, lesson_type, runtime_mode, assessment_mode, duration_minutes)
VALUES
  ('l3100000-0000-0000-0000-000000000000', 'm3000000-0000-0000-0000-000000000000', 'material-scaffold', 1, 'text', 'none', 'manual', 20),
  ('l3200000-0000-0000-0000-000000000000', 'm3000000-0000-0000-0000-000000000000', 'layout-dasar', 2, 'interactive', 'browser_lab', 'manual', 45),
  ('l3300000-0000-0000-0000-000000000000', 'm3000000-0000-0000-0000-000000000000', 'mini-project-1', 3, 'interactive', 'project_lab', 'graded', 60)
ON CONFLICT (id) DO UPDATE SET slug = EXCLUDED.slug, runtime_mode = EXCLUDED.runtime_mode, assessment_mode = EXCLUDED.assessment_mode, duration_minutes = EXCLUDED.duration_minutes;

-- 6. Lessons (Module 4)
INSERT INTO lessons (id, module_id, slug, order_index, lesson_type, runtime_mode, assessment_mode, duration_minutes)
VALUES
  ('l4100000-0000-0000-0000-000000000000', 'm4000000-0000-0000-0000-000000000000', 'stateful-widget', 1, 'interactive', 'browser_lab', 'manual', 45),
  ('l4200000-0000-0000-0000-000000000000', 'm4000000-0000-0000-0000-000000000000', 'interaksi-input', 2, 'interactive', 'browser_lab', 'manual', 45),
  ('l4300000-0000-0000-0000-000000000000', 'm4000000-0000-0000-0000-000000000000', 'mini-project-2', 3, 'interactive', 'project_lab', 'graded', 60)
ON CONFLICT (id) DO UPDATE SET slug = EXCLUDED.slug, runtime_mode = EXCLUDED.runtime_mode, assessment_mode = EXCLUDED.assessment_mode, duration_minutes = EXCLUDED.duration_minutes;

-- 7. Lessons (Module 5)
INSERT INTO lessons (id, module_id, slug, order_index, lesson_type, runtime_mode, assessment_mode, duration_minutes)
VALUES
  ('l5100000-0000-0000-0000-000000000000', 'm5000000-0000-0000-0000-000000000000', 'navigasi-dasar', 1, 'interactive', 'browser_lab', 'manual', 40),
  ('l5200000-0000-0000-0000-000000000000', 'm5000000-0000-0000-0000-000000000000', 'async-future', 2, 'text', 'none', 'manual', 20),
  ('l5300000-0000-0000-0000-000000000000', 'm5000000-0000-0000-0000-000000000000', 'local-persistence', 3, 'interactive', 'browser_lab', 'manual', 30)
ON CONFLICT (id) DO UPDATE SET slug = EXCLUDED.slug, runtime_mode = EXCLUDED.runtime_mode, assessment_mode = EXCLUDED.assessment_mode, duration_minutes = EXCLUDED.duration_minutes;

-- 8. Lessons (Module 6)
INSERT INTO lessons (id, module_id, slug, order_index, lesson_type, runtime_mode, assessment_mode, duration_minutes)
VALUES
  ('l6100000-0000-0000-0000-000000000000', 'm6000000-0000-0000-0000-000000000000', 'capstone-project', 1, 'interactive', 'project_lab', 'graded', 180)
ON CONFLICT (id) DO UPDATE SET slug = EXCLUDED.slug, runtime_mode = EXCLUDED.runtime_mode, assessment_mode = EXCLUDED.assessment_mode, duration_minutes = EXCLUDED.duration_minutes;


-- 9. Lesson Translations
INSERT INTO lesson_translations (lesson_id, locale, title, summary, body_ref, expected_outcomes)
VALUES
  -- Modul 1
  ('l1100000-0000-0000-0000-000000000000', 'id', 'Orientasi Platform', 'Cara belajar di platform ini.', 'content/lessons/orientasi-platform.md', '{"Memahami perbedaan tipe materi"}'),
  ('l1200000-0000-0000-0000-000000000000', 'id', 'Apa itu Flutter?', 'Mengenal Flutter & Widget Tree.', 'content/lessons/apa-itu-flutter.md', '{"Memahami konsep Everything is a Widget"}'),
  
  -- Modul 2
  ('l2100000-0000-0000-0000-000000000000', 'id', 'Dasar Dart', 'Variabel, Tipe Data, dan If/Else.', 'content/lessons/dart-dasar.md', '{"Mendeklarasikan variabel", "Membuat percabangan sederhana"}'),
  ('l2200000-0000-0000-0000-000000000000', 'id', 'Fungsi & Koleksi', 'List, Map, dan Functions.', 'content/lessons/dart-function-collection.md', '{"Membuat function", "Menyimpan data di dalam List"}'),
  
  -- Modul 3
  ('l3100000-0000-0000-0000-000000000000', 'id', 'MaterialApp & Scaffold', 'Fondasi utama aplikasi Flutter.', 'content/lessons/material-scaffold.md', '{"Menyiapkan struktur MaterialApp"}'),
  ('l3200000-0000-0000-0000-000000000000', 'id', 'Layout Dasar', 'Row, Column, dan Center.', 'content/lessons/layout-dasar.md', '{"Menggabungkan Row dan Column"}'),
  ('l3300000-0000-0000-0000-000000000000', 'id', 'Mini Project 1', 'Membangun UI Layout sederhana.', 'content/lessons/mini-project-1.md', '{"Menyusun antarmuka Profile Card", "Lulus testing UI"}'),
  
  -- Modul 4
  ('l4100000-0000-0000-0000-000000000000', 'id', 'Stateful Widget', 'Menangani perubahan data di UI.', 'content/lessons/stateful-widget.md', '{"Membuat State", "Memanggil setState"}'),
  ('l4200000-0000-0000-0000-000000000000', 'id', 'Interaksi & Input', 'Menangani tombol dan ketikan.', 'content/lessons/interaksi-input.md', '{"Membaca isi TextField", "Merespon klik tombol"}'),
  ('l4300000-0000-0000-0000-000000000000', 'id', 'Mini Project 2', 'Membangun UI interaktif.', 'content/lessons/mini-project-2.md', '{"Menghubungkan state dengan UI", "Lulus testing interaksi"}'),
  
  -- Modul 5
  ('l5100000-0000-0000-0000-000000000000', 'id', 'Navigasi Dasar', 'Berpindah antar layar.', 'content/lessons/navigasi-dasar.md', '{"Menggunakan Navigator push dan pop"}'),
  ('l5200000-0000-0000-0000-000000000000', 'id', 'Async & Future', 'Menangani proses yang lama.', 'content/lessons/async-future.md', '{"Memahami penggunaan async await"}'),
  ('l5300000-0000-0000-0000-000000000000', 'id', 'Penyimpanan Lokal', 'Menyimpan data ringan di HP.', 'content/lessons/local-persistence.md', '{"Memahami cara kerja SharedPreferences"}'),
  
  -- Modul 6
  ('l6100000-0000-0000-0000-000000000000', 'id', 'Capstone Project', 'Aplikasi To-Do List akhir.', 'content/lessons/capstone-project.md', '{"Membangun aplikasi utuh 2 halaman", "Lulus testing fungsional End-to-End"}')

ON CONFLICT (lesson_id, locale) DO UPDATE SET
  title = EXCLUDED.title,
  summary = EXCLUDED.summary,
  body_ref = EXCLUDED.body_ref,
  expected_outcomes = EXCLUDED.expected_outcomes;
