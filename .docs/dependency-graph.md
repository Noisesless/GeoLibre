# Graf Dependensi & Analisis Dampak — GeoLibre Map Starter Kit

## 🔴 Critical Files (Paling Banyak Di-import / Berdampak Sistemik)
*Peringatan: Berkas dalam kategori ini tidak boleh diubah sembarangan tanpa pengujian menyeluruh pada seluruh halaman demo dan komponen.*

| Berkas | Digunakan Oleh (Count) | Tipe Konten | Peran Kritis |
|---|---|---|---|
| `assets/maplibre-gl.js` | 3 demo HTML | UMD Library | Core WebGL Rendering Engine |
| `assets/maplibre-gl.css` | 3 demo HTML | Stylesheet | Struktur layout canvas & kontrol tombol navigasi |
| `assets/maplibre-gl-worker.mjs` | Next.js / React Bundler | ES Worker | Off-thread tile parsing & geometry tessellation |
| `assets/geojson/banjarnegara-data.js` | `01-vanilla-2d.html`, `03-vanilla-3d-buildings.html` | Data Bundle | Menyuplai data spasial instan tanpa blokir CORS pada `file://` |
| `assets/map-config.js` | `01-vanilla-2d.html` | Helper / Config | Definisi 5 basemap, bounds, dan fungsi pencarian |

---

## 🟡 High-Impact Files (Perubahan Berdampak Luas)
*Perubahan pada berkas ini memerlukan validasi skema GeoJSON dan pengujian konsumsi data.*

| Berkas | Bergantung Pada | Digunakan Oleh | Tingkat Dampak |
|---|---|---|---|
| `assets/geojson/banjarnegara-kecamatan.geojson` | Metadata SSOT | `02-vanilla-3d-terrain.html`, React template | Tinggi (Batas 20 Kecamatan) |
| `assets/geojson/banjarnegara-desa.geojson` | Metadata SSOT | `02-vanilla-3d-terrain.html`, React template | Tinggi (Batas 278 Desa) |
| `assets/geojson/metadata.json` | - | Pengembang / GIS Engine | Menengah (Validasi Checksum & BBox) |

---

## 🟢 Leaf Files (Aman Diubah — Berkas Presentasi Akhir)
*Berkas ini aman untuk dimodifikasi secara modular tanpa memengaruhi fungsi berkas lainnya.*

- `examples/01-vanilla-2d.html` — Halaman demo peta 2D interaktif
- `examples/02-vanilla-3d-terrain.html` — Halaman demo topografi 3D DEM
- `examples/03-vanilla-3d-buildings.html` — Halaman demo ekstrusi gedung 3D
- `templates/Map2DComponent.tsx` — Template komponen React 2D
- `templates/Map3DComponent.tsx` — Template komponen React 3D
