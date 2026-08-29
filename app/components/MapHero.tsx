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

    // Route 13 path from Onley to Cheriton (Virginia only)
    const routePoints: [number, number][] = [
      [-75.78, 37.70], // Onley
      [-75.78, 37.65],
      [-75.79, 37.60],
      [-75.80, 37.55],
      [-75.81, 37.50],
      [-75.82, 37.45],
      [-75.82, 37.40],
      [-75.82, 37.35],
      [-75.82, 37.29], // Cheriton
    ];

    map.on("load", () => {
      // Static Route 13 line (faint white)
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
              coordinates: routePoints,
            },
          },
        },
        layout: {},
        paint: {
          "line-color": "#00e676",
          "line-width": 2,
          "line-opacity": 0.5,
        },
      });

      // Animated green dot traveling the route
      let currentIndex = 0;
      const totalPoints = routePoints.length;

      const createDot = (point: [number, number]) => {
        const dot = document.createElement("div");
        dot.className = "delivery-dot";
        dot.style.width = "10px";
        dot.style.height = "10px";
        dot.style.backgroundColor = "#00e676";
        dot.style.borderRadius = "50%";
        dot.style.boxShadow = "0 0 12px #00e676";
        
        return new mapboxgl.Marker(dot).setLngLat(point);
      };

      let currentMarker = createDot(routePoints[0]);

      const moveDot = () => {
        currentIndex++;
        if (currentIndex >= totalPoints) {
          currentIndex = 0;
        }

        currentMarker.remove();
        currentMarker = createDot(routePoints[currentIndex]);
        currentMarker.addTo(map);
      };

      setInterval(moveDot, 500); // Move every 500ms
    });

    return () => map.remove();
  }, []);

  return (
    <div
      ref={mapContainer}
      className="absolute inset-0 z-0 overflow-hidden translate-y-[-8px]"
      style={{ opacity: 0.4 }}
    />
  );
}