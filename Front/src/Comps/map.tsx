import React, { useEffect, useRef, useState } from "react";
import { io, Socket } from "socket.io-client";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

const SOCKET_URL = "https://localhost:7000/react";
const MAPBOX_TOKEN =
  "pk.eyJ1IjoiYXl1c2gxMDIiLCJhIjoiY2xycTRtZW4xMDE0cTJtbno5dnU0dG12eCJ9.L9xmYztXX2yOahZoKDBr6g";

// Set your Mapbox token
mapboxgl.accessToken = MAPBOX_TOKEN;

// Define the expected telemetry data interface.
// Adjust the property names if your data uses different keys.
interface TelemetryData {
  latitude: number;
  longitude: number;
  [key: string]: any;
}

const MapTelemetry: React.FC = () => {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const markerRef = useRef<mapboxgl.Marker | null>(null);
  const [telemetry, setTelemetry] = useState<TelemetryData | null>(null);

  // Initialize the Mapbox map only once.
  useEffect(() => {
    if (mapContainerRef.current && !mapRef.current) {
      mapRef.current = new mapboxgl.Map({
        container: mapContainerRef.current,
        style: "mapbox://styles/mapbox/satellite-streets-v12",
        center: [77.11549462480183, 28.753602756944723], 
        zoom: 17.5,
      });
      // Add navigation controls (zoom and rotation)
      mapRef.current.addControl(new mapboxgl.NavigationControl());
    }
  }, []);

  // Connect to the Socket.IO server and listen for telemetry data.
  useEffect(() => {
    const socket: Socket = io(SOCKET_URL, {
      transports: ["websocket"],
      secure: true,
      rejectUnauthorized: false, // Use only in development with self-signed certs
    });

    socket.on("connect", () => {
      console.log("Connected to React namespace");
    });

    socket.on("TelemFowarding", (data: TelemetryData) => {
      console.log("Received telemetry data:", data);
      setTelemetry(data);
    });

    socket.on("disconnect", () => {
      console.log("Disconnected from server");
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  // When telemetry updates, update the marker and recenter the map.
  useEffect(() => {
    if (telemetry && mapRef.current) {
      const { latitude, longitude } = telemetry;
      if (typeof latitude === "number" && typeof longitude === "number") {
        if (!markerRef.current) {
          // Create a custom image marker
          const el = document.createElement("div");

          el.style.backgroundImage = "url(https://iili.io/dBbAcPf.md.png)";
          el.style.width = "35px";
          el.style.height = "35px";
          el.style.backgroundSize = "contain";
          el.style.backgroundRepeat = "no-repeat";

          markerRef.current = new mapboxgl.Marker(el)
            .setLngLat([longitude, latitude])
            .addTo(mapRef.current);
        } else {
          markerRef.current.setLngLat([longitude, latitude]);
        }

        if (!markerRef.current) {
          mapRef.current.flyTo({
            center: [longitude, latitude],
            essential: true,
          });
        }
      }
    }
  }, [telemetry]);

  return (
    <div id="map" className="map">
      <div ref={mapContainerRef} className="map-container" />
    </div>
  );
};

export default MapTelemetry;
