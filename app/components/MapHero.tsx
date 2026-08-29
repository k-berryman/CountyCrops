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

    // Your two pin locations based on pink squares
    const pin1: [number, number] = [-75.75, 37.82]; // Top pin
    const pin2: [number, number] = [-75.90, 37.38]; // Bottom pin

    map.on("load", () => {
      // Green line connecting the two pins
      map.addLayer({
        id: "delivery-line",
        type: "line",
        source: {
          type: "geojson",
          data: {
            type: "Feature",
            properties: {},
            geometry: {
              type: "LineString",
              coordinates: [pin1, pin2],
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

      // Pin 1 (top)
      const pin1El = document.createElement("div");
      pin1El.style.width = "12px";
      pin1El.style.height = "12px";
      pin1El.style.backgroundColor = "#00e676";
      pin1El.style.borderRadius = "50%";
      pin1El.style.boxShadow = "0 0 10px #00e676";
      new mapboxgl.Marker(pin1El).setLngLat(pin1).addTo(map);

      // Pin 2 (bottom)
      const pin2El = document.createElement("div");
      pin2El.style.width = "12px";
      pin2El.style.height = "12px";
      pin2El.style.backgroundColor = "#ffd54f";
      pin2El.style.borderRadius = "50%";
      pin2El.style.boxShadow = "0 0 10px #ffd54f";
      new mapboxgl.Marker(pin2El).setLngLat(pin2).addTo(map);

      // Animated green dot traveling from pin1 to pin2, then looping
      const dotEl = document.createElement("div");
      dotEl.style.width = "10px";
      dotEl.style.height = "10px";
      dotEl.style.backgroundColor = "#00e676";
      dotEl.style.borderRadius = "50%";
      dotEl.style.boxShadow = "0 0 15px #00e676";
      dotEl.style.border = "2px solid white";

      const dotMarker = new mapboxgl.Marker(dotEl).setLngLat(pin1).addTo(map);

      let progress = 0;
      const speed = 0.003; // Medium speed

      const animate = () => {
        progress += speed;
        if (progress >= 1) progress = 0; // Loop back to start

        const lng = pin1[0] + (pin2[0] - pin1[0]) * progress;
        const lat = pin1[1] + (pin2[1] - pin1[1]) * progress;

        dotMarker.setLngLat([lng, lat]);

        // Blink effect
        const blink = 0.5 + 0.5 * Math.sin(progress * Math.PI * 8);
        dotEl.style.opacity = String(blink);

        requestAnimationFrame(animate);
      };

      setTimeout(animate, 800);
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