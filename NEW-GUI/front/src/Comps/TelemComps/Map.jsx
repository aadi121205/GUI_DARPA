import React, { useRef, useEffect, useState } from "react";
import mapboxgl from 'mapbox-gl';
/* import telemContext from "../../context/home/telemContext"; */

mapboxgl.accessToken = "pk.eyJ1IjoiYXl1c2gxMDIiLCJhIjoiY2xycTRtZW4xMDE0cTJtbno5dnU0dG12eCJ9.L9xmYztXX2yOahZoKDBr6g";

export default function Map() {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(77.11695);
  const [lat, setLat] = useState(28.750449);
  const [zoom, setZoom] = useState(16.3);

  /* 
  const { telemetryData } = React.useContext(telemContext);
  const { telemetryData_rover } = React.useContext(telemContext);
  const { telemetryData_rover2 } = React.useContext(telemContext);
  const { telemetryData_rover3 } = React.useContext(telemContext);
  const [marker, setMarker] = useState(null);
  const [marker_rover, setMarker_rover] = useState(null);
  const [marker_rover2, setMarker_rover2] = useState(null);
  const [marker_rover3, setMarker_rover3] = useState(null);
  */

  useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/satellite-v6",
      center: [lng, lat],
      zoom: zoom,
    });
  }, [lng, lat]);

  /*
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
      console.log("Loaded layer");
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
      // Add a black outline around the polygon.
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
    if (marker) {
      marker.remove();
    }
    const markerElement = document.createElement("div");
    markerElement.className = "marker";
    const markerObject = new mapboxgl.Marker(markerElement)
      .setLngLat([telemetryData.longitude, telemetryData.latitude])
      .addTo(map.current);
    setMarker(markerObject);
  }, [lat, lng, zoom, telemetryData]);

  useEffect(() => {
    if (!telemetryData_rover || !telemetryData_rover.latitude || !telemetryData_rover.longitude) {
      setLat_rover(28.750449);
      setLng_rover(77.11695);
      return;
    }

    map.current.on("move", () => {
      setLng_rover(map.current.getCenter().lng.toFixed(4));
      setLat_rover(map.current.getCenter().lat.toFixed(4));
      setZoom(map.current.getZoom().toFixed(2));
    });
    if (marker_rover) {
      marker_rover.remove();
    }
    const markerElement_rover = document.createElement("div");
    markerElement_rover.className = "marker_rover";
    const markerObject_rover = new mapboxgl.Marker(markerElement_rover)
      .setLngLat([telemetryData_rover.longitude, telemetryData_rover.latitude])
      .addTo(map.current);
    setMarker_rover(markerObject_rover);
  }, [lat_rover, lng_rover, zoom, telemetryData_rover]);

  useEffect(() => {
    if (!telemetryData_rover2 || !telemetryData_rover2.latitude || !telemetryData_rover2.longitude) {
      setLat_rover2(28.750449);
      setLng_rover2(77.11695);
      return;
    }

    map.current.on("move", () => {
      setLng_rover2(map.current.getCenter().lng.toFixed(4));
      setLat_rover2(map.current.getCenter().lat.toFixed(4));
      setZoom(map.current.getZoom().toFixed(2));
    });
    if (marker_rover2) {
      marker_rover2.remove();
    }
    const markerElement_rover2 = document.createElement("div");
    markerElement_rover2.className = "marker_rover2";
    const markerObject_rover2 = new mapboxgl.Marker(markerElement_rover2)
      .setLngLat([telemetryData_rover2.longitude, telemetryData_rover2.latitude])
      .addTo(map.current);
    setMarker_rover2(markerObject_rover2);
  }, [lat_rover2, lng_rover2, zoom, telemetryData_rover2]);
  */

  return (
    <div>
      <div id="map" className="map">
        <div className="sidebar">
          {/* <strong>UAV1:-</strong> Longitude: {telemetryData.longitude} | Latitude: {telemetryData.latitude} | Zoom: {zoom}
          <br />
          <strong>ROVER 1:-</strong> Longitude: {telemetryData_rover?.longitude} | Latitude: {telemetryData_rover?.latitude}
          <div id="listings" className="listings"></div>
          <strong>ROVER 2:-</strong> Longitude: {telemetryData_rover2?.longitude} | Latitude: {telemetryData_rover2?.latitude}
          <div id="listings" className="listings"></div>
          <strong>ROVER 3:-</strong> Longitude: {telemetryData_rover3?.longitude} | Latitude: {telemetryData_rover3?.latitude}
          <div id="listings" className="listings"></div> */}
        </div>
        <div ref={mapContainer} className="map-container" />
      </div>
    </div>
  );
}
