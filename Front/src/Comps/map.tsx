import React, { useEffect, useRef, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

const SOCKET_URL = 'https://localhost:7000/react';
const MAPBOX_TOKEN = 'pk.eyJ1IjoiYXl1c2gxMDIiLCJhIjoiY2xycTRtZW4xMDE0cTJtbno5dnU0dG12eCJ9.L9xmYztXX2yOahZoKDBr6g';

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
        style: "mapbox://styles/mapbox/satellite-v9",
        center: [0, 0], // default center before receiving telemetry
        zoom: 17,
      });
      // Add navigation controls (zoom and rotation)
      mapRef.current.addControl(new mapboxgl.NavigationControl());
    }
  }, []);

  // Connect to the Socket.IO server and listen for telemetry data.
  useEffect(() => {
    const socket: Socket = io(SOCKET_URL, {
      transports: ['websocket'],
      secure: true,
      rejectUnauthorized: false, // Use only in development with self-signed certs
    });

    socket.on('connect', () => {
      console.log('Connected to React namespace');
    });

    socket.on('TelemFowarding', (data: TelemetryData) => {
      console.log('Received telemetry data:', data);
      setTelemetry(data);
    });

    socket.on('disconnect', () => {
      console.log('Disconnected from server');
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  // When telemetry updates, update the marker and recenter the map.
  useEffect(() => {
    if (telemetry && mapRef.current) {
      const { latitude, longitude } = telemetry;
      if (typeof latitude === 'number' && typeof longitude === 'number') {
        // If the marker doesn't exist, create it.
        if (!markerRef.current) {
          markerRef.current = new mapboxgl.Marker({ color: 'red' })
            .setLngLat([longitude, latitude])
            .addTo(mapRef.current);
        } else {
          // Otherwise, update the marker's position.
          markerRef.current.setLngLat([longitude, latitude]);
        }
        // Smoothly animate the map to center on the new location.
        mapRef.current.flyTo({
          center: [longitude, latitude],
          essential: true, // This animation is considered essential.
          zoom: 10, // Adjust zoom level as needed.
        });
      }
    }
  }, [telemetry]);

  return (
    <div style={{ height: '100vh', width: '100%' }}>
      <div ref={mapContainerRef} style={{ height: '100%', width: '100%' }} />
    </div>
  );
};

export default MapTelemetry;
