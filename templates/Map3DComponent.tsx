"use client";

import { useEffect, useRef, useState } from "react";
import * as maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";

// Pastikan file 'maplibre-gl-worker.mjs' diletakkan di folder public/ proyek Anda
if (typeof window !== "undefined") {
  maplibregl.setWorkerUrl("/maplibre-gl-worker.mjs");
}

interface Map3DProps {
  initialCenter?: [number, number]; // [lng, lat]
  initialZoom?: number;
  initialPitch?: number; // 0 (datar) s/d 85 (miring 3D)
  initialBearing?: number; // Rotasi derajat
  exaggeration?: number; // Pengali ketinggian gunung (default: 1.5)
  showTerrain?: boolean;
  className?: string;
}

export default function Map3DComponent({
  initialCenter = [109.685, -7.339],
  initialZoom = 13.0,
  initialPitch = 65,
  initialBearing = -20,
  exaggeration = 1.8,
  showTerrain = true,
  className = "w-full h-[600px]",
}: Map3DProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<maplibregl.Map | null>(null);
  const [is3D, setIs3D] = useState(showTerrain);
  const [isRotating, setIsRotating] = useState(false);
  const animFrameRef = useRef<number | null>(null);

  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;

    maplibregl.setWorkerUrl("/maplibre-gl-worker.mjs");

    const map = new maplibregl.Map({
      container: containerRef.current,
      style: "https://tiles.openfreemap.org/styles/liberty",
      center: initialCenter,
      zoom: initialZoom,
      pitch: initialPitch,
      bearing: initialBearing,
      maxPitch: 85,
      attributionControl: false,
    });

    mapRef.current = map;
    map.addControl(new maplibregl.NavigationControl({ visualizePitch: true }), "top-left");

    map.on("load", () => {
      // 1. Digital Elevation Model (DEM) Topografi 3D
      map.addSource("terrain-dem", {
        type: "raster-dem",
        tiles: ["https://s3.amazonaws.com/elevation-tiles-prod/terrarium/{z}/{x}/{y}.png"],
        tileSize: 256,
        encoding: "terrarium",
        maxzoom: 15,
      });

      if (showTerrain) {
        map.setTerrain({
          source: "terrain-dem",
          exaggeration,
        });
      }

      // 2. Efek Atmosfer Langit 3D
      map.setSky({
        "sky-color": "#1e3a8a",
        "horizon-color": "#bae6fd",
        "fog-color": "#cbd5e1",
        "fog-ground-blend": 0.4,
      });
    });

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      map.remove();
      mapRef.current = null;
    };
  }, [initialCenter, initialZoom, initialPitch, initialBearing, exaggeration, showTerrain]);

  const toggle3DMode = () => {
    const map = mapRef.current;
    if (!map) return;
    const nextState = !is3D;
    setIs3D(nextState);

    if (nextState) {
      map.easeTo({ pitch: initialPitch, bearing: initialBearing, duration: 1000 });
      if (map.getSource("terrain-dem")) {
        map.setTerrain({ source: "terrain-dem", exaggeration });
      }
    } else {
      map.easeTo({ pitch: 0, bearing: 0, duration: 1000 });
      map.setTerrain(null);
    }
  };

  const toggleRotate = () => {
    const map = mapRef.current;
    if (!map) return;
    const nextRotating = !isRotating;
    setIsRotating(nextRotating);

    if (nextRotating) {
      const rotate = () => {
        map.rotateTo((map.getBearing() + 0.2) % 360, { duration: 0 });
        animFrameRef.current = requestAnimationFrame(rotate);
      };
      rotate();
    } else {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    }
  };

  return (
    <div className={`relative rounded-xl overflow-hidden shadow-lg border border-slate-700 bg-slate-900 ${className}`}>
      <div ref={containerRef} className="w-full h-full" />
      <div className="absolute top-3 right-3 z-10 flex flex-col gap-2 p-2 bg-slate-900/90 backdrop-blur rounded-lg border border-slate-700 text-xs shadow-md">
        <button
          onClick={toggle3DMode}
          className={`px-3 py-1.5 font-bold rounded transition ${
            is3D ? "bg-sky-600 text-white" : "bg-slate-800 text-slate-300 hover:bg-slate-700"
          }`}
        >
          {is3D ? "Mode 3D (Aktif)" : "Mode 2D (Datar)"}
        </button>
        <button
          onClick={toggleRotate}
          className={`px-3 py-1.5 font-bold rounded transition ${
            isRotating ? "bg-rose-600 text-white" : "bg-indigo-600 text-white hover:bg-indigo-500"
          }`}
        >
          {isRotating ? "Hentikan Rotasi" : "Rotasi 360°"}
        </button>
      </div>
    </div>
  );
}
