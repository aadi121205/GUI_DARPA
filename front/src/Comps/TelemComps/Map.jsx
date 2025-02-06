import React, { useRef, useEffect, useState, useContext } from "react";
import mapboxgl from "mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax
import telemContext from "../../context/home/telemContext";
import "mapbox-gl/dist/mapbox-gl.css";
import Modal from "./MapConps/Modal";

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
  const [roverMarker, setRoverMarker] = useState(null);
  const [roverMarker2, setRoverMarker2] = useState(null);
  const [roverMarker3, setRoverMarker3] = useState(null);
  const [uavPointMarkers, setUavPointMarkers] = useState([]);
  const [uavPointsVisible, setUavPointsVisible] = useState(false);
  const [ugvPointMarkers, setUgvPointMarkers] = useState([]);
  const [ugvPointsVisible, setUgvPointsVisible] = useState(false);
  const [ugv2PointMarkers, setUgv2PointMarkers] = useState([]);
  const [ugv2PointsVisible, setUgv2PointsVisible] = useState(false);
  const [ugv3PointMarkers, setUgv3PointMarkers] = useState([]);
  const [ugv3PointsVisible, setUgv3PointsVisible] = useState(false);

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

    const uavElement = document.createElement("div");
    uavElement.className = "marker";
    uavElement.style.backgroundImage = "url(https://iili.io/dBbAcPf.md.png)";
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
      essential: true,
    });
  }, [telemetryData]);

  useEffect(() => {
    if (roverMarker) {
      roverMarker.remove();
    }
    if (
      !telemetryData_rover ||
      !telemetryData_rover.latitude ||
      !telemetryData_rover.longitude
    )
      return;

    const { latitude, longitude } = telemetryData_rover;

    const roverElement = document.createElement("div");
    roverElement.className = "marker";
    roverElement.style.backgroundImage = "url(https://iili.io/dBmOJb1.png)";
    roverElement.style.width = "30px";
    roverElement.style.height = "30px";
    roverElement.style.backgroundSize = "100%";
    roverElement.style.border = "none";
    roverElement.style.borderRadius = "50%";
    roverElement.style.cursor = "pointer";

    roverElement.addEventListener("click", () => {
      window.alert("Rover Location");
    });

    const newRoverMarker = new mapboxgl.Marker(roverElement)
      .setLngLat([longitude, latitude])
      .addTo(map.current);

    setRoverMarker(newRoverMarker);
  }, [telemetryData_rover]);

  useEffect(() => {
    if (roverMarker2) {
      roverMarker2.remove();
    }
    if (
      !telemetryData_rover2 ||
      !telemetryData_rover2.latitude ||
      !telemetryData_rover2.longitude
    )
      return;

    const { latitude, longitude } = telemetryData_rover2;
    const newLatitude = latitude + 0.0001;

    const roverElement = document.createElement("div");
    roverElement.className = "marker";
    roverElement.style.backgroundImage = "url(https://iili.io/dOmpKNV.png)";
    roverElement.style.width = "30px";
    roverElement.style.height = "30px";
    roverElement.style.backgroundSize = "100%";
    roverElement.style.border = "none";
    roverElement.style.borderRadius = "50%";
    roverElement.style.cursor = "pointer";

    roverElement.addEventListener("click", () => {
      window.alert("Rover Location");
    });

    const newRoverMarker2 = new mapboxgl.Marker(roverElement)
      .setLngLat([longitude, newLatitude])
      .addTo(map.current);

    setRoverMarker2(newRoverMarker2);
  }, [telemetryData_rover2]);

  useEffect(() => {
    if (roverMarker3) {
      roverMarker3.remove();
    }
    if (
      !telemetryData_rover3 ||
      !telemetryData_rover3.latitude ||
      !telemetryData_rover3.longitude
    )
      return;

    const { latitude, longitude } = telemetryData_rover3;
    const newLatitude = latitude - 0.0001;

    const roverElement = document.createElement("div");
    roverElement.className = "marker";
    roverElement.style.backgroundImage = "url(https://iili.io/dOmyQQS.png)";
    roverElement.style.width = "30px";
    roverElement.style.height = "30px";
    roverElement.style.backgroundSize = "100%";
    roverElement.style.border = "none";
    roverElement.style.borderRadius = "50%";
    roverElement.style.cursor = "pointer";

    roverElement.addEventListener("click", () => {
      window.alert("Rover Location");
    });

    const newRoverMarker3 = new mapboxgl.Marker(roverElement)
      .setLngLat([longitude, newLatitude])
      .addTo(map.current);

    setRoverMarker3(newRoverMarker3);
  }, [telemetryData_rover3]);

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

  useEffect(() => {
    if (ugvPointMarkers) {
      ugvPointMarkers.forEach((marker) => marker.remove());
    }

    if (
      ugvPointsVisible &&
      telemetryData_rover.locations &&
      telemetryData_rover.locations.length > 0
    ) {
      const newugvMarkers = telemetryData_rover.locations.map(
        ([latitude, longitude]) => {
          const ugvElement = document.createElement("div");
          ugvElement.className = "marker";
          ugvElement.style.backgroundImage =
            "url(https://iili.io/d0YXcEF.md.png)";
          ugvElement.style.width = "20px";
          ugvElement.style.height = "20px";
          ugvElement.style.backgroundSize = "100%";
          ugvElement.style.border = "none";
          ugvElement.style.borderRadius = "50%";
          ugvElement.style.cursor = "pointer";

          ugvElement.addEventListener("click", () => {
            window.alert(`UGV Location: Lat ${latitude}, Lng ${longitude}`);
          });

          return new mapboxgl.Marker(ugvElement)
            .setLngLat([longitude, latitude])
            .addTo(map.current);
        }
      );

      setUgvPointMarkers(newugvMarkers);
    }
  }, [telemetryData_rover.locations, ugvPointsVisible]);

  useEffect(() => {
    if (ugv2PointMarkers) {
      ugv2PointMarkers.forEach((marker) => marker.remove());
    }

    if (
      ugv2PointsVisible &&
      telemetryData_rover2.locations &&
      telemetryData_rover2.locations.length > 0
    ) {
      const newugv2Markers = telemetryData_rover2.locations.map(
        ([latitude, longitude]) => {
          const ugvElement = document.createElement("div");
          ugvElement.className = "marker";
          ugvElement.style.backgroundImage = "url(https://iili.io/dOpxBv2.png)";
          ugvElement.style.width = "20px";
          ugvElement.style.height = "20px";
          ugvElement.style.backgroundSize = "100%";
          ugvElement.style.border = "none";
          ugvElement.style.borderRadius = "50%";
          ugvElement.style.cursor = "pointer";

          ugvElement.addEventListener("click", () => {
            window.alert(`UGV Location: Lat ${latitude}, Lng ${longitude}`);
          });

          return new mapboxgl.Marker(ugvElement)
            .setLngLat([longitude, latitude])
            .addTo(map.current);
        }
      );

      setUgv2PointMarkers(newugv2Markers);
    }
  }, [telemetryData_rover2.locations, ugv2PointsVisible]);

  useEffect(() => {
    if (ugv3PointMarkers) {
      ugv3PointMarkers.forEach((marker) => marker.remove());
    }

    if (
      ugv3PointsVisible &&
      telemetryData_rover3.locations &&
      telemetryData_rover3.locations.length > 0
    ) {
      const newugv3Markers = telemetryData_rover3.locations.map(
        ([latitude, longitude]) => {
          const ugvElement = document.createElement("div");
          ugvElement.className = "marker";
          ugvElement.style.backgroundImage = "url(https://iili.io/dOpT53G.png)";
          ugvElement.style.width = "20px";
          ugvElement.style.height = "20px";
          ugvElement.style.backgroundSize = "100%";
          ugvElement.style.border = "none";
          ugvElement.style.borderRadius = "50%";
          ugvElement.style.cursor = "pointer";

          ugvElement.addEventListener("click", () => {
            window.alert(`UGV Location: Lat ${latitude}, Lng ${longitude}`);
          });

          return new mapboxgl.Marker(ugvElement)
            .setLngLat([longitude, latitude])
            .addTo(map.current);
        }
      );

      setUgv3PointMarkers(newugv3Markers);
    }
  }, [telemetryData_rover3.locations, ugv3PointsVisible]);

  return (
    <div>
      <div id="map" className="map">
        <div className="sidebar">
          <strong>UAV1:-</strong> Longitude: {telemetryData?.longitude} |
          Latitude: {telemetryData?.latitude}
          <br />
          <strong>Rover:-</strong> Longitude: {telemetryData_rover?.longitude} |
          Latitude: {telemetryData_rover?.latitude}
          <br />
          <strong>Rover2:</strong> Longitude: {telemetryData_rover2?.longitude}{" "}
          | Latitude: {telemetryData_rover2?.latitude}
          <br />
          <strong>Rover3:</strong> Longitude: {telemetryData_rover3?.longitude}{" "}
          | Latitude: {telemetryData_rover3?.latitude}
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
          <label>
            <input
              style={{ margin: "10px", transform: "scale(1.2)" }}
              type="checkbox"
              checked={ugvPointsVisible}
              onChange={() => setUgvPointsVisible(!ugvPointsVisible)}
            />
            &nbsp;Show UGV{" "}
            <strong style={{ fontSize: "14px", marginLeft: "5px" }}>
              {telemetryData_rover.locations &&
                telemetryData_rover.locations.length}
              &nbsp;
            </strong>
            Points
          </label>
          <br />
          <label style={{ color: "lightblue" }}>
            <input
              style={{ margin: "10px", transform: "scale(1.2)" }}
              type="checkbox"
              checked={ugv2PointsVisible}
              onChange={() => setUgv2PointsVisible(!ugv2PointsVisible)}
            />
            &nbsp;Show UGV2{" "}
            <strong style={{ fontSize: "14px", marginLeft: "5px" }}>
              {telemetryData_rover2.locations &&
                telemetryData_rover2.locations.length}
              &nbsp;
            </strong>
            Points
          </label>
          <br />
          <label style={{ color: "lightgreen" }}>
            <input
              style={{ margin: "10px", transform: "scale(1.2)" }}
              type="checkbox"
              checked={ugv3PointsVisible}
              onChange={() => setUgv3PointsVisible(!ugv3PointsVisible)}
            />
            &nbsp;Show UGV3{" "}
            <strong style={{ fontSize: "14px", marginLeft: "5px" }}>
              {telemetryData_rover3.locations &&
                telemetryData_rover3.locations.length}
              &nbsp;
            </strong>
            Points
          </label>
        </div>
        <Modal />
        <div ref={mapContainer} className="map-container" />
      </div>
    </div>
  );
}
