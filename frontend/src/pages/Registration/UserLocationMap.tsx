import { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

function UserLocationMap() {

    const [position, setPosition] = useState<{ lat: number; lng: number }>({lat: 32.229408, lng: -7.957042});
    
    useEffect(() => {
    if (!navigator.permissions || !navigator.geolocation) {
      console.warn("Geolocation or Permissions API not supported");
      return;
    }

    navigator.permissions.query({ name: "geolocation" }).then((result) => {
      if (result.state === "granted" || result.state === "prompt") {
        navigator.geolocation.getCurrentPosition(
          (pos) => {
            setPosition({ lat: pos.coords.latitude, lng: pos.coords.longitude });
          },
          (err) => {
            console.error("Geolocation error:", err.message);
          }
        );
      } else if (result.state === "denied") {
        console.warn("User has denied location access.");
      }

      // Optional: Listen for changes in permission state
      result.onchange = () => {
        console.log("Permission changed to:", result.state);
      };
    });
    }, []);
  return (
    <MapContainer  center={[position.lat, position.lng]} zoom={13} style={{ height: "100%", width: "40%", borderRadius: "15px"}}>
      <TileLayer
        attribution='&copy; OpenStreetMap contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={[position.lat, position.lng]}>
        <Popup>
          You are here.
        </Popup>
      </Marker>
    </MapContainer>
  );
}

export default UserLocationMap;