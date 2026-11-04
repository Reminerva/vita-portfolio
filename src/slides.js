// Membaca semua file src/slides/slide-{angka}.{ext} secara otomatis.
// Tambah / ganti slide cukup dengan menaruh / menimpa file, tanpa ubah kode.

// svg diperlakukan sebagai gambar (dirender lewat <img>)
const VIDEO_EXT = ['mp4', 'webm']

const modules = import.meta.glob(
  '/src/slides/slide-*.{png,jpg,jpeg,webp,gif,svg,mp4,webm}',
  { eager: true, query: '?url', import: 'default' }
)

export const slides = Object.entries(modules)
  .map(([path, url]) => {
    const match = path.match(/slide-(\d+)\.([a-z0-9]+)$/i)
    if (!match) return null
    const ext = match[2].toLowerCase()
    return {
      id: path,
      order: Number(match[1]),
      url,
      type: VIDEO_EXT.includes(ext) ? 'video' : 'image',
      ext,
    }
  })
  .filter(Boolean)
  .sort((a, b) => a.order - b.order) // numerik: slide-2 sebelum slide-10
