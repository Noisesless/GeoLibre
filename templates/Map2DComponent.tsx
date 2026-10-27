"use client";

import { useEffect, useRef, useState } from "react";
import * as maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";

// Pastikan file 'maplibre-gl-worker.mjs' diletakkan di folder public/ proyek Anda
if (typeof window !== "undefined") {
  maplibregl.setWorkerUrl("/maplibre-gl-worker.mjs");
}

export type MapStyleKey = "liberty" | "positron" | "bright" | "dark" | "satelit";

interface Map2DProps {
  initialCenter?: [number, number]; // [lng, lat]
  initialZoom?: number;
  desaGeojsonUrl?: string; // URL ke file geojson desa
  kecamatanGeojsonUrl?: string; // URL ke file geojson kecamatan
  geojsonUrl?: string; // URL legacy / fallback
  onFeatureClick?: (properties: Record<string, unknown>) => void;
  className?: string;
}

const STYLES: Record<MapStyleKey, string | maplibregl.StyleSpecification> = {
  liberty: "https://tiles.openfreemap.org/styles/liberty",
  positron: "https://tiles.openfreemap.org/styles/positron",
  bright: "https://tiles.openfreemap.org/styles/bright",
  dark: {
    version: 8,
    sources: {
      "carto-dark": {
        type: "raster",
        tiles: [
          "https://a.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}@2x.png",
          "https://b.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}@2x.png",
          "https://c.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}@2x.png",
        ],
        tileSize: 256,
        maxzoom: 19,
      },
    },
    layers: [
      {
        id: "carto-dark-layer",
        type: "raster",
        source: "carto-dark",
      },
    ],
  } as unknown as maplibregl.StyleSpecification,
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
      },
    },
    layers: [
      {
        id: "esri-satellite-layer",
        type: "raster",
        source: "esri-satellite",
      },
    ],
  } as unknown as maplibregl.StyleSpecification,
};

export default function Map2DComponent({
  initialCenter = [109.639612, -7.355938],
  initialZoom = 10.6,
  desaGeojsonUrl = "/assets/geojson/banjarnegara-desa.geojson",
  kecamatanGeojsonUrl = "/assets/geojson/banjarnegara-kecamatan.geojson",
  geojsonUrl,
  onFeatureClick,
  className = "w-full h-[550px]",
}: Map2DProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<maplibregl.Map | null>(null);
  const [activeStyle, setActiveStyle] = useState<MapStyleKey>("liberty");

  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;

    maplibregl.setWorkerUrl("/maplibre-gl-worker.mjs");

    const map = new maplibregl.Map({
      container: containerRef.current,
      style: STYLES.liberty,
      center: initialCenter,
      zoom: initialZoom,
      attributionControl: false,
    });

    mapRef.current = map;
    map.addControl(new maplibregl.NavigationControl(), "top-left");

    const renderGeoJson = async () => {
      // 1. Render Batas Kecamatan
      if (kecamatanGeojsonUrl && !map.getSource("banjarnegara-kec-source")) {
        try {
          const resKec = await fetch(kecamatanGeojsonUrl);
          const dataKec = await resKec.json();
          map.addSource("banjarnegara-kec-source", { type: "geojson", data: dataKec });
          map.addLayer({
            id: "banjarnegara-kec-line",
            type: "line",
            source: "banjarnegara-kec-source",
            paint: {
              "line-color": "#0284c7",
              "line-width": 2.2,
              "line-dasharray": [3, 2],
            },
          });
        } catch (err) {
          console.warn("Gagal memuat batas kecamatan:", err);
        }
      }

      // 2. Render Poligon Desa
      const targetDesaUrl = desaGeojsonUrl || geojsonUrl;
      if (targetDesaUrl && !map.getSource("banjarnegara-desa-source")) {
        try {
          const resDesa = await fetch(targetDesaUrl);
          const dataDesa = await resDesa.json();
          map.addSource("banjarnegara-desa-source", { type: "geojson", data: dataDesa });
          map.addLayer({
            id: "banjarnegara-desa-fill",
            type: "fill",
            source: "banjarnegara-desa-source",
            paint: {
              "fill-color": "#0284c7",
              "fill-opacity": 0.38,
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

          if (onFeatureClick) {
            map.on("click", "banjarnegara-desa-fill", (e) => {
              const feat = e.features?.[0];
              if (feat?.properties) onFeatureClick(feat.properties);
            });
          }
        } catch (err) {
          console.warn("Gagal memuat batas desa:", err);
        }
      }
    };

    map.on("styledata", renderGeoJson);

    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, [initialCenter, initialZoom, desaGeojsonUrl, kecamatanGeojsonUrl, geojsonUrl, onFeatureClick]);

  const switchStyle = (key: MapStyleKey) => {
    setActiveStyle(key);
    mapRef.current?.setStyle(STYLES[key]);
  };

  return (
    <div className={`relative rounded-xl overflow-hidden shadow-md border border-slate-200 ${className}`}>
      <div ref={containerRef} className="w-full h-full" />
      <div className="absolute top-3 right-3 z-10 flex gap-1 p-1 bg-white/90 backdrop-blur rounded-lg shadow border border-slate-200">
        {(["liberty", "positron", "bright", "dark", "satelit"] as MapStyleKey[]).map((key) => (
          <button
            key={key}
            onClick={() => switchStyle(key)}
            className={`px-2.5 py-1 text-xs font-semibold rounded-md transition ${
              activeStyle === key
                ? "bg-sky-600 text-white"
                : "text-slate-700 hover:bg-slate-100"
            }`}
          >
            {key.toUpperCase()}
          </button>
        ))}
      </div>
    </div>
  );
}
