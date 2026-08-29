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
      center: [-75.9, 37.6],
      zoom: 10,
      interactive: false,
    });

    map.on("load", () => {
      // Onley pin (top)
      const onleyEl = document.createElement("div");
      onleyEl.style.width = "14px";
      onleyEl.style.height = "14px";
      onleyEl.style.backgroundColor = "#00e676";
      onleyEl.style.borderRadius = "50%";
      onleyEl.style.boxShadow = "0 0 10px rgba(0,230,118,0.8)";
      onleyEl.style.opacity = "0";
      onleyEl.style.transition = "opacity 0.5s";
      new mapboxgl.Marker(onleyEl).setLngLat([-75.82, 37.70]).addTo(map);
      setTimeout(() => { onleyEl.style.opacity = "1"; }, 1000);

      // Machipongo pin (bottom)
      const machEl = document.createElement("div");
      machEl.style.width = "14px";
      machEl.style.height = "14px";
      machEl.style.backgroundColor = "#ffd54f";
      machEl.style.borderRadius = "50%";
      machEl.style.boxShadow = "0 0 10px rgba(255,213,79,0.8)";
      machEl.style.opacity = "0";
      machEl.style.transition = "opacity 0.5s";
      new mapboxgl.Marker(machEl).setLngLat([-75.97, 37.55]).addTo(map);
      setTimeout(() => { machEl.style.opacity = "1"; }, 2000);

      // Animated delivery line (no moving dot)
      setTimeout(() => {
        map.addLayer({
          id: "delivery-route",
          type: "line",
          source: {
            type: "geojson",
            data: {
              type: "Feature",
              properties: {},
              geometry: {
                type: "LineString",
                coordinates: [
                  [-75.82, 37.70],
                  [-75.97, 37.55],
                ],
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
      }, 2800);
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