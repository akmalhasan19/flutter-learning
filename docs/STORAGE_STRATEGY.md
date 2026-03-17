# Strategy Penyimpanan Aset dan Video untuk Flutter Learning MVP

Dokumen ini mendefinisikan strategi penyimpanan aset gambar (thumbnails, badges, illustrations) dan file video untuk keperluan MVP. Secara umum kita menggunakan **Supabase Storage** agar tetap selaras dengan basis data dan autentikasi.

## 1. Pembagian Bucket (Buckets Definition)

Kita membagi penyimpanan ke dalam dua bucket utama berdasarkan tingkat aksesibilitasnya:

1. **`public-assets`** (Public)
   - Digunakan untuk: Illustrations, Badges, Course/Lesson Thumbnails, dan gambar bebas akses lainnya.
   - Kebijakan Akses: **Public Read**, anonim maupun user terotentikasi dapat membaca aset ini.
   - Tidak ada batasan akses baca, namun tulis (Write/Upload) hanya untuk admin/service role.

2. **`course-videos`** (Private / Protected)
   - Digunakan untuk: Video lesson.
   - Kebijakan Akses: **Private / Authenticated Read**. Hanya pengguna yang sudah *login* yang bisa mengakses URL video tersebut.
   - Dapat di-load lewat *Signed URLs* (berlaku sekian menit) atau otorisasi langsung lewat integrasi Supabase client.

## 2. Naming Convention untuk File Asset

Konsistensi penamaan aset penting agar authoring mudah dikelola.

- **Badges**: `badges/<badge_code>_<resolution>.png`
  - Contoh: `badges/first_lesson_128x128.png`
- **Thumbnails**: `thumbnails/<course_slug>_cover.jpg` atau `thumbnails/<lesson_slug>_cover.jpg`
  - Contoh: `thumbnails/pengenalan-dart_cover.jpg`
- **Illustrations**: `illustrations/<page>_<section>_<purpose>.svg`
  - Contoh: `illustrations/landing_hero_welcome.svg`
- **Videos**: `videos/<course_slug>/<lesson_slug>.mp4`
  - Contoh: `videos/pengenalan-dart/hello-world.mp4`

## 3. Aturan Ukuran Video (Batas Ukuran & Resolusi)

Untuk menghindari tagihan Supabase Storage / Bandwidth yang membengkak di tahap MVP:
- **Max File Size**: 30MB - 50MB per video singkat (durasi rata-rata 3-5 menit).
- **Resolusi / Encoding**: 720p (1280x720) sudah sangat cukup untuk pemula yang hanya ingin melihat kursor/layar tutor atau minimal 1080p dengan bitrate rendah.
- **Kadar Bitrate**: Batasi video bitrate ke `~1000 - 1500 kbps`.

## 4. Alur Kompresi Sederhana (Compression Workflow)

Untuk author materi yang menyiapkan video, lakukan re-encoding sederhana via *FFmpeg* sebelum upload ke Supabase:

```bash
# Contoh perintah kompresi cepat dengan penyeimbangan size & kualitas (H.264, 720p)
ffmpeg -i input_mentah.mov -vcodec libx264 -crf 28 -preset fast -s 1280x720 output_kompresi.mp4
```

## 5. Simpan Path di Database

Path objek (misalnya `videos/pengenalan-dart/hello-world.mp4` atau `badges/first_lesson_128x128.png`) langsung disimpan di:
- **Tabel `badges`**: kolom `icon_path`
- **Tabel `lessons`**: kolom `video_url`
  
*Catatan*: Di UI, kita akan menggunakan helper `supabase.storage.from('bucket').getPublicUrl('path')` untuk bucket publik, dan `createSignedUrl` atau Supabase auth-headers untuk bucket privat.
