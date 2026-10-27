"use client";

import { useEffect, useRef, useState } from "react";
import * as maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";

// Pastikan file 'maplibre-gl-worker.mjs' diletakkan di folder public/ proyek Anda
if (typeof window !== "undefined") {
  maplibregl.setWorkerUrl("/maplibre-gl-worker.mjs");
}

export type MapStyleKey = "liberty" | "positron" | "satelit";

interface Map2DProps {
  initialCenter?: [number, number]; // [lng, lat]
  initialZoom?: number;
  geojsonUrl?: string; // URL ke file geojson batas wilayah
  onFeatureClick?: (properties: Record<string, unknown>) => void;
  className?: string;
}

const STYLES: Record<MapStyleKey, string | maplibregl.StyleSpecification> = {
  liberty: "https://tiles.openfreemap.org/styles/liberty",
  positron: "https://tiles.openfreemap.org/styles/positron",
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
  initialCenter = [109.685, -7.339],
  initialZoom = 12.5,
  geojsonUrl,
  onFeatureClick,
  className = "w-full h-[500px]",
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
      if (!geojsonUrl || map.getSource("custom-geojson-source")) return;
      try {
        const res = await fetch(geojsonUrl);
        const data = await res.json();

        map.addSource("custom-geojson-source", {
          type: "geojson",
          data,
        });

        map.addLayer({
          id: "custom-geojson-fill",
          type: "fill",
          source: "custom-geojson-source",
          paint: {
            "fill-color": "#0284c7",
            "fill-opacity": 0.45,
          },
        });

        map.addLayer({
          id: "custom-geojson-line",
          type: "line",
          source: "custom-geojson-source",
          paint: {
            "line-color": "#ffffff",
            "line-width": 2,
          },
        });

        if (onFeatureClick) {
          map.on("click", "custom-geojson-fill", (e) => {
            const feat = e.features?.[0];
            if (feat?.properties) onFeatureClick(feat.properties);
          });
        }
      } catch (err) {
        console.error("Gagal memuat GeoJSON di Map2D:", err);
      }
    };

    map.on("styledata", renderGeoJson);

    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, [initialCenter, initialZoom, geojsonUrl, onFeatureClick]);

  const switchStyle = (key: MapStyleKey) => {
    setActiveStyle(key);
    mapRef.current?.setStyle(STYLES[key]);
  };

  return (
    <div className={`relative rounded-xl overflow-hidden shadow-md border border-slate-200 ${className}`}>
      <div ref={containerRef} className="w-full h-full" />
      <div className="absolute top-3 right-3 z-10 flex gap-1 p-1 bg-white/90 backdrop-blur rounded-lg shadow border border-slate-200">
        {(["liberty", "positron", "satelit"] as MapStyleKey[]).map((key) => (
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
