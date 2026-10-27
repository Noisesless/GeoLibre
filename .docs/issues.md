# Pelacak Isu & Perbaikan Bug (FIFO Buffer) — GeoLibre Map Starter Kit

## 🟢 Riwayat Isu Terselesaikan (Resolved History — FIFO Max 10)

### [ISSUE-002] Batas Spasial Hilang Saat Ganti Basemap (2D) & Belum Ada di Gedung 3D
- **Status:** `RESOLVED`
- **Tanggal:** 2026-10-27
- **Komponen:** `examples/01-vanilla-2d.html`, `examples/03-vanilla-3d-buildings.html`, `templates/Map2DComponent.tsx`
- **Akar Masalah:**
  1. Pada peta 2D, `map.setStyle()` menghapus seluruh layer kustom; event listener sebelumnya tidak menangkap penyelesaian rendering style baru.
  2. Pada berkas `03-vanilla-3d-buildings.html`, layer batas kecamatan dan desa belum diintegrasikan ke dalam peta gedung 3D.
- **Tindakan Perbaikan:**
  1. Memasang listener `map.on("idle", applyGeoJsonLayers)` sehingga batas wilayah desa dan kecamatan otomatis dipulihkan setiap kali pengguna berganti ke basemap mana pun.
  2. Menambahkan layer batas kecamatan dan desa di bawah layer `3d-buildings` pada `03-vanilla-3d-buildings.html` serta menambahkan kontrol navigasi Overview Kabupaten dan toggle batas wilayah.
- **Verifikasi:** Pengujian otomatis headless browser membuktikan kelima basemap mempertahankan batas wilayah secara permanen (`hasDesa: true`, `hasKec: true`).

---

### [ISSUE-001] Watermark "API KEY REQUIRED" pada Basemap Gelap CartoDB
- **Status:** `RESOLVED`
- **Tanggal:** 2026-10-27
- **Komponen:** `assets/map-config.js`, `templates/Map2DComponent.tsx`, `examples/01-vanilla-2d.html`
- **Akar Masalah:** Penyedia tile eksternal CartoDB memberlakukan kewajiban API key pada endpoint raster `basemaps.cartocdn.com/dark_all/...`.
- **Tindakan Perbaikan:** Mengganti sumber data dengan gaya vektor murni **OpenFreeMap Dark (`https://tiles.openfreemap.org/styles/dark`)** yang 100% bebas token dan satu ekosistem dengan gaya Liberty.
- **Verifikasi:** Tidak ada lagi pesan API KEY REQUIRED dan tile gelap dirender tajam berbasis vektor.

---

## 🟡 Isu Terbuka / Sedang Berjalan (Open Issues)
*(Saat ini tidak ada isu terbuka — semua sistem beroperasi optimal).*
