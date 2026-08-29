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
      center: [-75.82, 37.5],
      zoom: 9,
      interactive: false,
    });

    map.on("load", () => {
      // Towns along Route 13 from north to south
      const towns: Array<{ name: string, lngLat: [number, number], color: string }> = [
        { name: "Onley", lngLat: [-75.78, 37.69], color: "#00e676" },
        { name: "Exmore", lngLat: [-75.83, 37.53], color: "#ffd54f" },
      ];

      // Create pins
      towns.forEach((town, i) => {
        const el = document.createElement("div");
        el.style.width = "12px";
        el.style.height = "12px";
        el.style.backgroundColor = town.color;
        el.style.borderRadius = "50%";
        el.style.boxShadow = "0 0 8px " + town.color;
        el.style.opacity = "0";
        el.style.transition = "opacity 0.5s";

        new mapboxgl.Marker(el).setLngLat(town.lngLat).addTo(map);
        setTimeout(() => { el.style.opacity = "1"; }, 800 + i * 600);
      });

      // Delivery route along Route 13 from Onley to Exmore
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
                  [-75.78, 37.69], // Onley
                  [-75.77, 37.65], // Along Route 13
                  [-75.80, 37.60], // Along Route 13
                  [-75.82, 37.56], // Along Route 13
                  [-75.83, 37.53], // Exmore
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
      }, 2400);
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