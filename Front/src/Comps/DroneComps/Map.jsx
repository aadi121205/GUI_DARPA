import React, { useRef, useEffect, useState, useContext } from "react";
import mapboxgl from "mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax
import telemContext from "../../context/home/TelemContext";
import "mapbox-gl/dist/mapbox-gl.css";

mapboxgl.accessToken =
  "pk.eyJ1IjoiYXl1c2gxMDIiLCJhIjoiY2xycTRtZW4xMDE0cTJtbno5dnU0dG12eCJ9.L9xmYztXX2yOahZoKDBr6g";

export default function Map() {
  const mapContainer = useRef();
  const map = useRef();
  const [lng, setLng] = useState(-83.750673);
  const [lat, setLat] = useState(32.504375);
  const [zoom, setZoom] = useState(19.5);
  const {
    telemetryData,
    telemetryData_rover,
    telemetryData_rover2,
    telemetryData_rover3,
  } = useContext(telemContext);
  const [uavMarker, setUavMarker] = useState(null);
  const [uavPointMarkers, setUavPointMarkers] = useState([]);
  const [uavPointsVisible, setUavPointsVisible] = useState(false);

  useEffect(() => {
    if (map.current) return;
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
      map.current.addSource("dtuCampus", {
        type: "geojson",
        data: {
          type: "Feature",
          geometry: {
            type: "Polygon",
            coordinates: [
              [
                [-83.750673, 32.504375],
                [-83.750725, 32.504581],
                [-83.75097, 32.504552],
                [-83.750919, 32.504354],
                [-83.750673, 32.504375],
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
    if (!telemetryData || !telemetryData.latitude || !telemetryData.longitude)
      return;

    const { latitude, longitude } = telemetryData;

    setLat(latitude);
    setLng(longitude);
    setZoom(19.5);

    const uavElement = document.createElement("div");
    uavElement.className = "marker";
    uavElement.style.backgroundImage = "url('https://iili.io/d0YXcEF.md.png')";
    uavElement.style.width = "35px";
    uavElement.style.height = "35px";
    uavElement.style.backgroundSize = "100%";
    uavElement.style.border = "none";
    uavElement.style.borderRadius = "50%";
    uavElement.style.cursor = "pointer";

    uavElement.addEventListener("click", () => {
      window.alert("UAV Location: " + latitude + ", " + longitude);
    });

    const newUavMarker = new mapboxgl.Marker(uavElement)
      .setLngLat([longitude, latitude])
      .addTo(map.current);

    setUavMarker(newUavMarker);

    map.current.flyTo({
      center: [longitude, latitude],
      zoom: 19.5,
      essential: true,
    });
  }, [telemetryData]);

  // New useEffect for handling multiple UAV point markers
  useEffect(() => {
    if (uavPointMarkers) {
      uavPointMarkers.forEach((marker) => marker.remove());
    }

    if (
      uavPointsVisible &&
      telemetryData.locations &&
      telemetryData.locations.length > 0
    ) {
      const newMarkers = telemetryData.locations.map(
        ([latitude, longitude, altitude]) => {
          const uavElement = document.createElement("div");
          uavElement.className = "marker";
          uavElement.style.backgroundImage =
            "url(https://iili.io/d0YXcEF.md.png)";
          uavElement.style.width = "20px";
          uavElement.style.height = "20px";
          uavElement.style.backgroundSize = "100%";
          uavElement.style.border = "none";
          uavElement.style.borderRadius = "50%";
          uavElement.style.cursor = "pointer";

          uavElement.addEventListener("click", () => {
            window.alert(
              `UAV Location: Lat ${latitude}, Lng ${longitude}, Alt ${altitude}`
            );
          });

          return new mapboxgl.Marker(uavElement)
            .setLngLat([longitude, latitude])
            .addTo(map.current);
        }
      );

      setUavPointMarkers(newMarkers);
    }
  }, [telemetryData.locations, uavPointsVisible]);

  return (
    <div>
      <div id="map" className="map">
        <div className="sidebar">
          <strong>UAV1:-</strong> Longitude: {telemetryData?.longitude} |
          Latitude: {telemetryData?.latitude}
          <br />
          <strong>DTU Campus | Zoom: {zoom}</strong>
          <br />
          <label>
            <input
              style={{ margin: "10px", transform: "scale(1.2)" }}
              type="checkbox"
              checked={uavPointsVisible}
              onChange={() => setUavPointsVisible(!uavPointsVisible)}
            />
            &nbsp;Show UAV{" "}
            <strong style={{ fontSize: "14px", marginLeft: "5px" }}>
              {telemetryData.locations && telemetryData.locations.length}&nbsp;
            </strong>
            Points
          </label>
          <br />
        </div>
        <div ref={mapContainer} className="map-container" />
      </div>
    </div>
  );
}
