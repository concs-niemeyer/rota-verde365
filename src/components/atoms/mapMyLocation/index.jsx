import React, { useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Hook para atualizar o centro do mapa
function MapUpdater({ lat, lon }) {
  const map = useMap();

  useEffect(() => {
    if (lat && lon) {
      map.setView([lat, lon], map.getZoom()); // Atualiza a visão do mapa para o novo centro
    }
  }, [lat, lon, map]);

  return null;
}

function Mapa({ lat, lon, locationName }) {
  const mapRef = useRef();

  return (
    <MapContainer
      center={[lat, lon]}
      zoom={13}
      style={{ height: "400px", width: "100%" }}
      whenCreated={mapInstance => mapRef.current = mapInstance}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <MapUpdater lat={lat} lon={lon} />
      {lat && lon && (
        <Marker position={[lat, lon]} icon={L.icon({
          iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
          iconSize: [25, 41],
          iconAnchor: [12, 41],
          popupAnchor: [1, -34],
          shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
          shadowSize: [41, 41],
        })}>
          <Popup>{locationName}</Popup>
        </Marker>
      )}
    </MapContainer>
  );
}

export default Mapa;
