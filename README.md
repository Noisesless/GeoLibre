# 🌍 GeoLibre Map Starter Kit — 2D & 3D WebGIS Reference & Asset Bundle

[![Upstream: GeoLibre](https://img.shields.io/badge/Upstream-opengeos%2FGeoLibre-276DC3?logo=github)](https://github.com/opengeos/GeoLibre)
[![MapLibre GL JS](https://img.shields.io/badge/MapLibre%20GL%20JS-v6.16+-blue?logo=maplibre)](https://maplibre.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Cloud Native GIS](https://img.shields.io/badge/GIS-Cloud--Native%20%26%20WASM-green.svg)](https://geolibre.app/)
[![Platform](https://img.shields.io/badge/Platform-Vanilla%20JS%20%7C%20React%20%7C%20Next.js-purple.svg)](https://github.com/Noisesless/GeoLibre)

Paket referensi, aset biner lokal mandiri (*zero external CDN lock-in*), serta starter kit WebGIS 2D modern dan 3D interaktif yang bersumber dari ekosistem **[GeoLibre](https://github.com/opengeos/GeoLibre)** (oleh [opengeos](https://github.com/opengeos)). 

Repositori ini ditujukan sebagai fondasi siap pakai (*starter kit*) untuk pengembang yang ingin membangun visualisasi peta interaktif dengan performa tinggi, baik menggunakan **Vanilla JavaScript** tanpa build-step, maupun terintegrasi penuh ke dalam framework modern seperti **React** dan **Next.js (App Router)**.

---

## 📌 Hubungan dengan Proyek Asli GeoLibre (Upstream)

Proyek hulu [opengeos/GeoLibre](https://github.com/opengeos/GeoLibre) adalah platform GIS *cloud-native*, ringan, dan *open-source* yang berjalan lintas platform (Web, Desktop via Tauri v2, iOS/Android, serta Jupyter Notebooks) dengan dukungan **1.000+ alat analisis geospasial WebAssembly** (DuckDB-WASM Spatial, WhiteboxTools, deck.gl, dan multi-rendering engine).

**Repositori ini (`Noisesless/GeoLibre`) difokuskan sebagai:**
1. **Core Web Asset Distribution:** Menampung aset *runtime* inti MapLibre GL JS v6+ dan Web Worker yang telah diuji kompatibilitasnya untuk rendering vektor, raster, dan DEM 3D.
2. **Developer Quickstart (Starter Kit):** Menyediakan contoh implementasi praktis (*plug-and-play*) untuk visualisasi peta 2D, topografi gunung 3D (DEM Terrain), dan ekstrusi gedung bertingkat 3D.
3. **Template Komponen React / Next.js:** Solusi anti-*blank* untuk penanganan *Server-Side Rendering* (SSR) dan konfigurasi *Web Worker* di lingkungan bundler modern (Turbopack / Webpack / Vite).

> 💡 **Catatan Branch:**
> - Branch `main` (Default): Dokumentasi utama dan starter kit aset mandiri ini.
> - Branch `master`: Source code lengkap hasil fork dari repositori hulu [opengeos/GeoLibre](https://github.com/opengeos/GeoLibre).

---

## 📁 Struktur Direktori & Komponen

```text
GeoLibre/ (maplibre-starter-kit)
│
├── assets/                          # 📦 Bundel aset biner lokal & data spasial siap pakai
│   ├── maplibre-gl.mjs              # ES Module library utama MapLibre GL JS (v6.16+)
│   ├── maplibre-gl-worker.mjs       # Dedicated Web Worker (Wajib untuk decode Vector Tile & GeoJSON)
│   ├── maplibre-gl.css              # Stylesheet UI & kontrol peta
│   ├── map-config.js                # Modul konfigurasi standar peta 2D (5 Basemap, search, bounds)
│   └── geojson/                     # 📂 Direktori Baku Data Spasial (Single Source of Truth)
│       ├── banjarnegara-kecamatan.geojson # Batas 20 Kecamatan Kabupaten Banjarnegara (817 KB)
│       ├── banjarnegara-desa.geojson      # Batas 278 Desa/Kelurahan Kabupaten Banjarnegara (2.63 MB)
│       └── metadata.json                  # SSOT metadata spasial, checksum, skema atribut & BBox
│
├── examples/                        # 🚀 Demo HTML Standalone (Bisa langsung dibuka di browser)
│   ├── 01-vanilla-2d.html           # Peta 2D Banjarnegara lengkap (5 Basemap, Autocomplete Search, 3D Tilt)
│   ├── 02-vanilla-3d-terrain.html   # Peta 3D dengan elevasi gunung nyata (DEM) & rotasi kamera
│   └── 03-vanilla-3d-buildings.html # Peta 3D perkotaan dengan ekstrusi bangunan (fill-extrusion)
│
├── templates/                       # ⚛️ Komponen siap pakai untuk React / Next.js
│   ├── Map2DComponent.tsx           # Komponen React 2D interaktif (Liberty, Positron, Satelit, Dual GeoJSON)
│   └── Map3DComponent.tsx           # Komponen React 3D dengan toggle terrain, rotasi, & atmosfer langit
│
├── .gitignore                       # Konfigurasi pengabaian file Git
├── app-context.md                   # Snapshot state arsitektur & konteks proyek
└── README.md                        # Dokumentasi teknis utama
```

---

## ⚡ Menjalankan Demo Secara Langsung (Standalone)

Seluruh contoh pada direktori `examples/` dirancang agar dapat diuji tanpa konfigurasi dependensi atau *build step*:

1. **Jalankan melalui Local HTTP Server** (direkomendasikan agar file GeoJSON lokal dapat di-*fetch* tanpa hambatan browser CORS):
   ```bash
   # Opsi 1: Menggunakan npx serve
   npx serve .

   # Opsi 2: Menggunakan Python 3
   python -m http.server 8080

   # Opsi 3: VS Code Live Server
   # Buka direktori di VS Code -> Klik kanan pada file HTML -> "Open with Live Server"
   ```
   - **Peta 2D Interaktif:** [examples/01-vanilla-2d.html](examples/01-vanilla-2d.html)
     *Fitur:* Switcher gaya peta (Liberty, Positron, Esri Satelit), filter dropdown 20 kecamatan dengan auto `fitBounds`, toggle layer batas kecamatan dan desa, serta pop-up hover & info-card interaktif.
   - **Peta 3D Topografi Gunung (DEM):** [examples/02-vanilla-3d-terrain.html](examples/02-vanilla-3d-terrain.html)
     *Fitur:* Elevasi topografi 3D nyata bersumber dari data raster DEM Terrarium, pengatur kemiringan (*pitch* 0°–85°), rotasi (*bearing*), pengali tinggi lembah/gunung (*exaggeration slider*), efek kabut atmosfer cakrawala (*sky/fog*), serta auto-rotation kamera orbit.
   - **Peta 3D Ekstrusi Gedung Perkotaan:** [examples/03-vanilla-3d-buildings.html](examples/03-vanilla-3d-buildings.html)
     *Fitur:* Visualisasi gedung bertingkat 3D secara otomatis memanfaatkan layer data OpenMapTiles/OpenFreeMap dengan filter `["==", "extrude", "true"]` dan interpolasi ketinggian `render_height`.

---

## 📊 Analisa & Spesifikasi Data Spasial Kabupaten Banjarnegara

Aset GeoJSON batas wilayah diintegrasikan dari proyek `pertanian_main` (`D:\Project\pertanian_main\dist\`), yang telah melalui proses optimasi presisi koordinat 6 desimal (~11 cm akurasi standar) dan penghapusan dimensi elevasi Z berlebih:

### 1. Data Kecamatan (`assets/banjarnegara_kecamatan.geojson`)
- **Total Fitur:** 20 Kecamatan (Banjarmangu, Banjarnegara, Batur, Bawang, Kalibening, Karangkobar, Madukara, Mandiraja, Pagedongan, Pagentan, Pandanarum, Pejawaran, Punggelan, Purwanegara, Purwarejaklampok, Rakit, Sigaluh, Susukan, Wanadadi, Wanayasa).
- **Struktur Properti:** `{ "Kecamatan": string, "Name": string }`
- **Ukuran Berkas:** ~817 KB

### 2. Data Desa / Kelurahan (`assets/banjarnegara_desa.geojson`)
- **Total Fitur:** 278 Desa/Kelurahan
- **Struktur Properti:** `{ "OBJECTID": number, "Nama_Desa_": string, "Kecamatan": string, "Kabupaten": string }`
- **Ukuran Berkas:** ~2.63 MB

### 3. Bounding Box & Koordinat Geografis (WGS84)
- **Rentang Bujur (Longitude):** `109.361515` s/d `109.917709`
- **Rentang Lintang (Latitude):** `-7.540894` s/d `-7.170981`
- **Titik Tengah (Center):** `[109.639612, -7.355938]`
- **Array Bounds untuk MapLibre `fitBounds`:**
  ```javascript
  const BANJARNEGARA_BOUNDS = [
    [109.361515, -7.540894], // Barat Daya (Southwest)
    [109.917709, -7.170981]  // Timur Laut (Northeast)
  ];
  ```

---

## 🗺️ Komparasi Teknis: Peta 2D vs Peta 3D di MapLibre

| Parameter Arsitektur | Peta 2D Konvensional | Peta 3D Modern (GeoLibre / MapLibre) |
|---|---|---|
| **Sudut Kemiringan Kamera (`pitch`)** | `pitch: 0` (Tegak lurus dari atas / ortogonal) | `pitch: 50` s/d `85` (Sudut perspektif miring) |
| **Rotasi Azimuth (`bearing`)** | `bearing: 0` (Arah utara selalu di atas) | `bearing: -180°` s/d `+180°` (Dapat diputar bebas / auto-orbit) |
| **Kontur Permukaan (`setTerrain`)** | Tidak aktif (permukaan bumi dianggap bola datar) | Menggunakan Raster DEM (*encoding: terrarium*) dengan kurvatur nyata |
| **Bangunan (`fill-extrusion`)** | Poligon 2D datar dua dimensi | Poligon ter-ekstrusi dengan ketinggian dasar (`render_min_height`) & puncak |
| **Atmosfer Cakrawala (`setSky`)** | Latar belakang polos putih/abu-abu | Efek langit gradasi, kabut cakrawala dinamis (*fog horizon blend*) |

---

## 🏔️ Panduan Upgrade Peta 2D Menjadi 3D Interaktif

Terapkan langkah-langkah berikut pada kode inisialisasi peta Anda:

### 1. Inisialisasi Kamera Berperspektif
```javascript
const map = new maplibregl.Map({
  container: "map",
  style: "https://tiles.openfreemap.org/styles/liberty",
  center: [109.685, -7.339], // [Longitude, Latitude]
  zoom: 13,
  pitch: 65,      // Kemiringan kamera (0-85 derajat)
  bearing: -20,   // Orientasi sudut pandang
  maxPitch: 85
});
```

### 2. Pasang Sumber Data Raster DEM (Digital Elevation Model)
MapLibre GL JS mendukung tile elevasi global gratis berspesifikasi Terrarium:
```javascript
map.on("load", () => {
  // Daftarkan sumber data elevasi raster
  map.addSource("terrain-dem", {
    type: "raster-dem",
    tiles: [
      "https://s3.amazonaws.com/elevation-tiles-prod/terrarium/{z}/{x}/{y}.png"
    ],
    tileSize: 256,
    encoding: "terrarium",
    maxzoom: 15
  });

  // Terapkan terrain 3D ke permukaan peta
  map.setTerrain({
    source: "terrain-dem",
    exaggeration: 1.8 // Pengali ketinggian (1.0 = skala nyata, 2.0 = kontur lebih tegas)
  });
});
```

### 3. Terapkan Efek Langit & Kabut Cakrawala (`setSky`)
```javascript
map.setSky({
  "sky-color": "#1e3a8a",
  "horizon-color": "#bae6fd",
  "fog-color": "#cbd5e1",
  "fog-ground-blend": 0.4
});
```

### 4. Ekstrusi Poligon Bangunan Menjadi 3D
```javascript
map.addLayer({
  id: "3d-buildings",
  source: "openmaptiles",
  "source-layer": "building",
  filter: ["==", "extrude", "true"],
  type: "fill-extrusion",
  minzoom: 14,
  paint: {
    "fill-extrusion-color": "#94a3b8",
    "fill-extrusion-height": ["get", "render_height"],
    "fill-extrusion-base": ["get", "render_min_height"],
    "fill-extrusion-opacity": 0.85
  }
});
```

---

## ⚛️ Panduan Integrasi React & Next.js (App Router / Pages Router)

Salah satu masalah utama penggunaan library berbasis WebGL di Next.js adalah eksekusi SSR (*Server-Side Rendering*) yang menyebabkan error `window is not defined` atau kegagalan Web Worker.

### 1. Salin Berkas Worker ke Direktori Statis Publik
Salin `assets/maplibre-gl-worker.mjs` ke direktori `public/` proyek Next.js Anda:
```text
next-app/
├── public/
│   └── maplibre-gl-worker.mjs   <-- Wajib diletakkan di sini
├── src/
│   └── components/
│       ├── Map2DComponent.tsx
│       └── Map3DComponent.tsx
```

### 2. Atur Worker URL Secara Global
Di komponen klien React Anda (seperti yang telah diimplementasikan pada file di folder `templates/`), tetapkan worker URL sebelum instansiasi:
```typescript
"use client";

import * as maplibregl from "maplibre-gl";

if (typeof window !== "undefined") {
  maplibregl.setWorkerUrl("/maplibre-gl-worker.mjs");
}
```

### 3. Gunakan Dynamic Import Tanpa SSR di Halaman Utama
```tsx
import dynamic from "next/dynamic";

// Memuat komponen peta hanya pada sisi klien (Client-Only)
const Map3D = dynamic(() => import("@/components/Map3DComponent"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[600px] flex items-center justify-center bg-slate-900 text-sky-400">
      Menginisialisasi Engine Peta 3D...
    </div>
  ),
});

export default function Page() {
  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">Dashboard Spasial 3D</h1>
      <Map3D 
        initialCenter={[109.685, -7.339]} 
        initialZoom={13} 
        exaggeration={1.8} 
        showTerrain={true} 
      />
    </main>
  );
}
```

---

## 🌐 Katalog Tile Provider & Basemap Gratis (Tanpa API Key)

Seluruh template dan demo pada repositori ini menggunakan sumber data peta terbuka yang legal dan dapat digunakan langsung tanpa perlu mendaftar token komersial:

| Nama Sumber | Tipe Data | Format / Endpoint URL | Lisensi & Ketentuan |
|---|---|---|---|
| **OpenFreeMap Liberty** | Vektor Basemap | `https://tiles.openfreemap.org/styles/liberty` | Gratis, open-source, tanpa limit kuota ketat |
| **OpenFreeMap Positron** | Vektor Minimalis | `https://tiles.openfreemap.org/styles/positron` | Cocok untuk visualisasi tematik data bisnis/analisis |
| **OpenFreeMap Bright** | Vektor Terang | `https://tiles.openfreemap.org/styles/bright` | Gaya kartografi klasik OpenStreetMap |
| **Esri World Imagery** | Raster Satelit | `https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}` | Citra satelit resolusi tinggi global |
| **AWS Terrarium DEM** | Raster Elevasi 3D | `https://s3.amazonaws.com/elevation-tiles-prod/terrarium/{z}/{x}/{y}.png` | Model elevasi digital global (*format: terrarium*) |

---

## 🔬 Koneksi ke Ekosistem GeoLibre Lebih Luas

Jika Anda membutuhkan analisis geospasial tingkat lanjut yang melampaui visualisasi standar MapLibre GL JS, ekosistem hulu [GeoLibre](https://github.com/opengeos/GeoLibre) menyediakan modul terintegrasi:

1. **In-Browser Geoprocessing (WebAssembly):**
   - Menjalankan lebih dari 1.000 perkakas analisis spasial (hidrologi, LiDAR, penginderaan jauh, dan kalkulasi vektor) langsung di browser klien tanpa data meninggalkan komputer lokal.
2. **DuckDB-WASM Spatial Engine:**
   - Menjalankan Spatial SQL berkecepatan tinggi terhadap file GeoParquet, Shapefile, dan GeoJSON berukuran gigabyte langsung di memori browser.
3. **Multi-Engine Synchronized Viewports:**
   - Kemampuan menyinkronkan tampilan proyek spasial secara *split-pane* antara MapLibre GL JS, CesiumJS (untuk representasi bola dunia 3D presisi tinggi), Mapbox GL JS, dan ArcGIS Maps SDK.
4. **Data Science Integrations:**
   - **Python:** `pip install geolibre` — Kendalikan peta interaktif secara penuh di dalam Jupyter Notebook / Google Colab.
   - **R / Shiny:** Paket [geolibre-r](https://r.geolibre.app/) — Pembuatan peta interaktif di RStudio, Quarto, dan Shiny dashboard.

---

## 🛠️ Troubleshooting & Praktik Terbaik

- **Peta Muncul Sebagai Kotak Putih/Abu-Abu (Blank Screen):**
  *Penyebab:* File `maplibre-gl-worker.mjs` tidak dapat ditemukan oleh browser atau terblokir kebijakan MIME-type.
  *Solusi:* Pastikan file worker disalin ke direktori publik server web dan `maplibregl.setWorkerUrl()` merujuk pada path yang valid.
- **CORS Error saat Memuat GeoJSON Lokal:**
  *Penyebab:* Membuka file HTML secara langsung menggunakan protokol `file://`.
  *Solusi:* Selalu gunakan local HTTP server (seperti `npx serve .` atau ekstensi VS Code Live Server).
- **WebGL Context Lost pada Perangkat Mobile:**
  *Penyebab:* Memori GPU ponsel penuh karena memuat DEM terrain dengan resolusi terlalu tinggi sekaligus.
  *Solusi:* Atur `maxzoom: 14` pada sumber data DEM raster atau turunkan `exaggeration` saat mendeteksi layar berdimensi kecil.

---

## 📄 Lisensi & Atribusi

- **Kode Sumber Repositori:** Dilisensikan di bawah [MIT License](LICENSE).
- **Aset MapLibre GL JS:** Dilisensikan di bawah [BSD-3-Clause License](https://github.com/maplibre/maplibre-gl-js/blob/main/LICENSE.txt).
- **Data Kartografi:** Data peta dasar © [OpenStreetMap](https://www.openstreetmap.org/copyright) kontributor via OpenFreeMap, citra satelit © [Esri](https://www.esri.com/), dan data elevasi Terrain Tiles © Mapzen / AWS Open Data.
- **Kredit Proyek Asli:** Penghargaan penuh kepada tim [opengeos/GeoLibre](https://github.com/opengeos/GeoLibre) atas pengembangan platform GIS open-source terdepan.
