# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Deploy ke GitHub Pages

Proyek ini sudah siap dihosting sebagai situs statis. Ikuti langkah berikut:

1. Buat repositori GitHub dengan nama `my-portofolio` atau sesuaikan `vite.config.js` jika nama repo berbeda.
2. Push seluruh kode ke repositori GitHub.
3. Tambahkan file `.env` lokal bila perlu (`.env` tidak akan di-commit karena sudah ada di `.gitignore`).
4. Jalankan:
   - `npm install`
   - `npm run build`
   - `npm run deploy`

Skrip deploy menggunakan paket `gh-pages` untuk mengunggah isi folder `dist` ke branch `gh-pages`.

> Jika nama repo GitHub Anda berbeda, ubah nilai `base` di `vite.config.js` menjadi `/<nama-repo>/` sebelum build.

## Men-deploy backend AI ke layanan publik

Karena GitHub Pages hanya bisa hosting frontend statis, backend AI harus dijalankan di layanan publik terpisah.

1. Siapkan `server/.env` dari `server/.env.example`.
2. Isi `AI_PROVIDER`, dan `OPENAI_API_KEY` atau `GEMINI_API_KEY`.
3. Jalankan backend lokal untuk pengujian:
   - `npm install`
   - `npm run server`
4. Jika backend sudah bekerja, deploy ke layanan publik seperti:
   - Render: `https://render.com`
   - Railway: `https://railway.app`
   - Vercel: `https://vercel.com`
   - VPS/DigitalOcean
5. Pastikan URL backend publik tersedia, lalu atur di `.env` frontend:
   - `VITE_AI_BACKEND_URL=https://your-backend.example.com/api/ai`
6. Build dan deploy frontend GitHub Pages lagi.

Di layanan publik, sesuaikan command deployment menjadi `npm start` atau `npm run server` jika mereka membaca package.json.

## Menambahkan backend AI

Untuk menjalankan fitur AI dengan aman, frontend di GitHub Pages harus memanggil backend AI yang berjalan secara terpisah.

1. Buat file `server/.env` dari `server/.env.example`.
2. Isi `AI_PROVIDER` dengan `openai` atau `gemini`.
3. Isi `OPENAI_API_KEY` atau `GEMINI_API_KEY` sesuai provider yang dipilih.
4. Jalankan backend dengan:
   - `npm run server`
5. Jalankan frontend di terminal lain dengan:
   - `npm run dev`
6. Pastikan `VITE_AI_BACKEND_URL` di `.env` mengarah ke backend yang benar.

Untuk deploy production, host backend di layanan publik seperti Vercel, Render, Railway, atau VPS. Setelah backend aktif, atur `VITE_AI_BACKEND_URL` di file `.env` frontend ke alamat publik backend tersebut.

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
