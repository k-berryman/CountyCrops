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
      // Route 13 waypoints from Mappsville to Cheriton
      const routeCoordinates: [number, number][] = [
        [-75.74, 37.76], // Mappsville
        [-75.75, 37.72],
        [-75.77, 37.68],
        [-75.78, 37.65],
        [-75.80, 37.60],
        [-75.82, 37.55],
        [-75.83, 37.50],
        [-75.82, 37.45],
        [-75.82, 37.40],
        [-75.82, 37.35],
        [-75.82, 37.29], // Cheriton
      ];

      // Pin 1: Mappsville
      const mappsvilleEl = document.createElement("div");
      mappsvilleEl.style.width = "12px";
      mappsvilleEl.style.height = "12px";
      mappsvilleEl.style.backgroundColor = "#00e676";
      mappsvilleEl.style.borderRadius = "50%";
      mappsvilleEl.style.boxShadow = "0 0 12px #00e676";
      mappsvilleEl.style.opacity = "0";
      mappsvilleEl.style.transition = "opacity 0.5s";
      new mapboxgl.Marker(mappsvilleEl).setLngLat([-75.74, 37.76]).addTo(map);
      setTimeout(() => { mappsvilleEl.style.opacity = "1"; }, 600);

      // Pin 2: Cheriton
      const cheritonEl = document.createElement("div");
      cheritonEl.style.width = "12px";
      cheritonEl.style.height = "12px";
      cheritonEl.style.backgroundColor = "#ffd54f";
      cheritonEl.style.borderRadius = "50%";
      cheritonEl.style.boxShadow = "0 0 12px #ffd54f";
      cheritonEl.style.opacity = "0";
      cheritonEl.style.transition = "opacity 0.5s";
      new mapboxgl.Marker(cheritonEl).setLngLat([-75.82, 37.29]).addTo(map);
      setTimeout(() => { cheritonEl.style.opacity = "1"; }, 1200);

      // Route source (starts empty)
      map.addSource("route", {
        type: "geojson",
        data: {
          type: "Feature",
          properties: {},
          geometry: {
            type: "LineString",
            coordinates: [],
          },
        },
      });

      // Glow layer (wide, blurred, underneath)
      map.addLayer({
        id: "route-glow",
        type: "line",
        source: "route",
        layout: {},
        paint: {
          "line-color": "#00e676",
          "line-width": 8,
          "line-opacity": 0.3,
          "line-blur": 4,
        },
      });

      // Main line (sharp, on top)
      map.addLayer({
        id: "route-main",
        type: "line",
        source: "route",
        layout: {},
        paint: {
          "line-color": "#00e676",
          "line-width": 3,
          "line-opacity": 0.9,
        },
      });

      // Animate the delivery line drawing quickly
      setTimeout(() => {
        let frame = 0;
        const speed = 3; // 3 points per frame = fast draw

        const drawRoute = () => {
          frame += speed;

          if (frame >= routeCoordinates.length) {
            // Line fully drawn — start pulsing glow
            let pulseOpacity = 0.3;
            let goingUp = true;

            const pulseGlow = () => {
              if (goingUp) {
                pulseOpacity += 0.025;
                if (pulseOpacity >= 0.85) goingUp = false;
              } else {
                pulseOpacity -= 0.025;
                if (pulseOpacity <= 0.2) goingUp = true;
              }
              map.setPaintProperty("route-glow", "line-opacity", pulseOpacity);
              requestAnimationFrame(pulseGlow);
            };
            pulseGlow();
            return;
          }

          const drawnCoords = routeCoordinates.slice(0, Math.floor(frame) + 1);

          (map.getSource("route") as mapboxgl.GeoJSONSource).setData({
            type: "Feature",
            properties: {},
            geometry: {
              type: "LineString",
              coordinates: drawnCoords,
            },
          });

          requestAnimationFrame(drawRoute);
        };

        drawRoute();
      }, 1600);
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