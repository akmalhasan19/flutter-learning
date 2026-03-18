# Panduan Penulisan Konten (Beginner Curriculum)

Dokumen ini adalah panduan bagi writer/contributor untuk menulis lesson di jalur Beginner Path. Tujuannya adalah untuk menjaga konsistensi gaya bahasa, format, dan struktur lesson agar pemula merasa dibimbing dengan baik dan tidak kewalahan.

## 1. Gaya Bahasa dan Tone (Beginner-Friendly)
- **Sederhana & Empatis:** Gunakan bahasa Indonesia sehari-hari yang profesional namun ramah (misalnya menggunakan kata ganti "kamu" untuk learner). Hindari menggunakan jargon teknis tanpa penjelasan terlebih dahulu.
- **Bertahap:** Jangan menjelaskan konsep terlalu dalam di awal. Jelaskan *apa* dan *mengapa* (secara ringkas), lalu tunjukkan *bagaimana* (kode).
- **Format Pendek:** Pecah paragraf panjang menjadi poin-poin (*bullet points*). Gunakan *bold* untuk memberikan penekanan pada istilah kunci.
- **Positif:** Berikan dorongan atau afirmasi positif di akhir lesson atau sebelum latihan.

## 2. Struktur Template Lesson
Setiap lesson (terutama *Concept* dan *Browser Lab*) wajib mengikuti struktur dasar berikut agar learner terbiasa dengan pola belajar:
1. **Tujuan Belajar (Goal):** 1-2 kalimat tentang apa yang akan dicapai di lesson ini.
2. **Penjelasan Konsep (Konsep Dasar):** Teori singkat dengan analogi dunia nyata jika memungkinkan.
3. **Contoh Kode (Snippet):** Contoh kode sederhana yang berfokus *hanya* pada konsep yang sedang dibahas.
4. **Latihan (Opsional/Jika Browser Lab):** Instruksi untuk mencoba sendiri mengubah/menjalankan kode.
5. **Kesalahan Umum (Common Mistakes):** Section khusus untuk memperingatkan pemula tentang error yang sering terjadi terkait topik tersebut (misalnya lupa titik koma, salah meletakkan kurung kurawal, atau *State* tidak terupdate karena lupa `setState`).
6. **Ringkasan (Wrap-up):** 2-3 poin kesimpulan dari lesson.

## 3. Format "Expected Outcomes" (Luaran yang Diharapkan)
*Expected outcomes* akan dirender sebagai *checklist* di UI. Formatnya wajib berupa kata kerja operasional yang dapat diukur dan diselesaikan oleh learner secara praktis.
**Format yang benar:**
- *Membuat variabel dengan tipe data String dan int.*
- *Menggabungkan Row dan Column di dalam layar.*
- *Memicu perubahan UI menggunakan tombol.*

**Format yang salah (terlalu abstrak):**
- *Memahami variabel.* (Susah diukur)
- *Belajar tentang layout.* (Kurang spesifik)

## 4. Aturan Format File (Markdown vs MDX vs Frontmatter)
- **Markdown Biasa (`.md`):** Gunakan Markdown murni untuk semua file konten lesson (*Concept* maupun instruksi *Browser/Project Lab*). 
- **Tanpa Frontmatter:** Mengingat arsitektur MVP kita menjadikan Supabase (tabel `lessons` dan `lesson_translations`) sebagai *source of truth* untuk metadata (seperti judul, deskripsi, expected outcomes, body_ref), kita **tidak menggunakan Frontmatter** di dalam file Markdown. File Markdown hanya murni berisi *body content* yang akan dirender.
- **MDX (`.mdx`):** Hanya digunakan di masa depan jika kita membutuhkan komponen interaktif React langsung di dalam *body* teks. Untuk Beginner MVP, cukup gunakan `.md`.

## 5. Checklist Kualitas Konten
Sebelum *submit* PR konten, pastikan:
- [ ] Tidak ada jargon asing yang dibiarkan tanpa penjelasan.
- [ ] Contoh kode bisa di-*copy-paste* dan jalan tanpa error (jika berdiri sendiri).
- [ ] Section *Common Mistakes* sudah disertakan (jika relevan dengan materi).
- [ ] Struktur heading mengikuti urutan yang logis (H2, H3).
