import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-routing-machine';
import './App.css';
import Search from './Search';

// Component to handle routing
function Routing({ userLocation, selectedFacility }) {
  const map = useMap();

  useEffect(() => {
    if (userLocation && selectedFacility) {
      L.Routing.control({
        waypoints: [
          L.latLng(userLocation),
          L.latLng(selectedFacility.position)
        ],
        routeWhileDragging: true
      }).addTo(map);
    }
  }, [userLocation, selectedFacility, map]);

  return null;
}

function App() {
  // const position = [28.7041, 77.1025]; // Latitude and longitude for the station
  const position = [ 28.6391, 77.2182]; // Latitude and longitude for the station

  // Facility data
  const allFacilities = [
    { name: "Ticket Counter", position: [28.6394, 77.2183] },
    { name: "Platform 1", position: [28.6396, 77.2187] },
    { name: "Restroom", position: [28.6399, 77.2185] }
  ];

  const [filteredFacilities, setFilteredFacilities] = useState(allFacilities);
  const [userLocation, setUserLocation] = useState(null);
  const [selectedFacility, setSelectedFacility] = useState(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setUserLocation([position.coords.latitude, position.coords.longitude]);
    });
  }, []);

  const handleFacilitySelect = (facility) => {
    setSelectedFacility(facility);
  };

  return (
    <div className="App">
      <h1>Railway Station Navigation</h1>
      <Search facilities={allFacilities} onSearch={setFilteredFacilities} />
      <MapContainer center={position} zoom={13} style={{ height: "500px", width: "100%" }} id="mapid">
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {filteredFacilities.map((facility, idx) => (
          <Marker key={idx} position={facility.position} eventHandlers={{
            click: () => handleFacilitySelect(facility)
          }}>
            <Popup>{facility.name}</Popup>
          </Marker>
        ))}
        {userLocation && (
          <Marker position={userLocation}>
            <Popup>Your Location</Popup>
          </Marker>
        )}
        <Routing userLocation={userLocation} selectedFacility={selectedFacility} />
      </MapContainer>
    </div>
  );
}

export default App;
