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
      center: [-75.78, 37.60],
      zoom: 9.5,
      interactive: false,
    });

    // Route 13 waypoints from Accomac to Nassawadox
    const routeCoordinates: [number, number][] = [
      [-75.68, 37.72], // Accomac
      [-75.70, 37.70],
      [-75.75, 37.68],
      [-75.80, 37.65],
      [-75.85, 37.60],
      [-75.90, 37.55],
      [-75.94, 37.50],
      [-75.97, 37.45], // Nassawadox
    ];

    map.on("load", () => {
      // Glow layer (wide blur underneath)
      map.addLayer({
        id: "route-glow",
        type: "line",
        source: {
          type: "geojson",
          data: {
            type: "Feature",
            properties: {},
            geometry: {
              type: "LineString",
              coordinates: routeCoordinates,
            },
          },
        },
        layout: {},
        paint: {
          "line-color": "#00e676",
          "line-width": 12,
          "line-opacity": 0.3,
          "line-blur": 6,
        },
      });

      // Main line (sharp, on top)
      map.addLayer({
        id: "route-main",
        type: "line",
        source: {
          type: "geojson",
          data: {
            type: "Feature",
            properties: {},
            geometry: {
              type: "LineString",
              coordinates: routeCoordinates,
            },
          },
        },
        layout: {},
        paint: {
          "line-color": "#00e676",
          "line-width": 3,
          "line-opacity": 0.7,
        },
      });

      // Pin at Accomac (top)
      const pinAEl = document.createElement("div");
      pinAEl.style.width = "14px";
      pinAEl.style.height = "14px";
      pinAEl.style.backgroundColor = "#00e676";
      pinAEl.style.borderRadius = "50%";
      pinAEl.style.boxShadow = "0 0 12px #00e676";
      pinAEl.style.border = "2px solid white";
      new mapboxgl.Marker(pinAEl).setLngLat([-75.68, 37.72]).addTo(map);

      // Pin at Nassawadox (bottom)
      const pinBEl = document.createElement("div");
      pinBEl.style.width = "14px";
      pinBEl.style.height = "14px";
      pinBEl.style.backgroundColor = "#ffd54f";
      pinBEl.style.borderRadius = "50%";
      pinBEl.style.boxShadow = "0 0 12px #ffd54f";
      pinBEl.style.border = "2px solid white";
      new mapboxgl.Marker(pinBEl).setLngLat([-75.97, 37.45]).addTo(map);

      // Pulse animation: glow breathes in and out
      let pulseValue = 0.3;
      let increasing = true;

      const pulse = () => {
        if (increasing) {
          pulseValue += 0.02;
          if (pulseValue >= 0.9) increasing = false;
        } else {
          pulseValue -= 0.02;
          if (pulseValue <= 0.2) increasing = true;
        }
        map.setPaintProperty("route-glow", "line-opacity", pulseValue);
        requestAnimationFrame(pulse);
      };
      pulse();
    });

    return () => map.remove();
  }, []);

  return (
    <div
      ref={mapContainer}
      className="absolute inset-0 z-0 overflow-hidden"
      style={{ opacity: 0.4 }}
    />
  );
}