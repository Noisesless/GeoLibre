# TODO — GeoLibre Map Starter Kit

## ✅ Fase Selesai (Completed Milestones)
- [x] Standarisasi bundel aset biner MapLibre GL JS v6+, ES Module, stylesheet, dan dedicated Web Worker.
- [x] Integrasi Single Source of Truth (SSOT) data spasial Banjarnegara: 20 Kecamatan (817 KB) & 278 Desa (2.63 MB).
- [x] Pembuatan data bundle instan `assets/geojson/banjarnegara-data.js` untuk bypass pembatasan CORS pada protokol `file://`.
- [x] Implementasi demo peta 2D interaktif (`examples/01-vanilla-2d.html`) dengan switcher 5 basemap, auto-fit kecamatan, pencarian autocomplete, dan pop-up hover.
- [x] Implementasi demo peta 3D elevasi topografi DEM Terrarium (`examples/02-vanilla-3d-terrain.html`) dengan pengali kontur dan kabut cakrawala.
- [x] Implementasi demo peta 3D gedung bertingkat (`examples/03-vanilla-3d-buildings.html`) terintegrasi batas wilayah spasial desa/kecamatan.
- [x] Resolusi issue basemap gelap: Mengganti raster CartoDB Dark Matter yang mewajibkan API key ke OpenFreeMap Dark vector tiles (100% gratis & bebas token).
- [x] Resolusi issue WebGL lifecycle: Menerapkan event hook `idle` untuk persistensi otomatis layer GeoJSON saat berganti gaya basemap.
- [x] Pembuatan template komponen modern React / Next.js (`templates/Map2DComponent.tsx` & `templates/Map3DComponent.tsx`).
- [x] Sinkronisasi penuh 9 berkas dokumentasi teknis standar Brainvibes di direktori `/.docs/`.

---

## 🚀 Fase Aktif: Validasi Data Spasial & Quality Assurance

### Task Aktif: Verifikasi Batas Wilayah Kecamatan Sigaluh (Bagian Timur)
- [ ] **Investigasi Batas Timur Kecamatan Sigaluh:**
  - [ ] Inspeksi geometri poligon bagian timur Kecamatan Sigaluh pada `assets/geojson/banjarnegara-kecamatan.geojson` (perbatasan langsung dengan Kabupaten Wonosobo / Kali Serayu).
  - [ ] Audit batas desa-desa terluar di wilayah timur Sigaluh pada `assets/geojson/banjarnegara-desa.geojson` (Desa Prigi, Gembongan, Sawangan, Bojanegara, Singomerto, dll.).
  - [ ] Deteksi potensi anomali geometri (sliver polygon, self-intersection, overlapping boundary, atau garis batas yang terpotong/kurang valid).
- [ ] **Komparasi Data GeoJSON Sigaluh Pembanding:**
  - [ ] Siapkan berkas GeoJSON pembanding untuk Kecamatan Sigaluh dari sumber resmi alternatif (BPS / Badan Informasi Geospasial / Dinas terkait).
  - [ ] Lakukan overlay visualisasi spasial antara dataset eksisting vs dataset pembanding untuk memetakan titik deviasi koordinat.
- [ ] **Koreksi & Sinkronisasi Dataset:**
  - [ ] Lakukan penyesuaian / snapping batas koordinat yang valid.
  - [ ] Perbarui `assets/geojson/banjarnegara-kecamatan.geojson` & `assets/geojson/banjarnegara-desa.geojson`.
  - [ ] Re-generate `assets/geojson/banjarnegara-data.js` (kompilasi data instan).
  - [ ] Perbarui checksum SHA-256 dan bounding box pada `assets/geojson/metadata.json` serta `.docs/database.md`.
