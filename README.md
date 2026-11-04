# Portofolio Scroll

Portofolio scroll vertikal dari slide Canva (gambar / video), React + Vite, siap deploy ke Netlify.

## Menjalankan
```bash
npm install
npm run dev      # development
npm run build    # hasil di folder dist/
```

## Mengelola slide
Taruh file di `src/slides/` dengan format `slide-{angka}.{ext}`
(png, jpg, jpeg, webp, gif, svg, mp4, webm). Urutan mengikuti angka.
Ganti slide = timpa file. Tambah slide = tambah file dengan angka baru.

Di Canva: Share > Download > pilih PNG/JPG (atau MP4 untuk slide berisi video),
pilih "Selected pages" / satu halaman per file, lalu ganti nama sesuai format di atas.

## Deploy ke Netlify
1. Push project ke GitHub/GitLab, lalu "Add new site > Import an existing project" di Netlify.
   Setting build sudah ada di `netlify.toml` (build: `npm run build`, publish: `dist`).
2. Atau drag-and-drop folder `dist/` setelah `npm run build` ke Netlify Drop.

## Catatan
- Scrollbar tersembunyi dan muncul saat kursor di tepi kanan layar, saat scroll, atau saat di-drag (`src/components/AutoScrollbar.jsx`).
- Lebar slide dibatasi `--max-width` (default 1600px) di `src/styles.css`, jadi saat zoom out slide mengecil dan ada ruang di kiri-kanan. Jarak antar slide diatur lewat `--gap` di `src/styles.css` (default 0).
- Video diputar otomatis (muted) hanya saat terlihat di layar.
- Kompres file besar agar loading di HP tetap cepat. Hindari GIF besar, lebih baik mp4/webm.
- Batas ukuran file di Git biasa 100 MB per file; video besar sebaiknya dikompres.
