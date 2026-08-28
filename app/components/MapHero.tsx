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
      center: [-75.9, 37.7], // ESVA center
      zoom: 9,
      interactive: false,
    });

    map.on("load", () => {
      // Add a pulsing dot source/layer for animation effect
      const farms = [
        { name: "Onancock", lngLat: [-75.7, 37.6] },
        { name: "Cape Charles", lngLat: [-76.0, 37.2] },
        { name: "Parksley", lngLat: [-75.6, 37.8] },
      ];
      const home = { name: "Home", lngLat: [-75.8, 37.7] };

      farms.forEach((farm, i) => {
        const el = document.createElement("div");
        el.className = "pulse-dot";
        el.style.width = "12px";
        el.style.height = "12px";
        el.style.backgroundColor = "#00e676";
        el.style.borderRadius = "50%";
        el.style.opacity = "0";
        el.style.transition = "opacity 0.5s";
        
        new mapboxgl.Marker(el).setLngLat(farm.lngLat).addTo(map);
        setTimeout(() => { el.style.opacity = "1"; }, 1000 + i * 500);
      });

      const homeEl = document.createElement("div");
      homeEl.style.width = "12px";
      homeEl.style.height = "12px";
      homeEl.style.backgroundColor = "#ffd54f";
      homeEl.style.borderRadius = "50%";
      homeEl.style.opacity = "0";
      homeEl.style.transition = "opacity 0.5s";
      new mapboxgl.Marker(homeEl).setLngLat(home.lngLat).addTo(map);
      setTimeout(() => { homeEl.style.opacity = "1"; }, 2800);

      // Draw line
      setTimeout(() => {
        map.addLayer({
          id: "route",
          type: "line",
          source: {
            type: "geojson",
            data: {
              type: "Feature",
              properties: {},
              geometry: {
                type: "LineString",
                coordinates: [[-75.7, 37.6], [-75.8, 37.7]],
              },
            },
          },
          layout: {},
          paint: {
            "line-color": "#00e676",
            "line-width": 4,
            "line-opacity": 0.7,
          },
        });
      }, 3300);
    });

    return () => map.remove();
  }, []);

  return (
    <div
      ref={mapContainer}
      className="absolute inset-0 z-0"
      style={{ opacity: 0.4 }}
    />
  );
}