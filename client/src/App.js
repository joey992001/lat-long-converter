import React, { useState } from 'react';
import './App.css'; // Import CSS file

function App() {
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [convertedCoords, setConvertedCoords] = useState('');

  const defaultLat = 14.5515; // West Rembo, Makati City
  const defaultLng = 121.0450;

  // Function to convert Decimal Degrees (DD) to DMS
  const convertToDMS = (dd, isLatitude) => {
    const direction = isLatitude ? (dd >= 0 ? 'N' : 'S') : (dd >= 0 ? 'E' : 'W');
    const absoluteDD = Math.abs(dd);
    const degrees = Math.floor(absoluteDD);
    const minutesFloat = (absoluteDD - degrees) * 60;
    const minutes = Math.floor(minutesFloat);
    const seconds = ((minutesFloat - minutes) * 60).toFixed(2);
    return `${degrees}° ${minutes}' ${seconds}" ${direction}`;
  };

  // Convert and display results
  const handleConvert = () => {
    if (latitude && longitude) {
      const latDMS = convertToDMS(parseFloat(latitude), true);
      const lonDMS = convertToDMS(parseFloat(longitude), false);
      setConvertedCoords(`Latitude: ${latDMS}, Longitude: ${lonDMS}`);
    }
  };

  // Function to save coordinates to database
  const saveToDatabase = async () => {
    const response = await fetch('http://localhost:5000/api/save-coords', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ latitude, longitude, convertedCoords })
    });
    const data = await response.json();
    alert(data.message);
  };

  return (
    <div className="container">
      <h1>Latitude & Longitude Converter</h1>
      
      <div className="card">
        <input
          type="number"
          placeholder="Enter Latitude (DD)"
          value={latitude}
          onChange={(e) => setLatitude(e.target.value)}
        />
        <input
          type="number"
          placeholder="Enter Longitude (DD)"
          value={longitude}
          onChange={(e) => setLongitude(e.target.value)}
        />
        <button onClick={handleConvert} className="convert-btn">Convert Coords</button>
        <p className="converted-text">{convertedCoords}</p>
        <button onClick={saveToDatabase} className="save-btn">Save to Database</button>
      </div>

      {/* Static Google Map */}
      <div className="map-container">
        <h3>Location Map</h3>
        <iframe
          title="Google Map of West Rembo"
          width="100%"
          height="400"
          style={{ border: 0 }}
          loading="lazy"
          allowFullScreen
          src={`https://maps.google.com/maps?q=${defaultLat},${defaultLng}&t=&z=15&ie=UTF8&iwloc=&output=embed`}
        ></iframe>
      </div>
    </div>
  );
}

export default App;
