# APP-CONTEXT (Vibes Coding Workflow Snapshot)

[APP]
name = "GeoLibre Map Starter Kit"
slug = "geolibre-starter-kit"
stack = "Vanilla HTML/JS + React/Next.js TypeScript + MapLibre GL JS v6+"
upstream = "https://github.com/opengeos/GeoLibre"
repo = "https://github.com/Noisesless/GeoLibre"
port = 8080

[STATE]
phase = "Standardized Banjarnegara Spatial Assets & 5 Basemap Styles Ready"
status = "READY"
issues = 0

[PALETTE]
mode = "dark"
background = "#090d16"
surface = "#0f172a"
text_main = "#f8fafc"
text_sub = "#94a3b8"
accent_1 = "#38bdf8"
accent_2 = "#0284c7"

[DATASETS]
ssot_dir = "assets/geojson/"
metadata = "assets/geojson/metadata.json"
kecamatan = "assets/geojson/banjarnegara-kecamatan.geojson (20 Kecamatan, 817 KB)"
desa = "assets/geojson/banjarnegara-desa.geojson (278 Desa, 2.63 MB)"
bounds = "[[109.361515, -7.540894], [109.917709, -7.170981]]"
center = "[109.639612, -7.355938]"

[PAGES]
assets/map-config.js = "Standard Map 2D config (5 basemaps, searchFeatures, bounds)"
examples/01-vanilla-2d.html = "2D Map Banjarnegara (5 Basemap, Autocomplete Search, 3D Tilt)"
examples/02-vanilla-3d-terrain.html = "3D DEM Mountain Terrain & Atmospheric Fog"
examples/03-vanilla-3d-buildings.html = "3D Buildings Extrusion via OpenMapTiles"
templates/Map2DComponent.tsx = "React/Next.js 2D Component with 5 Basemap Styles & Dual GeoJSON"
templates/Map3DComponent.tsx = "React/Next.js 3D Component with Terrain DEM"

[NEXT]
task = "Ready for feature addition or production web deployment"
