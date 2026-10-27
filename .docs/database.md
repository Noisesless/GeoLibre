# Skema Data Spasial & Geodatabase — GeoLibre Map Starter Kit

## 1. Katalog Entitas Spasial (Spatial Datasets)
Proyek ini mengadopsi struktur *Flat Geodatabase* berbasis GeoJSON RFC 7946 yang dioptimalkan dengan presisi koordinat 6 desimal (resolusi ~0.11 meter):

| Nama Dataset | Format | Path Berkas | Jumlah Fitur | Ukuran |
|---|---|---|---|---|
| **Batas Kecamatan** | GeoJSON Polygon | `assets/geojson/banjarnegara-kecamatan.geojson` | 20 Fitur | 817 KB |
| **Batas Desa/Kelurahan** | GeoJSON Polygon | `assets/geojson/banjarnegara-desa.geojson` | 278 Fitur | 2.63 MB |
| **Kompilasi Data Instan** | JavaScript UMD | `assets/geojson/banjarnegara-data.js` | 20 Kec + 278 Desa | 3.48 MB |
| **Kamus Metadata SSOT** | JSON Schema | `assets/geojson/metadata.json` | - | 2.4 KB |

---

## 2. Struktur Skema Atribut (Attributes Schema DDL)

### A. Tabel/Feature Atribut: Kecamatan (`banjarnegara-kecamatan.geojson`)
```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "title": "KecamatanFeature",
  "type": "object",
  "properties": {
    "type": { "type": "string", "enum": ["Feature"] },
    "geometry": {
      "type": "object",
      "properties": {
        "type": { "type": "string", "enum": ["Polygon", "MultiPolygon"] },
        "coordinates": { "type": "array" }
      }
    },
    "properties": {
      "type": "object",
      "properties": {
        "Kecamatan": { "type": "string", "description": "Nama Kecamatan (uppercase)" },
        "Name": { "type": "string", "description": "Alias Nama Kecamatan" }
      },
      "required": ["Kecamatan"]
    }
  }
}
```

### B. Tabel/Feature Atribut: Desa (`banjarnegara-desa.geojson`)
```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "title": "DesaFeature",
  "type": "object",
  "properties": {
    "type": { "type": "string", "enum": ["Feature"] },
    "geometry": {
      "type": "object",
      "properties": {
        "type": { "type": "string", "enum": ["Polygon", "MultiPolygon"] },
        "coordinates": { "type": "array" }
      }
    },
    "properties": {
      "type": "object",
      "properties": {
        "OBJECTID": { "type": "integer", "description": "Primary Key unik fitur" },
        "Nama_Desa_": { "type": "string", "description": "Nama Desa atau Kelurahan" },
        "Kecamatan": { "type": "string", "description": "Kecamatan pengampu" },
        "Kabupaten": { "type": "string", "description": "Kabupaten (Banjarnegara)" }
      },
      "required": ["OBJECTID", "Nama_Desa_", "Kecamatan"]
    }
  }
}
```

---

## 3. Indeksasi Spasial & Batas Geografis (Spatial Bounding Box)
- **Koordinat Referensi:** WGS 84 / EPSG:4326 (Lon/Lat)
- **Min Longitude (Bujur Barat):** `109.361515`
- **Min Latitude (Lintang Selatan):** `-7.540894`
- **Max Longitude (Bujur Timur):** `109.917709`
- **Max Latitude (Lintang Utara):** `-7.170981`
- **Pusat Geometri (Centroid):** `[109.639612, -7.355938]`
