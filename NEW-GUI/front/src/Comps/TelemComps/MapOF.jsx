import React, { useRef, useEffect, useState, useContext } from "react";
import { MapContainer, TileLayer, Marker, Popup, Polygon, useMap } from "react-leaflet";
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import telemContext from "../../context/home/telemContext";
import Modal from "./MapConps/Modal";
import uavIconUrl from '../../assets/UAVmarker.png'; // Replace with your local path to UAV icon
import roverIconUrl from '../../assets/UAVmarker.png'; // Replace with your local path to Rover icon

const uavIcon = new L.Icon({
  iconUrl: uavIconUrl,
  iconSize: [35, 35],
  iconAnchor: [17, 35],
  popupAnchor: [0, -35],
});

const roverIcon = new L.Icon({
  iconUrl: roverIconUrl,
  iconSize: [30, 30],
  iconAnchor: [15, 30],
  popupAnchor: [0, -30],
});

export default function MapOF() {
  const [lng, setLng] = useState(77.11695);
  const [lat, setLat] = useState(28.750449);
  const [zoom, setZoom] = useState(17.3);
  const { telemetryData, telemetryData_rover } = useContext(telemContext);

  const position = [lat, lng];
  const dtuCampusCoords = [
    [28.754964, 77.115826],
    [28.749402, 77.123077],
    [28.744705, 77.118353],
    [28.745345, 77.115991],
    [28.748807, 77.115111],
    [28.749459, 77.110113],
    [28.751436, 77.112112],
    [28.752666, 77.113197],
  ];

  const ChangeView = ({ center, zoom }) => {
    const map = useMap();
    map.setView(center, zoom);
    return null;
  };

  return (
    <div>
      <div id="map" className="map">
        <div className="sidebar">
          <strong>UAV1:-</strong> Longitude: {telemetryData?.longitude} | Latitude:{" "}
          {telemetryData?.latitude} | Zoom: {zoom}
          <br />
          <strong>Rover:-</strong> Longitude: {telemetryData_rover?.longitude} | Latitude:{" "}
          {telemetryData_rover?.latitude}
        </div>
        <Modal />
        <MapContainer center={position} zoom={zoom} className="map-container" whenCreated={mapInstance => {
          mapInstance.on('moveend', () => {
            const center = mapInstance.getCenter();
            setLng(center.lng.toFixed(4));
            setLat(center.lat.toFixed(4));
            setZoom(mapInstance.getZoom().toFixed(2));
          });
        }}>
          <ChangeView center={position} zoom={zoom} />
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          />
          {telemetryData && telemetryData.latitude && telemetryData.longitude && (
            <Marker position={[telemetryData.latitude, telemetryData.longitude]} icon={uavIcon}>
              <Popup>UAV Location</Popup>
            </Marker>
          )}
          {telemetryData_rover && telemetryData_rover.latitude && telemetryData_rover.longitude && (
            <Marker position={[telemetryData_rover.latitude, telemetryData_rover.longitude]} icon={roverIcon}>
              <Popup>Rover Location</Popup>
            </Marker>
          )}
          <Polygon positions={dtuCampusCoords} color="#798b90" fillOpacity={0.5} />
        </MapContainer>
      </div>
    </div>
  );
}
