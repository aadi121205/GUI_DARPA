import React, { useRef, useEffect, useState } from "react";
import mapboxgl from "!mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax
import telemContext from "../../context/home/telemContext";

mapboxgl.accessToken =
  "pk.eyJ1IjoiYXl1c2gxMDIiLCJhIjoiY2xycTRtZW4xMDE0cTJtbno5dnU0dG12eCJ9.L9xmYztXX2yOahZoKDBr6g";

export default function Map() {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(77.11695);
  const [lat, setLat] = useState(28.750449);
  const [zoom, setZoom] = useState(15.3);
  const { telemetryData, telemetryData_rover } = React.useContext(telemContext);
  const [marker, setMarker] = useState(null);
  const [marker_rover, setMarker_rover] = useState(null);

  useEffect(() => {
    // Initialize the map once
    if (map.current) return;
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/satellite-v9",
      center: [lng, lat],
      zoom: zoom,
    });
  }, [lng, lat, zoom]);

  useEffect(() => {
    if (!telemetryData || !telemetryData.latitude || !telemetryData.longitude) {
      setLat(28.750449);
      setLng(77.11695);
      return;
    }

    map.current.on("move", () => {
      setLng(map.current.getCenter().lng.toFixed(4));
      setLat(map.current.getCenter().lat.toFixed(4));
      setZoom(map.current.getZoom().toFixed(2));
    });

    map.current.on("load", () => {
      // Add a data source containing GeoJSON data
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

    // Update or create the primary marker
    if (marker) {
      marker.remove();
    }
    const markerElement = document.createElement("div");
    markerElement.className = "marker";
    const markerObject = new mapboxgl.Marker(markerElement)
      .setLngLat([telemetryData.longitude, telemetryData.latitude])
      .addTo(map.current);
    setMarker(markerObject);

    // Update or create the rover marker
    if (marker_rover) {
      marker_rover.remove();
    }
    if (telemetryData_rover && telemetryData_rover.latitude && telemetryData_rover.longitude) {
      const markerElement_rover = document.createElement("div");
      markerElement_rover.className = "marker-rover";
      const markerObject_rover = new mapboxgl.Marker(markerElement_rover)
        .setLngLat([telemetryData_rover.longitude, telemetryData_rover.latitude])
        .addTo(map.current);
      setMarker_rover(markerObject_rover);
    }
  }, [lat, lng, zoom, telemetryData, telemetryData_rover]);

  return (
    <div>
      <div id="map" className="map">
        <div className="sidebar">
          Longitude: {telemetryData?.longitude} | Latitude: {telemetryData?.latitude} | Zoom: {zoom}
          <br />
          rover Longitude: {telemetryData_rover?.longitude} | Latitude: {telemetryData_rover?.latitude}
          <div id="listings" className="listings"></div>
        </div>

        <div ref={mapContainer} className="map-container" />
      </div>
    </div>
  );
}
