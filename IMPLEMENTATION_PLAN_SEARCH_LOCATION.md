# MVP Scope dan Product Rules

## Value Proposition
Belajar Flutter pertama yang simpel, efektif, dan seru.

## Target User Utama
Pemula total yang belum nyaman dengan Flutter.

## Scope Pembelajaran
Hanya 1 beginner learning path.

## Format Lesson
Teks + video singkat + snippet.

## Metode Auth MVP
Email + password.

## Scope Bahasa
Bilingual ID (Bahasa Indonesia) + EN (English).

## Out-of-Scope (Fitur yang Sengaja Dikeluarkan dari MVP)
- Admin CMS internal
- Payment atau subscription system
- Forum atau komunitas diskusi penuh
- AI tutor
- Public leaderboard yang kompleks
- Advanced Flutter track di luar beginner path
- Offline-first atau PWA penuh

## Success Metric Awal
- Signup
- Lesson start
- Lesson complete
- Return visit

## Information Architecture & Routing

### Locale Routing Pattern
- Menggunakan format `/[locale]/...` untuk mendukung bilingual (ID & EN).

### Route Mapping
- **Marketing Page**: `/[locale]`
- **Login**: `/[locale]/login`
- **Signup**: `/[locale]/signup`
- **Dashboard**: `/[locale]/dashboard`
- **Learning Catalog**: `/[locale]/learn`
- **Course Detail**: `/[locale]/learn/[courseSlug]`
- **Lesson Detail**: `/[locale]/lesson/[lessonSlug]`

### Layout Strategy
- Memisahkan layout untuk **Area Marketing** (public) dan **Authenticated App** (dashboard/learning).
- Menerapkan file standar Next.js: `loading.tsx`, `error.tsx`, `not-found.tsx`.
- Menyiapkan strategi SEO dasar: `metadata`, `sitemap.xml`, dan `robots.txt` pada level root/locale.

## Content Model & Authoring Strategy

### Database vs Repo Storage
- **Supabase**: Data course, module, lesson metadata, progress, dan rewards disimpan di database.
- **Repository**: Body lesson disimpan secara lokal di dalam repo dengan menggunakan format **MDX** (atau Markdown).

### Struktur Folder Konten
- **Bahasa Indonesia**: `src/content/id/` (contoh: `src/content/id/lessons/`)
- **Bahasa Inggris**: `src/content/en/` (contoh: `src/content/en/lessons/`)

### Aturan Slug & Schema Metadata
- **Slug Lintas Locale**: Menggunakan aturan slug yang persis sama dan stabil di kedua bahasa (ID & EN) untuk memastikan `/[locale]/lesson/[lessonSlug]` bekerja dengan baik.
- **Schema Metadata Konsisten**: Atribut frontmatter pada file lesson (title, description, duration) akan sama dan konsisten untuk semua locale.

### Custom Fields Lesson
- **Snippet Metadata**: Tersedia field `dartpadSnippetId` atau `gistId` untuk di-inject ke DartPad embed.
- **Video Metadata**: Tersedia field `videoUrl` untuk lesson yang menyertakan penjelasan video singkat.

### Fallback Rule
- Jika konten translasi untuk suatu bahasa (misal: EN) belum tersedia/lengkap, aplikasi akan menggunakan konten dari bahasa default (ID) dan/atau menampilkan pesan peringatan bahwa translasi belum tersedia.

## Bootstrap Frontend Foundation

### Inisialisasi Project
- Framework: Next.js dengan App Router.
- Bahasa & Tools: TypeScript, ESLint.
- Struktur folder: Menggunakan `src` folder agar source code terpisah dari config di root.

### Styling & UI Components
- Tailwind CSS dipasang dan dikonfigurasi.
- shadcn/ui dipasang dan dikonfigurasi untuk komponen UI yang re-usable.
- Design Token Dasar: disiapkan untuk konsistensi warna, spacing, radius, dan typography.

### Struktur Folder Dasar
- Folder: `components`, `lib`, `app`, `actions`, `content`, dan `public` sudah disiapkan.
- Layout Global: `RootLayout` dan `LocaleLayout` dengan layout komponen dasar (Header, Footer, Container).
- Visual State: Menyiapkan komponen dan indikator untuk state loading, empty, dan error.
- SEO & Metadata: Penyesuaian metadata dasar untuk kebutuhan SEO dan social preview.

## Supabase Project Setup

### Lingkungan & Variabel
- Pembuatan project Supabase untuk *environment development*.
- Variabel environment disiapkan:
  - `NEXT_PUBLIC_SUPABASE_URL`
  - `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`
  - *Server-side secret* yang hanya dapat diakses oleh backend.

### Struktur & Konvensi
- Folder disiapkan: `supabase/migrations` untuk mengelola perubahan skema database.
- *Naming convention* ditetapkan untuk penamaan *table*, *enum*, dan *SQL functions*.

### Seed & Policy
- Strategi seed data ditentukan untuk mengisi *course* dan *lesson* awal.
- Aturan (policy) diterapkan bahwa semua perubahan skema wajib menggunakan sistem *migration*.
