# Lesson Runtime & Assessment Metadata Contract

Dokumen ini mendefinisikan skema metadata lesson untuk sistem pembelajaran hybrid. Metadata ini menjadi kontrak antara database (Supabase), renderer lesson (Next.js client/server components), dan runner assessment (external runner / on-demand grader).

## 1. Existing Base Metadata

Setiap lesson sudah memiliki dasar identifikasi berikut yang ada di tabel `lessons` dan `lesson_translations`:
- `snippet_id` (opsional): ID snippet khusus untuk referensi eksternal (misal: ID gist untuk dartpad).
- `video_path` (opsional): URL atau path video pembelajaran.
- `body_ref` (opsional): Path referensi file di repository untuk konten body (misal: markdown content).

## 2. Hybrid Runtime & Assessment Metadata

Kolom baru ini diperkenalkan untuk mendukung arsitektur hybrid tanpa compiler persisten:

### `runtime_mode` (TEXT)
Menentukan lingkungan eksekusi code yang akan dirender di halaman lesson.
- **`none`** (Default): Untuk Concept Lesson (artikel/video). Tidak ada editor yang dirender.
- **`browser_lab`**: Merender iframe/embed pihak ketiga (seperti DartPad) untuk latihan ringan.
- **`project_lab`**: Merender interface untuk project sungguhan yang bisa diunduh, disubmit, dan dinilai.

### `assessment_mode` (TEXT)
Menentukan bagaimana completion/penyelesaian lesson divalidasi.
- **`manual`** (Default): Diselesaikan mandiri oleh user dengan menekan tombol "Complete". Berlaku untuk `runtime_mode` `none` dan `browser_lab`.
- **`graded`**: Diselesaikan secara otomatis oleh backend/runner on-demand berdasarkan hasil test (`passed`). Tidak dapat diselesaikan secara manual. Wajib untuk `project_lab`.

## 3. Project Lab Metadata

Kolom ini digunakan khusus ketika `runtime_mode` bernilai `project_lab`:

### `starter_source` (TEXT)
Identifier atau path menuju project template awal (starter code) yang akan diunduh/dibuka oleh user.
*Contoh: `storage_bucket/projects/starter_01.zip` atau `github_repo_url/tree/main/starter_01`*

### `grader_target` (TEXT)
Identifier atau path ke hidden test suite yang akan dieksekusi oleh on-demand grader.
*Contoh: `s3_bucket/graders/test_01.zip`*

## 4. Gating & UX Metadata

### `expected_outcomes` (TEXT[])
*(Berada di tabel `lesson_translations` untuk lokalisasi)*
Daftar checklist/objektif yang dirender pada UI. Membantu user mengetahui apa saja yang harus dicapai dalam lab/lesson tersebut sebelum diselesaikan.
*Contoh: `["Mampu membuat stateless widget", "Memahami konsep material app"]`*

### `unlock_rule` (TEXT)
Rule untuk membuka lesson atau course berikutnya (gating).
Bisa berupa teks string yang dipetakan ke logic engine (misalnya `"require_all_passed"`, atau `"streak_3_days"`).

---
**Catatan Authoring:**
- Saat membuat lesson teori: `runtime_mode = none`, `assessment_mode = manual`.
- Saat membuat lesson dartpad: `runtime_mode = browser_lab`, `assessment_mode = manual`, isi `snippet_id`.
- Saat membuat lesson project: `runtime_mode = project_lab`, `assessment_mode = graded`, lengkapi `starter_source` dan `grader_target`.
