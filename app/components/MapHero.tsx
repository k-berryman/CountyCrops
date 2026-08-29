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

    // Accomac (top pin) and Nassawadox (bottom pin)
    const pinA: [number, number] = [-75.68, 37.72];
    const pinB: [number, number] = [-75.97, 37.45];

    map.on("load", () => {
      // Green line between the two pins
      map.addSource("route", {
        type: "geojson",
        data: {
          type: "Feature",
          properties: {},
          geometry: {
            type: "LineString",
            coordinates: [pinA, pinB],
          },
        },
      });

      map.addLayer({
        id: "route-glow",
        type: "line",
        source: "route",
        layout: {},
        paint: {
          "line-color": "#00e676",
          "line-width": 10,
          "line-opacity": 0.2,
          "line-blur": 6,
        },
      });

      map.addLayer({
        id: "route-main",
        type: "line",
        source: "route",
        layout: {},
        paint: {
          "line-color": "#00e676",
          "line-width": 3,
          "line-opacity": 0.7,
        },
      });

      // Pin A — Accomac (green)
      const elA = document.createElement("div");
      elA.style.width = "14px";
      elA.style.height = "14px";
      elA.style.backgroundColor = "#00e676";
      elA.style.borderRadius = "50%";
      elA.style.boxShadow = "0 0 12px #00e676";
      elA.style.border = "2px solid white";
      new mapboxgl.Marker(elA).setLngLat(pinA).addTo(map);

      // Pin B — Nassawadox (amber)
      const elB = document.createElement("div");
      elB.style.width = "14px";
      elB.style.height = "14px";
      elB.style.backgroundColor = "#ffd54f";
      elB.style.borderRadius = "50%";
      elB.style.boxShadow = "0 0 12px #ffd54f";
      elB.style.border = "2px solid white";
      new mapboxgl.Marker(elB).setLngLat(pinB).addTo(map);

      // Animated delivery dot
      const dotEl = document.createElement("div");
      dotEl.style.width = "12px";
      dotEl.style.height = "12px";
      dotEl.style.backgroundColor = "#00e676";
      dotEl.style.borderRadius = "50%";
      dotEl.style.boxShadow = "0 0 15px #00e676, 0 0 30px #00e676";
      dotEl.style.border = "2px solid white";
      dotEl.style.zIndex = "999";

      const dotMarker = new mapboxgl.Marker(dotEl).setLngLat(pinA).addTo(map);

      // Animate: dot travels from A to B, loops back to A
      let progress = 0;
      const speed = 0.0035;

      const animate = () => {
        progress += speed;
        if (progress >= 1) {
          progress = 0;
        }

        const lng = pinA[0] + (pinB[0] - pinA[0]) * progress;
        const lat = pinA[1] + (pinB[1] - pinA[1]) * progress;
        dotMarker.setLngLat([lng, lat]);

        // Slow blink: opacity pulses using sine wave
        const blink = 0.4 + 0.6 * Math.sin(progress * Math.PI * 6);
        dotEl.style.opacity = blink.toFixed(2);

        requestAnimationFrame(animate);
      };

      setTimeout(animate, 600);
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