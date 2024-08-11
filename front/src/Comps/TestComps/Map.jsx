import React, { useRef, useEffect, useState, useContext } from "react";
import mapboxgl from "mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax
import telemContext from "../../context/home/telemContext";
import 'mapbox-gl/dist/mapbox-gl.css';
import Modal from "./MapConps/Modal";

mapboxgl.accessToken =
  "pk.eyJ1IjoiYXl1c2gxMDIiLCJhIjoiY2xycTRtZW4xMDE0cTJtbno5dnU0dG12eCJ9.L9xmYztXX2yOahZoKDBr6g";

export default function Map() {
  const mapContainer = useRef();
  const map = useRef();
  const [lng, setLng] = useState(77.11695);
  const [lat, setLat] = useState(28.750449);
  const [zoom, setZoom] = useState(18);
  const { telemetryData} = useContext(telemContext);
  const [uavMarker, setUavMarker] = useState(null);
  const [uav_point_marker, setPointuavmarker] = useState([]);

  useEffect(() => {
    if (map.current) return; // Initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/satellite-streets-v12",
      center: [lng, lat],
      zoom: zoom,
    });

    map.current.on("move", () => {
      setLng(map.current.getCenter().lng.toFixed(4));
      setLat(map.current.getCenter().lat.toFixed(4));
      setZoom(map.current.getZoom().toFixed(2));
    });

    map.current.on("load", () => {
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
    if (uavMarker) {
      uavMarker.remove();
    }
    if (!telemetryData || !telemetryData.latitude || !telemetryData.longitude) return;

    const { latitude, longitude } = telemetryData;

    setLat(latitude);
    setLng(longitude);

    const uavElement = document.createElement('div');
    uavElement.className = 'marker';
    uavElement.style.backgroundImage = 'url(https://iili.io/dBbAcPf.md.png)';
    uavElement.style.width = '35px';
    uavElement.style.height = '35px';
    uavElement.style.backgroundSize = '100%';
    uavElement.style.border = 'none';
    uavElement.style.borderRadius = '50%';
    uavElement.style.cursor = 'pointer';

    uavElement.addEventListener('click', () => {
      window.alert('UAV Location: ' + latitude + ', ' + longitude);
    });

    const newUavMarker = new mapboxgl.Marker(uavElement)
      .setLngLat([longitude, latitude])
      .addTo(map.current);

    setUavMarker(newUavMarker);

    map.current.flyTo({
      center: [longitude, latitude],
      essential: true,
    });
  }, [telemetryData]);

  // New useEffect for handling multiple UAV point markers
  useEffect(() => {
    // Remove previous markers if they exist
    if (uav_point_marker) {
      uav_point_marker.forEach(marker => marker.remove());
    }

    if (!telemetryData || !telemetryData.locations || telemetryData.locations.length === 0) return;

    const newMarkers = telemetryData.locations.map(([latitude, longitude, altitude]) => {
      const uavElement = document.createElement('div');
      uavElement.className = 'marker';
      uavElement.style.backgroundImage = 'url(https://iili.io/d0YXcEF.md.png)';
      uavElement.style.width = '20px';
      uavElement.style.height = '20px';
      uavElement.style.backgroundSize = '100%';
      uavElement.style.border = 'none';
      uavElement.style.borderRadius = '50%';
      uavElement.style.cursor = 'pointer';

      uavElement.addEventListener('click', () => {
        window.alert(`UAV Location: Lat ${latitude}, Lng ${longitude}, Alt ${altitude}`);
      });

      return new mapboxgl.Marker(uavElement)
        .setLngLat([longitude, latitude])
        .addTo(map.current);
    });

    setPointuavmarker(newMarkers);
  }, [telemetryData.locations]);

  return (
    <div>
      <div id="map" className="map">
        <div className="sidebar">
          <strong>UAV1:-</strong> Longitude: {telemetryData?.longitude} | Latitude:{" "}
          {telemetryData?.latitude}
          <br />
          <strong>DTU Campus  | Zoom: {zoom}</strong>
          <br />
          <strong>{telemetryData.locations && telemetryData.locations.length} UAV Points</strong>
        </div>
        <div ref={mapContainer} className="map-container" />
      </div>
    </div>
  );
}
