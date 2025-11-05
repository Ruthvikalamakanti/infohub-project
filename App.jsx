import React, { useState } from 'react';
import WeatherModule from './components/WeatherModule';
import CurrencyConverter from './components/CurrencyConverter';
import QuoteGenerator from './components/QuoteGenerator';
import './index.css';

export default function App(){
  const [tab, setTab] = useState('weather');
  return (
    <div className="container">
      <h1>🌍 InfoHub</h1>
      <div className="tabs">
        <button onClick={()=>setTab('weather')}>Weather</button>
        <button onClick={()=>setTab('currency')}>Currency</button>
        <button onClick={()=>setTab('quote')}>Quotes</button>
      </div>
      <div className="module">
        {tab==='weather' && <WeatherModule />}
        {tab==='currency' && <CurrencyConverter />}
        {tab==='quote' && <QuoteGenerator />}
      </div>
    </div>
  );
}
