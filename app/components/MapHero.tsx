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
      center: [-75.9, 37.62],
      zoom: 10.5,
      interactive: false,
    });

    map.on("load", () => {
      // Major ESVA towns along the peninsula
      const towns = [
        { name: "Onley", lngLat: [-75.82, 37.70], color: "#00e676" },
        { name: "Melfa", lngLat: [-75.79, 37.67], color: "#00e676" },
        { name: "Parksley", lngLat: [-75.64, 37.80], color: "#00e676" },
        { name: "Accamac", lngLat: [-75.75, 37.63], color: "#ffd54f" },
        { name: "Exmore", lngLat: [-75.92, 37.55], color: "#ffd54f" },
        { name: "Nassawadox", lngLat: [-75.97, 37.48], color: "#ffd54f" },
      ];

      // Create pins for each town
      towns.forEach((town, i) => {
        const el = document.createElement("div");
        el.style.width = "10px";
        el.style.height = "10px";
        el.style.backgroundColor = town.color;
        el.style.borderRadius = "50%";
        el.style.boxShadow = "0 0 6px rgba(255,255,255,0.6)";
        el.style.opacity = "0";
        el.style.transition = "opacity 0.5s";
        
        new mapboxgl.Marker(el).setLngLat(town.lngLat).addTo(map);
        setTimeout(() => { el.style.opacity = "1"; }, 800 + i * 300);
      });

      // Vertical delivery route from north to south
      setTimeout(() => {
        map.addLayer({
          id: "vertical-route",
          type: "line",
          source: {
            type: "geojson",
            data: {
              type: "Feature",
              properties: {},
              geometry: {
                type: "LineString",
                coordinates: [
                  [-75.82, 37.70], // Onley (top)
                  [-75.79, 37.67], // Melfa
                  [-75.64, 37.80], // Parksley
                  [-75.75, 37.63], // Accamac
                  [-75.92, 37.55], // Exmore
                  [-75.97, 37.48], // Nassawadox (bottom)
                ],
              },
            },
          },
          layout: {},
          paint: {
            "line-color": "#00e676",
            "line-width": 2,
            "line-opacity": 0.6,
          },
        });
      }, 3000);
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