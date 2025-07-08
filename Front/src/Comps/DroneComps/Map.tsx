import {
  useRef,
  useEffect,
  useState,
  useContext,
} from "react";
import mapboxgl, { Map as MapboxMap, Marker } from "mapbox-gl";
import telemContext from "../../context/home/TelemContext";
import "mapbox-gl/dist/mapbox-gl.css";

mapboxgl.accessToken =
  "pk.eyJ1IjoiYXl1c2gxMDIiLCJhIjoiY2xycTRtZW4xMDE0cTJtbno5dnU0dG12eCJ9.L9xmYztXX2yOahZoKDBr6g";

// Define types for telemetryData
type TelemetryData = {
  latitude?: number;
  longitude?: number;
  locations?: [number, number, number][];
  [key: string]: any;
};

export default function Map() {
  // Strict typing for refs and state
  const mapContainer = useRef<HTMLDivElement | null>(null);
  const map = useRef<MapboxMap | null>(null);
  const [lng, setLng] = useState<number>(-83.750673);
  const [lat, setLat] = useState<number>(32.504375);
  const [zoom, setZoom] = useState<number>(19.5);

  const { telemetryData }: { telemetryData: TelemetryData } =
    useContext(telemContext);

  const [uavMarker, setUavMarker] = useState<Marker | null>(null);
  const [uavPointMarkers, setUavPointMarkers] = useState<Marker[]>([]);
  const [uavPointsVisible, setUavPointsVisible] = useState<boolean>(false);

  // Setup map
  useEffect(() => {
    if (map.current || !mapContainer.current) return;

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/satellite-v9",
      center: [lng, lat],
      zoom: zoom,
    });

    map.current.on("move", () => {
      if (!map.current) return;
      setLng(Number(map.current.getCenter().lng.toFixed(6)));
      setLat(Number(map.current.getCenter().lat.toFixed(6)));
      setZoom(Number(map.current.getZoom().toFixed(2)));
    });

    map.current.on("load", () => {
      if (!map.current) return;
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

  // UAV Marker effect
  useEffect(() => {
    if (uavMarker) {
      uavMarker.remove();
    }
    if (
      !telemetryData ||
      typeof telemetryData.latitude !== "number" ||
      typeof telemetryData.longitude !== "number"
    )
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
      .addTo(map.current!);

    setUavMarker(newUavMarker);

    // Optionally, pan the map to the UAV
    map.current?.flyTo({
      center: [longitude, latitude],
      zoom: 19.5,
      essential: true,
    });

    // eslint-disable-next-line
  }, [telemetryData]);

  // UAV Point Markers (multiple points)
  useEffect(() => {
    // Remove existing markers
    uavPointMarkers.forEach((marker) => marker.remove());

    if (
      uavPointsVisible &&
      telemetryData.locations &&
      telemetryData.locations.length > 0
    ) {
      const newMarkers = telemetryData.locations.map(
        ([latitude, longitude, altitude]: [number, number, number]) => {
          const uavElement = document.createElement("div");
          uavElement.className = "marker";
          uavElement.style.backgroundImage =
            "url('https://iili.io/d0YXcEF.md.png')";
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
            .addTo(map.current!);
        }
      );

      setUavPointMarkers(newMarkers);
    } else {
      setUavPointMarkers([]);
    }
    // eslint-disable-next-line
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
