"use client";
import { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || "";

export default function MapHero() {
  const mapContainer = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mapContainer.current) return;

    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/dark-v10",
      center: [-75.78, 37.58],
      zoom: 9,
      interactive: false,
    });

    // Route 13 path from north (Mappsville area) to south (Cheriton area)
    const routePoints: [number, number][] = [
      [-75.74, 37.76],
      [-75.75, 37.72],
      [-75.77, 37.68],
      [-75.78, 37.65],
      [-75.80, 37.60],
      [-75.82, 37.55],
      [-75.83, 37.50],
      [-75.82, 37.45],
      [-75.82, 37.40],
      [-75.82, 37.35],
      [-75.82, 37.29],
    ];

    map.on("load", () => {
      // Draw static background line (faint)
      map.addLayer({
        id: "route-base",
        type: "line",
        source: {
          type: "geojson",
          data: {
            type: "Feature",
            properties: {},
            geometry: {
              type: "LineString",
              coordinates: routePoints,
            },
          },
        },
        layout: {},
        paint: {
          "line-color": "#ffffff",
          "line-width": 1,
          "line-opacity": 0.15,
        },
      });

      // Animated delivery dot
      let index = 0;
      const dotSpeed = 150; // milliseconds between steps

      const animateDot = () => {
        const point = routePoints[index];

        // Remove old dot if exists
        if (window.mapDotMarker) {
          window.mapDotMarker.remove();
        }

        // Create new blinking dot
        const dotEl = document.createElement("div");
        dotEl.style.width = "8px";
        dotEl.style.height = "8px";
        dotEl.style.backgroundColor = "#00e676";
        dotEl.style.borderRadius = "50%";
        dotEl.style.boxShadow = "0 0 12px #00e676";
        dotEl.style.animation = "blink 1s ease-in-out infinite";

        window.mapDotMarker = new mapboxgl.Marker(dotEl).setLngLat(point).addTo(map);

        // Move to next point
        index = (index + 1) % routePoints.length;

        setTimeout(animateDot, dotSpeed);
      };

      setTimeout(animateDot, 800);
    });

    return () => {
      if (window.mapDotMarker) {
        window.mapDotMarker.remove();
      }
      map.remove();
    };
  }, []);

  return (
    <>
      <style jsx global>{`
        @keyframes blink {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 1; }
        }
      `}</style>
      <div
        ref={mapContainer}
        className="absolute inset-0 z-0 overflow-hidden -translate-y-2"
        style={{ opacity: 0.4 }}
      />
    </>
  );
}

// Declare marker globally for cleanup
declare global {
  interface Window {
    mapDotMarker?: mapboxgl.Marker;
  }
}