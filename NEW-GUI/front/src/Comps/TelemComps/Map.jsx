import React, { useRef, useEffect, useState, useContext } from "react";
import mapboxgl from "mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax
import telemContext from "../../context/home/telemContext";
import markerIcon from "../../assets/UAVmarker.png"; // Import the local image
mapboxgl.accessToken =
  "pk.eyJ1IjoiYXl1c2gxMDIiLCJhIjoiY2xycTRtZW4xMDE0cTJtbno5dnU0dG12eCJ9.L9xmYztXX2yOahZoKDBr6g";

export default function Map() {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(77.11695);
  const [lat, setLat] = useState(28.750449);
  const [zoom, setZoom] = useState(16.3);
  const { telemetryData } = useContext(telemContext);
  const [marker, setMarker] = useState(null);

  useEffect(() => {
    if (map.current) return; // Initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/satellite-v9",
      center: [lng, lat],
      zoom: zoom,
    });

    map.current.on("move", () => {
      setLng(map.current.getCenter().lng.toFixed(4));
      setLat(map.current.getCenter().lat.toFixed(4));
      setZoom(map.current.getZoom().toFixed(2));
    });

    map.current.on("load", () => {
      // Add a data source containing GeoJSON data.
      map.current.addSource("dtuCampus", {
        type: "geojson",
        data: {
          type: "Feature",
          geometry: {
            type: "Polygon",
            coordinates: [
              [
                [77.115826, 28.754964],
                [77.123077, 28.749402],
                [77.118353, 28.744705],
                [77.115991, 28.745345],
                [77.115111, 28.748807],
                [77.110113, 28.749459],
                [77.112112, 28.751436],
                [77.113197, 28.752666],
              ],
            ],
          },
        },
      });
      map.current.addLayer({
        id: "dtuCampus",
        type: "fill",
        source: "dtuCampus",
        layout: {},
        paint: {
          "fill-color": "#798b90",
          "fill-opacity": 0.5,
        },
      });
      map.current.addLayer({
        id: "outline",
        type: "line",
        source: "dtuCampus",
        layout: {},
        paint: {
          "line-color": "#000",
          "line-width": 3,
        },
      });
    });
  }, []);

  useEffect(() => {
    if (!telemetryData || !telemetryData.latitude || !telemetryData.longitude) return;

    const { latitude, longitude } = telemetryData;

    setLat(latitude);
    setLng(longitude);

    // Move the map to the new telemetry data location
    map.current.flyTo({
      center: [longitude, latitude],
      essential: true, // this animation is considered essential with respect to prefers-reduced-motion
    });

    // Update marker position or create a new marker with an image
    if (marker) {
      marker.setLngLat([longitude, latitude]);
    } else {
      const el = document.createElement('div');
      el.className = 'marker';
      el.style.backgroundImage = `url(${markerIcon})`;
      el.style.width = '50px';
      el.style.height = '50px';
      el.style.backgroundSize = '100%';

      const newMarker = new mapboxgl.Marker(el)
        .setLngLat([longitude, latitude])
        .addTo(map.current);
      setMarker(newMarker);
    }
  }, [telemetryData]);

  return (
    <div>
      <div id="map" className="map">
        <div className="sidebar">
          <strong>UAV1:-</strong> Longitude: {telemetryData.longitude} | Latitude:{" "}
          {telemetryData.latitude} | Zoom: {zoom}
          <img src={markerIcon} alt="marker" style={{ width: "50px", height: "50px" }} />
          <br />
        </div>
        <div ref={mapContainer} className="map-container" />
      </div>
    </div>
  );
}
