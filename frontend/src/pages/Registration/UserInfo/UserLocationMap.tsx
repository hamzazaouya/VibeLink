import { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { LatLngExpression } from "leaflet";
import { UserFormProps } from "../types/registration.types";
import "leaflet/dist/leaflet.css";

function UserLocationMap(props: UserFormProps) {
  const [position, setPosition] = useState<{ lat: number; lng: number }>({
    lat: props.latitude,
    lng: props.longitude,
  });



  useEffect(() => {
    if (!navigator.permissions || !navigator.geolocation) {
      console.warn("Geolocation or Permissions API not supported");
      return;
    }

    navigator.permissions.query({ name: "geolocation" }).then(async (result) => {
      if (result.state === "granted" || result.state === "prompt") {
        navigator.geolocation.getCurrentPosition(
          (pos) => {
            props.updateFields({
              latitude: pos.coords.latitude,
              longitude: pos.coords.longitude,
            });
            setPosition({
              lat: pos.coords.latitude,
              lng: pos.coords.longitude,
            });
          },
          (err) => {
            console.error("Geolocation error:", err.message);
          }
        );
      } else if (result.state === "denied") {
        try {
          const response = await fetch(`http://ip-api.com/json`);
          const geoInfo = await response.json();
          console.log("Visitor's IP-based location:", geoInfo.lat, geoInfo.lon);
          props.updateFields({ latitude: geoInfo.lat, longitude: geoInfo.lon });
          setPosition({
            lat: geoInfo.lat,
            lng: geoInfo.lon,
          });
          console.warn("User has denied location access.");
        } catch (error) {
          console.error("Failed to fetch IP-based location:", error);
        }
      }

      // Optional: Listen for changes in permission state
      result.onchange = () => {
        console.log("Permission changed to:", result.state);
      };
    });
  }, []);
  return (
    <>
      <MapContainer
        center={[position.lat, position.lng] as LatLngExpression}
        zoom={13}
        style={{ height: "100%", width: "40%", borderRadius: "15px" }}
      >
        <TileLayer
          attribution="&copy; OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[position.lat, position.lng] as LatLngExpression}>
          <Popup>You are here.</Popup>
        </Marker>
      </MapContainer>
    </>
  );
}

export default UserLocationMap;
