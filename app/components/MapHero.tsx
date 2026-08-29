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
      center: [-75.8, 37.5],
      zoom: 10,
      interactive: false,
    });

    map.on("load", () => {
      // Saxis pin (top-left)
      const saxisEl = document.createElement("div");
      saxisEl.style.width = "14px";
      saxisEl.style.height = "14px";
      saxisEl.style.backgroundColor = "#00e676";
      saxisEl.style.borderRadius = "50%";
      saxisEl.style.boxShadow = "0 0 10px rgba(0,230,118,0.8)";
      saxisEl.style.opacity = "0";
      saxisEl.style.transition = "opacity 0.5s";
      new mapboxgl.Marker(saxisEl).setLngLat([-75.72, 37.84]).addTo(map);
      setTimeout(() => { saxisEl.style.opacity = "1"; }, 1000);

      // Nassawadox pin (bottom-right)
      const nassEl = document.createElement("div");
      nassEl.style.width = "14px";
      nassEl.style.height = "14px";
      nassEl.style.backgroundColor = "#ffd54f";
      nassEl.style.borderRadius = "50%";
      nassEl.style.boxShadow = "0 0 10px rgba(255,213,79,0.8)";
      nassEl.style.opacity = "0";
      nassEl.style.transition = "opacity 0.5s";
      new mapboxgl.Marker(nassEl).setLngLat([-75.85, 37.48]).addTo(map);
      setTimeout(() => { nassEl.style.opacity = "1"; }, 2000);

      // Animated delivery line
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
                  [-75.72, 37.84],
                  [-75.85, 37.48],
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

        // Moving glow dot along the route
        map.addSource("moving-dot", {
          type: "geojson",
          data: {
            type: "FeatureCollection",
            features: [{
              type: "Feature",
              geometry: { type: "Point", coordinates: [-75.72, 37.84] },
              properties: {},
            }],
          },
        });

        map.addLayer({
          id: "moving-dot-layer",
          type: "circle",
          source: "moving-dot",
          paint: {
            "circle-radius": 6,
            "circle-color": "#00e676",
            "circle-opacity": 0.9,
            "circle-blur": 1,
          },
        });

        let progress = 0;
        const start = [-75.72, 37.84];
        const end = [-75.85, 37.48];

        const animateDot = () => {
          progress += 0.005;
          if (progress > 1) progress = 0;
          const lng = start[0] + (end[0] - start[0]) * progress;
          const lat = start[1] + (end[1] - start[1]) * progress;
          (map.getSource("moving-dot") as mapboxgl.GeoJSONSource).setData({
            type: "FeatureCollection",
            features: [{
              type: "Feature",
              geometry: { type: "Point", coordinates: [lng, lat] },
              properties: {},
            }],
          });
          requestAnimationFrame(animateDot);
        };
        animateDot();
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