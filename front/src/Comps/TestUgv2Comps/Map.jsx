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
  const { telemetryData_rover2 } = useContext(telemContext);
  const [roverMarker, setRoverMarker] = useState(null);
  const [ugvPointMarkers, setUgvPointMarkers] = useState([]);
  const [ugvPointsVisible, setUgvPointsVisible] = useState(false);

  useEffect(() => {
    if (map.current) return;
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
    if (roverMarker) {
      roverMarker.remove();
    }
    if (!telemetryData_rover2 || !telemetryData_rover2.latitude || !telemetryData_rover2.longitude) return;

    const { latitude, longitude } = telemetryData_rover2;

    const roverElement = document.createElement('div');
    roverElement.className = 'marker';
    roverElement.style.backgroundImage = 'url(https://iili.io/dBmOJb1.png)';
    roverElement.style.width = '30px';
    roverElement.style.height = '30px';
    roverElement.style.backgroundSize = '100%';
    roverElement.style.border = 'none';
    roverElement.style.borderRadius = '50%';
    roverElement.style.cursor = 'pointer';

    roverElement.addEventListener('click', () => {
      window.alert('Rover Location');
    });

    const newRoverMarker = new mapboxgl.Marker(roverElement)
      .setLngLat([longitude, latitude])
      .addTo(map.current);

    setRoverMarker(newRoverMarker);
    map.current.flyTo({
      center: [longitude, latitude],
      essential: true,
    });
  }, [telemetryData_rover2]);

  useEffect(() => {
    if (ugvPointMarkers) {
      ugvPointMarkers.forEach(marker => marker.remove());
    }

    if (ugvPointsVisible && telemetryData_rover2.locations && telemetryData_rover2.locations.length > 0) {
      const newugvMarkers = telemetryData_rover2.locations.map(([latitude, longitude]) => {
        const ugvElement = document.createElement('div');
        ugvElement.className = 'marker';
        ugvElement.style.backgroundImage = 'url(https://iili.io/d0YXcEF.md.png)';
        ugvElement.style.width = '20px';
        ugvElement.style.height = '20px';
        ugvElement.style.backgroundSize = '100%';
        ugvElement.style.border = 'none';
        ugvElement.style.borderRadius = '50%';
        ugvElement.style.cursor = 'pointer';

        ugvElement.addEventListener('click', () => {
          window.alert(`UGV Location: Lat ${latitude}, Lng ${longitude}`);
        });

        return new mapboxgl.Marker(ugvElement)
          .setLngLat([longitude, latitude])
          .addTo(map.current);
      });

      setUgvPointMarkers(newugvMarkers);
    }
  }, [telemetryData_rover2.locations, ugvPointsVisible]);

  return (
    <div>
      <div id="map" className="map">
        <div className="sidebars">
          {/* <strong>Rover:-</strong> Longitude: {telemetryData_rover2?.longitude} | Latitude:{" "} */}
          {/* {telemetryData_rover2?.latitude} */}
          <br />
          <strong>DTU Campus  | Zoom: {zoom}</strong>
          <br />
          {/* <strong>{telemetryData_rover2.locations && telemetryData_rover2.locations.length} UGV Points &nbsp;</strong> */}
          <label>
            <input
              type="checkbox"
              checked={ugvPointsVisible}
              onChange={() => setUgvPointsVisible(!ugvPointsVisible)}
            />
            Show UGV2 Points
          </label>
        </div>
        <div ref={mapContainer} className="map-container" />
      </div>
    </div>
  );
}
