# APP-CONTEXT (Vibes Coding Workflow Snapshot)

[APP]
name = "GeoLibre Map Starter Kit"
slug = "geolibre-starter-kit"
stack = "Vanilla HTML/JS + React/Next.js TypeScript + MapLibre GL JS v6+"
upstream = "https://github.com/opengeos/GeoLibre"
repo = "https://github.com/Noisesless/GeoLibre"
port = 8080

[STATE]
phase = "Full Brainvibes Standard: 9 Docs Synced, OpenFreeMap Dark & Persistent Boundaries Ready"
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
data_bundle = "assets/geojson/banjarnegara-data.js (Bypass CORS, 3.48 MB)"
bounds = "[[109.361515, -7.540894], [109.917709, -7.170981]]"
center = "[109.639612, -7.355938]"

[DOCS]
architecture = ".docs/architecture.md"
api_spec = ".docs/api-spec.md"
database = ".docs/database.md"
quality_review = ".docs/quality_review.md"
routes = ".docs/routes.md"
dependency_graph = ".docs/dependency-graph.md"
deployment = ".docs/deployment.md"
issues = ".docs/issues.md"
design_system = ".docs/design-system.md"

[PAGES]
assets/map-config.js = "Standard Map 2D config (5 basemaps incl. OpenFreeMap Dark, searchFeatures, bounds)"
examples/01-vanilla-2d.html = "2D Map Banjarnegara (5 Basemap, Persistent GeoJSON via idle hook, Autocomplete, 3D Tilt)"
examples/02-vanilla-3d-terrain.html = "3D DEM Mountain Terrain & Atmospheric Fog"
examples/03-vanilla-3d-buildings.html = "3D Buildings Extrusion with underlying Kecamatan & Desa boundaries, Overview & Toggle Controls"
templates/Map2DComponent.tsx = "React/Next.js 2D Component with 5 Basemap Styles, Persistent GeoJSON & Dual Data Layers"
templates/Map3DComponent.tsx = "React/Next.js 3D Component with Terrain DEM"

[NEXT]
task = "Pengecekan dan validasi batas bagian timur Kecamatan Sigaluh vs dataset GeoJSON pembanding (todo.md)"
