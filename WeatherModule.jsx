import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function WeatherModule(){
  const [city, setCity] = useState('London');
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState('');

  const fetchWeather = async () => {
    setLoading(true); setErr(''); setWeather(null);
    try {
      const r = await axios.get('/api/weather', { params: { city }});
      setWeather(r.data.weather);
    } catch {
      setErr('Could not fetch weather');
    } finally { setLoading(false); }
  };

  useEffect(()=>{ fetchWeather(); }, []);

  return (
    <div>
      <input value={city} onChange={e=>setCity(e.target.value)} />
      <button onClick={fetchWeather}>Get Weather</button>
      {loading && <p>Loading...</p>}
      {err && <p className="error">{err}</p>}
      {weather && (
        <div className="card">
          <h3>{weather.city}, {weather.country}</h3>
          <p>{weather.temp_c}°C — {weather.condition}</p>
        </div>
      )}
    </div>
  );
}
