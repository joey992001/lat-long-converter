import React, { useState } from 'react';

function App() {
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [convertedCoords, setConvertedCoords] = useState('');

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
      <h2>Latitude and Longitude Converter</h2>
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
      <button onClick={handleConvert}>Convert Coords</button>
      <p>{convertedCoords}</p>
      <button onClick={saveToDatabase}>Save to Database</button>
    </div>
  );
}

export default App;
