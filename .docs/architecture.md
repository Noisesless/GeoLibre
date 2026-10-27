# Arsitektur Sistem — GeoLibre Map Starter Kit

## 1. Ikhtisar Arsitektur (High-Level Overview)
GeoLibre Map Starter Kit adalah arsitektur visualisasi geospasial 2D dan 3D berbasis WebGL/WebGPU mandiri (*zero external CDN lock-in*). Sistem ini menghubungkan pustaka MapLibre GL JS inti lokal dengan penyedia tile vektor/raster global bebas biaya dan data spasial lokal Kabupaten Banjarnegara.

```mermaid
graph TD
    subgraph Data Layer [Data Layer & SSOT]
        A1[banjarnegara-kecamatan.geojson] --> B1[Data Manager]
        A2[banjarnegara-desa.geojson] --> B1
        A3[banjarnegara-data.js (Bypass CORS)] --> B1
    end

    subgraph Service Layer [Tile Provider & Services]
        S1[OpenFreeMap Vector Tiles: Liberty / Positron / Bright / Dark]
        S2[Esri World Imagery: Raster Satelit]
        S3[AWS Terrarium DEM: Raster Elevasi 3D]
    end

    subgraph Engine [WebGL Rendering Engine]
        E1[MapLibre GL JS Core v6+]
        E2[maplibre-gl-worker.mjs]
        E1 --- E2
    end

    subgraph Presentation Layer [Presentation & Templates]
        P1[01-vanilla-2d.html - Peta 2D Interaktif]
        P2[02-vanilla-3d-terrain.html - Topografi 3D DEM]
        P3[03-vanilla-3d-buildings.html - Ekstrusi Gedung 3D]
        P4[Map2DComponent.tsx - React/Next.js]
        P5[Map3DComponent.tsx - React/Next.js]
    end

    B1 --> E1
    S1 --> E1
    S2 --> E1
    S3 --> E1
    E1 --> P1
    E1 --> P2
    E1 --> P3
    E1 --> P4
    E1 --> P5
```

## 2. Lapisan Presentasi (Presentation Layer)
1. **Vanilla HTML/JS (`examples/`):**
   - Menjalankan MapLibre langsung via UMD bundle tanpa build step.
   - Menggunakan event lifecycle `load` dan `idle` untuk persistensi layer GeoJSON.
   - Dilengkapi modul konfigurasi terpusat di `assets/map-config.js`.
2. **React / Next.js (`templates/`):**
   - Komponen terisolasi dengan penanganan Client-Side Rendering (`use client`).
   - Konfigurasi dedicated Web Worker (`setWorkerUrl`) untuk Turbopack dan Webpack.

## 3. Aliran Data & Penanganan Lifecycle (Data Lifecycle Flow)
- **Inisialisasi Peta:** Map instansiasi dengan salah satu basemap OpenFreeMap.
- **Pemuatan Data Spasial:** Menggunakan `window.BANJARNEGARA_GEOJSON` instan jika tersedia (aman untuk protokol `file://`), atau melakukan fallback `fetch()`.
- **Pergantian Gaya Peta (Style Switching):** Pemanggilan `map.setStyle()` menghapus layer kustom pada canvas WebGL; listener `map.on("idle", applyGeoJsonLayers)` secara otomatis merekonstruksi layer batas kecamatan dan desa segera setelah style baru selesai dirender.
