# Panduan & Checklist Deployment — GeoLibre Map Starter Kit

## 1. Target Lingkungan Deployment (Deployment Targets)

| Platform | Tipe Kompilasi | Karakteristik & Langkah Kunci |
|---|---|---|
| **GitHub Pages** | Static Hosting | Langsung sajikan folder root atau `examples/` tanpa konfigurasi build. |
| **Vercel / Netlify** | Next.js / Static | Salin `assets/maplibre-gl-worker.mjs` ke direktori `public/`. |
| **cPanel / Nginx VPS** | Static Web Server | Pastikan MIME-type `.mjs` diset sebagai `application/javascript` dan `.geojson` sebagai `application/geo+json`. |

---

## 2. Pemetaan Variabel Lingkungan (Environment Variables)
*Catatan: Proyek ini dirancang 100% bebas dari token komersial atau kredensial rahasia.*

| Variabel | Default | Deskripsi |
|---|---|---|
| `NEXT_PUBLIC_MAPLIBRE_WORKER` | `"/maplibre-gl-worker.mjs"` | Lokasi path statis worker di direktori public |
| `PORT` | `8080` | Port dev server lokal |

---

## 3. Checklist Pra-Deployment (Pre-Flight Checklist)
- [x] **Aset Worker Tersedia:** `maplibre-gl-worker.mjs` terpasang di folder publik untuk menghindari error Web Worker di Next.js.
- [x] **Zero Commercial Token:** Tidak ada penggunaan API key CartoDB, Mapbox, atau Google Maps yang dapat kadaluarsa.
- [x] **Persistensi Layer Teruji:** Event hook `idle` telah teruji mempertahankan batas wilayah saat pengguna mengganti basemap.
- [x] **CORS Fallback:** Berkas `banjarnegara-data.js` siap digunakan sebagai bypass pada sistem yang mengakses via protokol lokal.
- [x] **MIME-Type Konfigurasi:** Server target mengizinkan pengiriman file `.mjs` dan `.geojson` dengan header `Access-Control-Allow-Origin: *`.

---

## 4. Rencana Rollback (Rollback Plan)
Jika terjadi kendala pada lingkungan produksi:
1. Jalankan `git revert <commit-hash>` untuk membatalkan commit terkini.
2. Pastikan file statis `assets/` tetap utuh pada cache CDN penyedia hosting.
3. Muat ulang halaman klien menggunakan `Ctrl + F5` (Hard Reload) untuk menghapus cache Service Worker / Web Worker lokal.
