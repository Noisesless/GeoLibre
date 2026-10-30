"use client";

import { useEffect, useRef, useState } from "react";
import * as maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { Layers, ChevronDown, Check } from "lucide-react";

// Pastikan file 'maplibre-gl-worker.js' diletakkan di folder public/ proyek Anda (.js kompatibel Nginx MIME type)
if (typeof window !== "undefined") {
  maplibregl.setWorkerUrl("/maplibre-gl-worker.js");
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
  } as unknown as maplibregl.StyleSpecification,
};

const LAYER_OPTIONS = [
  { key: "liberty" as MapStyleKey, label: "Liberty (Lengkap)", badge: "OFM" },
  { key: "positron" as MapStyleKey, label: "Positron (Terang)", badge: "Minimal" },
  { key: "bright" as MapStyleKey, label: "Bright (Kontras)", badge: "Terang" },
  { key: "dark" as MapStyleKey, label: "Dark (Mode Gelap)", badge: "OFM Dark" },
  { key: "satelit" as MapStyleKey, label: "Citra Satelit", badge: "Esri" },
];

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
  const layerMenuRef = useRef<HTMLDivElement | null>(null);
  const [activeStyle, setActiveStyle] = useState<MapStyleKey>("liberty");
  const [isLayerMenuOpen, setIsLayerMenuOpen] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (layerMenuRef.current && !layerMenuRef.current.contains(event.target as Node)) {
        setIsLayerMenuOpen(false);
      }
    };
    if (isLayerMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isLayerMenuOpen]);

  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;

    maplibregl.setWorkerUrl("/maplibre-gl-worker.js");

    const map = new maplibregl.Map({
      container: containerRef.current,
      style: STYLES[activeStyle],
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

    map.on("load", renderGeoJson);
    map.on("idle", renderGeoJson);

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

      {/* 1-Button Layer Switcher Menu dengan Checklist (Ringkas & Rapi) */}
      <div ref={layerMenuRef} className="absolute top-3 right-3 z-10">
        <button
          type="button"
          onClick={() => setIsLayerMenuOpen((prev) => !prev)}
          className="flex items-center gap-2 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-white/95 backdrop-blur-md rounded-lg shadow border border-slate-200 hover:bg-slate-50 transition cursor-pointer"
        >
          <Layers size={14} className="text-blue-600 shrink-0" />
          <span>Lapisan Peta</span>
          <ChevronDown
            size={13}
            className={`text-slate-400 transition-transform duration-200 ${
              isLayerMenuOpen ? "rotate-180" : ""
            }`}
          />
        </button>

        {isLayerMenuOpen && (
          <div className="absolute top-10 right-0 w-60 p-2 bg-white/95 backdrop-blur-md rounded-xl shadow-xl border border-slate-200 flex flex-col gap-1 z-20">
            <div className="px-2 py-1 text-[10px] font-bold tracking-wider uppercase text-slate-400 border-b border-slate-100 mb-1">
              Pilih Lapisan Peta
            </div>

            {LAYER_OPTIONS.map((opt) => {
              const isSelected = activeStyle === opt.key;
              return (
                <button
                  key={opt.key}
                  type="button"
                  onClick={() => switchStyle(opt.key)}
                  className={`flex items-center justify-between w-full px-2.5 py-2 text-xs rounded-lg transition-all text-left cursor-pointer ${
                    isSelected
                      ? "bg-blue-50 text-blue-700 font-bold border border-blue-200 shadow-xs"
                      : "text-slate-700 hover:bg-slate-100 border border-transparent"
                  }`}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <span
                      className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ${
                        isSelected
                          ? "border-blue-600 bg-blue-600 text-white"
                          : "border-slate-300"
                      }`}
                    >
                      {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-white" />}
                    </span>
                    <span className="truncate">{opt.label}</span>
                  </div>

                  <div className="flex items-center gap-1.5 shrink-0 ml-1">
                    <span className="text-[10px] font-medium text-slate-400">
                      {opt.badge}
                    </span>
                    {isSelected && <Check size={13} className="text-blue-600" />}
                  </div>
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
