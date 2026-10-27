# Spesifikasi API & Antarmuka Data — GeoLibre Map Starter Kit

## 1. Layanan Tile Eksternal (External Tile APIs)

### A. OpenFreeMap Vector Basemaps
Semua endpoint menggunakan skema gaya MapLibre v8 berbasis vector tiles tanpa batasan API key:

| Style Key | URL Endpoint | Protokol | Deskripsi |
|---|---|---|---|
| `liberty` | `https://tiles.openfreemap.org/styles/liberty` | HTTPS Vector JSON | Gaya kartografi modern lengkap dengan POI |
| `positron` | `https://tiles.openfreemap.org/styles/positron` | HTTPS Vector JSON | Gaya monokrom terang minimalis untuk tematik |
| `bright` | `https://tiles.openfreemap.org/styles/bright` | HTTPS Vector JSON | Gaya terang kontras tinggi |
| `dark` | `https://tiles.openfreemap.org/styles/dark` | HTTPS Vector JSON | Gaya gelap vektor (bebas API key, pengganti Carto) |

### B. Esri Satellite Imagery
- **Format:** Raster XYZ Tile
- **Endpoint:** `https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}`
- **TileSize:** 256px
- **MaxZoom:** 19

### C. AWS Terrarium Digital Elevation Model (DEM)
- **Format:** Raster DEM (Terrarium RGB Encoded)
- **Endpoint:** `https://s3.amazonaws.com/elevation-tiles-prod/terrarium/{z}/{x}/{y}.png`
- **TileSize:** 256px
- **Formula Elevasi:** `(Red * 256 + Green + Blue / 256) - 32768`

---

## 2. Antarmuka Data Lokal (Internal Data Interfaces)

### A. Modul Global `window.BANJARNEGARA_MAP_CONFIG`
Tersedia via `assets/map-config.js`:
- `CONFIG.bounds`: `[[109.361515, -7.540894], [109.917709, -7.170981]]`
- `CONFIG.center`: `[109.639612, -7.355938]`
- `CONFIG.styles`: Objek kunci gaya peta (liberty, positron, bright, dark, satelit)
- `CONFIG.searchFeatures(keyword, maxResults)`: Fungsi pencarian desa/kecamatan dengan filter case-insensitive
- `CONFIG.fitBanjarnegara(map, options)`: Fungsi auto-fit kamera ke seluruh batas kabupaten

### B. Properti Komponen React (`templates/Map2DComponent.tsx`)
```typescript
export interface Map2DComponentProps {
  initialCenter?: [number, number];
  initialZoom?: number;
  initialStyle?: "liberty" | "positron" | "bright" | "dark" | "satelit";
  desaGeojsonUrl?: string;
  kecamatanGeojsonUrl?: string;
  className?: string;
  onFeatureClick?: (properties: Record<string, unknown>) => void;
}
```

### C. Properti Komponen React (`templates/Map3DComponent.tsx`)
```typescript
export interface Map3DComponentProps {
  initialCenter?: [number, number];
  initialZoom?: number;
  initialPitch?: number;
  initialBearing?: number;
  exaggeration?: number;
  showTerrain?: boolean;
  className?: string;
}
```
