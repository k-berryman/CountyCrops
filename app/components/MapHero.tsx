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
      style: "mapbox://clark/mapbox/dark-v10",
      center: [-75.78, 37.60],
      zoom: 9.5,
      interactive: false,
    });

    map.on("load", () => {
      // Simple vertical green line (Route 13 approximation)
      map.addLayer({
        id: "route-line",
        type: "line",
        source: {
          type: "geojson",
          data: {
            type: "Feature",
            properties: {},
            geometry: {
              type: "LineString",
              coordinates: [
                [-75.78, 37.85], // Top of screen
                [-75.78, 37.15], // Bottom of screen
              ],
            },
          },
        },
        layout: {},
        paint: {
          "line-color": "#00e676",
          "line-width": 3,
          "line-opacity": 0.8,
        },
      });

      // Animated green dot traveling top to bottom
      let posY = 37.85;
      const speed = 0.004; // Adjust for desired speed

      const animateDot = () => {
        posY -= speed;
        if (posY < 37.15) posY = 37.85; // Loop back to top

        // Remove old dot
        if ((window as any).currentDot) {
          (window as any).currentDot.remove();
        }

        // Create new dot
        const dotEl = document.createElement("div");
        dotEl.style.width = "10px";
        dotEl.style.height = "10px";
        dotEl.style.backgroundColor = "#00e676";
        dotEl.style.borderRadius = "50%";
        dotEl.style.boxShadow = "0 0 10px #00e676";

        (window as any).currentDot = new mapboxgl.Marker(dotEl).setLngLat([-75.78, posY]).addTo(map);

        requestAnimationFrame(animateDot);
      };

      setTimeout(animateDot, 1000);
    });

    return () => {
      if ((window as any).currentDot) {
        (window as any).currentDot.remove();
      }
      map.remove();
    };
  }, []);

  return (
    <div
      ref={mapContainer}
      className="absolute inset-0 z-0 overflow-hidden translate-y-[-8px]"
      style={{ opacity: 0.4 }}
    />
  );
}

declare global {
  interface Window {
    currentDot?: mapboxgl.Marker;
  }
}