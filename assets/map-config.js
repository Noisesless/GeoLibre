/**
 * assets/map-config.js
 * Konfigurasi Standar Peta 2D & Spasial Kabupaten Banjarnegara
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
      satelite: {
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

    // Palet Warna Wilayah Tematik
    colors: [
      "#38bdf8", "#34d399", "#fbbf24", "#f87171", "#a78bfa",
      "#f472b6", "#2dd4bf", "#fb923c", "#818cf8", "#4ade80",
      "#e879f9", "#60a5fa", "#facc15", "#22d3ee", "#c084fc",
      "#a3e635", "#f43f5e", "#0ea5e9", "#10b981", "#eab308"
    ],

    // Setup Layer Kecamatan & Desa pada MapLibre Instance
    setupLayers: function (map, geojsonData, options) {
      options = options || {};
      const desaColor = options.desaColor || "#0284c7";
      const kecBorderColor = options.kecBorderColor || "#1e293b";

      // 1. Tambah / Perbarui Sumber Data GeoJSON
      if (!map.getSource("banjarnegara-desa-source") && geojsonData.desa) {
        map.addSource("banjarnegara-desa-source", {
          type: "geojson",
          data: geojsonData.desa,
        });
      }

      if (!map.getSource("banjarnegara-kec-source") && geojsonData.kecamatan) {
        map.addSource("banjarnegara-kec-source", {
          type: "geojson",
          data: geojsonData.kecamatan,
        });
      }

      // 2. Layer Desa (Poligon Fill & Garis Batas)
      if (map.getSource("banjarnegara-desa-source")) {
        if (!map.getLayer("banjarnegara-desa-fill")) {
          map.addLayer({
            id: "banjarnegara-desa-fill",
            type: "fill",
            source: "banjarnegara-desa-source",
            paint: {
              "fill-color": [
                "coalesce",
                ["get", "_color"],
                desaColor
              ],
              "fill-opacity": [
                "case",
                ["boolean", ["feature-state", "hover"], false],
                0.75,
                0.35
              ],
            },
          });
        }

        if (!map.getLayer("banjarnegara-desa-line")) {
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
      }

      // 3. Layer Kecamatan (Garis Batas Tegas & Label Simbol)
      if (map.getSource("banjarnegara-kec-source")) {
        if (!map.getLayer("banjarnegara-kec-line")) {
          map.addLayer({
            id: "banjarnegara-kec-line",
            type: "line",
            source: "banjarnegara-kec-source",
            paint: {
              "line-color": kecBorderColor,
              "line-width": 2.2,
              "line-dasharray": [3, 1.5],
            },
          });
        }
      }
    },
  };

  return BANJARNEGARA_CONFIG;
});
