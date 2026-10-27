# APP-CONTEXT (Vibes Coding Workflow Snapshot)

[APP]
name = "GeoLibre Map Starter Kit"
slug = "geolibre-starter-kit"
stack = "Vanilla HTML/JS + React/Next.js TypeScript + MapLibre GL JS v6+"
upstream = "https://github.com/opengeos/GeoLibre"
repo = "https://github.com/Noisesless/GeoLibre"
port = 8080

[STATE]
phase = "Banjarnegara 2D Asset Ready & Multi-Layer Setup"
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
banjarnegara_kecamatan = "20 Kecamatan (817 KB)"
banjarnegara_desa = "278 Desa/Kelurahan (2.63 MB)"
bounds = "[[109.361515, -7.540894], [109.917709, -7.170981]]"
center = "[109.639612, -7.355938]"

[PAGES]
assets/map-config.js = "Standard Map 2D config & helper for Banjarnegara"
examples/01-vanilla-2d.html = "2D Map Banjarnegara (Liberty, Positron, Satelit, Filter 20 Kecamatan)"
examples/02-vanilla-3d-terrain.html = "3D DEM Mountain Terrain & Atmospheric Fog"
examples/03-vanilla-3d-buildings.html = "3D Buildings Extrusion via OpenMapTiles"
templates/Map2DComponent.tsx = "React/Next.js 2D Component with Dual GeoJSON & 3 Basemap Styles"
templates/Map3DComponent.tsx = "React/Next.js 3D Component with Terrain DEM"

[NEXT]
task = "Commit Banjarnegara 2D map assets to GitHub main"
