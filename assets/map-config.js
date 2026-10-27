/**
 * assets/map-config.js
 * Modul Konfigurasi Baku Peta 2D & Spasial Kabupaten Banjarnegara
 * Kompatibel dengan MapLibre GL JS v6+ (Vanilla JS & Modern Framework)
 */

(function (root, factory) {
  if (typeof define === "function" && define.amd) {
    define([], factory);
  } else if (typeof module === "object" && module.exports) {
    module.exports = factory();
  } else {
    root.BANJARNEGARA_MAP = factory();
  }
})(typeof self !== "undefined" ? self : this, function () {
  "use strict";

  const BANJARNEGARA_CONFIG = {
    // Koordinat Pusat Geografis Kabupaten Banjarnegara
    center: [109.639612, -7.355938],
    zoom: 10.6,
    minZoom: 9,
    maxZoom: 18,

    // Bounding Box Kabupaten Banjarnegara [ [minLng, minLat], [maxLng, maxLat] ]
    bounds: [
      [109.361515, -7.540894], // Barat Daya (Southwest)
      [109.917709, -7.170981], // Timur Laut (Northeast)
    ],

    // Path Berkas Baku
    paths: {
      kecamatan: "../assets/geojson/banjarnegara-kecamatan.geojson",
      desa: "../assets/geojson/banjarnegara-desa.geojson",
      metadata: "../assets/geojson/metadata.json",
      worker: "../assets/maplibre-gl-worker.mjs",
    },

    // Daftar 20 Kecamatan Resmi
    kecamatanList: [
      "Banjarmangu", "Banjarnegara", "Batur", "Bawang",
      "Kalibening", "Karangkobar", "Madukara", "Mandiraja",
      "Pagedongan", "Pagentan", "Pandanarum", "Pejawaran",
      "Punggelan", "Purwanegara", "Purwarejaklampok", "Rakit",
      "Sigaluh", "Susukan", "Wanadadi", "Wanayasa"
    ],

    // Provider Layer Basemap Gratis & Legal (Tanpa API Key)
    styles: {
      liberty: "https://tiles.openfreemap.org/styles/liberty",
      positron: "https://tiles.openfreemap.org/styles/positron",
      bright: "https://tiles.openfreemap.org/styles/bright",
      dark: "https://tiles.openfreemap.org/styles/dark",
      satelit: {
        version: 8,
        sources: {
          "esri-satellite": {
            type: "raster",
            tiles: [
              "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
            ],
            tileSize: 256,
            maxzoom: 19,
            attribution: "Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community",
          },
        },
        layers: [
          {
            id: "esri-satellite-layer",
            type: "raster",
            source: "esri-satellite",
            minzoom: 0,
            maxzoom: 19,
          },
        ],
      },
    },

    // Palet Warna Wilayah Tematik Harmonis
    colors: [
      "#0284c7", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6",
      "#ec4899", "#14b8a6", "#f97316", "#6366f1", "#84cc16",
      "#06b6d4", "#d946ef", "#eab308", "#3b82f6", "#22c55e",
      "#a855f7", "#fb7185", "#38bdf8", "#34d399", "#fb923c"
    ],

    // Setup Layer Kecamatan & Desa pada MapLibre Instance
    setupLayers: function (map, geojsonData, options) {
      options = options || {};
      const desaColor = options.desaColor || "#0284c7";
      const kecBorderColor = options.kecBorderColor || "#0284c7";

      if (!map.getSource("banjarnegara-desa-source") && geojsonData.desa) {
        map.addSource("banjarnegara-desa-source", {
          type: "geojson",
          data: geojsonData.desa,
        });

        map.addLayer({
          id: "banjarnegara-desa-fill",
          type: "fill",
          source: "banjarnegara-desa-source",
          paint: {
            "fill-color": ["coalesce", ["get", "_color"], desaColor],
            "fill-opacity": [
              "case",
              ["boolean", ["feature-state", "hover"], false],
              0.8,
              0.4
            ],
          },
        });

        map.addLayer({
          id: "banjarnegara-desa-line",
          type: "line",
          source: "banjarnegara-desa-source",
          paint: {
            "line-color": "#ffffff",
            "line-width": 0.8,
            "line-opacity": 0.6,
          },
        });
      }

      if (!map.getSource("banjarnegara-kec-source") && geojsonData.kecamatan) {
        map.addSource("banjarnegara-kec-source", {
          type: "geojson",
          data: geojsonData.kecamatan,
        });

        map.addLayer({
          id: "banjarnegara-kec-line",
          type: "line",
          source: "banjarnegara-kec-source",
          paint: {
            "line-color": kecBorderColor,
            "line-width": 2.2,
            "line-dasharray": [3, 2],
          },
        });
      }
    },

    // Helper Pencarian Nama Desa / Kecamatan
    searchFeatures: function (query, desaFeatures, limit) {
      limit = limit || 8;
      if (!query || !query.trim() || !desaFeatures) return [];
      const q = query.toLowerCase().trim();
      const results = [];

      for (let i = 0; i < desaFeatures.length; i++) {
        const feat = desaFeatures[i];
        const props = feat.properties || {};
        const namaDesa = (props.Nama_Desa_ || props.Name || "").toLowerCase();
        const kec = (props.Kecamatan || "").toLowerCase();

        if (namaDesa.includes(q) || kec.includes(q)) {
          results.push(feat);
          if (results.length >= limit) break;
        }
      }
      return results;
    }
  };

  return BANJARNEGARA_CONFIG;
});
