# Peta Navigasi & Rute Halaman — GeoLibre Map Starter Kit

## Frontend Routes (Standalone HTML Pages)

| Route Path | Berkas Sumber | Judul Halaman | Tipe Interaksi | Status |
|---|---|---|---|---|
| `/examples/01-vanilla-2d.html` | `examples/01-vanilla-2d.html` | Peta 2D Banjarnegara | 5 Basemap, Filter Kec, Autocomplete Search, Tilt 3D | ✅ Aktif & Teruji |
| `/examples/02-vanilla-3d-terrain.html` | `examples/02-vanilla-3d-terrain.html` | Peta 3D Topografi Banjarnegara | DEM Elevasi 3D Terrarium, Exaggeration Slider, Orbit | ✅ Aktif & Teruji |
| `/examples/03-vanilla-3d-buildings.html` | `examples/03-vanilla-3d-buildings.html` | Peta 3D Bangunan Banjarnegara | Fill-Extrusion Bangunan, Batas Wilayah Spasial, Overview | ✅ Aktif & Teruji |

---

## Component Routes (React / Next.js Client Wrappers)

| Nama Komponen | Berkas Sumber | Target Framework | Fitur Unggulan | Status |
|---|---|---|---|---|
| `<Map2DComponent />` | `templates/Map2DComponent.tsx` | Next.js / React (TSX) | 5 Basemap Selector, Dual GeoJSON, Idle Layer Persistence | ✅ Siap Pakai |
| `<Map3DComponent />` | `templates/Map3DComponent.tsx` | Next.js / React (TSX) | Raster DEM 3D, Skybox Atmosfer, Auto-Rotation Control | ✅ Siap Pakai |

---

## API Routes & Static Assets Endpoints

| Method | Endpoint Path | Tipe Konten | Kegunaan |
|---|---|---|---|
| `GET` | `/assets/maplibre-gl.js` | `application/javascript` | Standalone UMD MapLibre GL JS |
| `GET` | `/assets/maplibre-gl.mjs` | `application/javascript` | ES Module MapLibre GL JS |
| `/` | `/assets/maplibre-gl-worker.mjs` | `application/javascript` | Web Worker dedicated WebGL pipeline |
| `GET` | `/assets/map-config.js` | `application/javascript` | Modul konfigurasi baku & helper pencarian |
| `GET` | `/assets/geojson/banjarnegara-kecamatan.geojson` | `application/geo+json` | Batas poligon 20 kecamatan |
| `GET` | `/assets/geojson/banjarnegara-desa.geojson` | `application/geo+json` | Batas poligon 278 desa |
| `GET` | `/assets/geojson/banjarnegara-data.js` | `application/javascript` | Bypass CORS bundle untuk protokol file:// |
