import React, { useState } from 'react';
import axios from 'axios';

export default function CurrencyConverter(){
  const [amount, setAmount] = useState(100);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const convert = async () => {
    setLoading(true); setResult(null);
    const r = await axios.get('/api/currency', { params: { amount }});
    setResult(r.data.results);
    setLoading(false);
  };

  return (
    <div>
      <input type="number" value={amount} onChange={e=>setAmount(e.target.value)} />
      <button onClick={convert}>Convert</button>
      {loading && <p>Loading...</p>}
      {result && (
        <div className="card">
          <p>USD: {result.USD}</p>
          <p>EUR: {result.EUR}</p>
        </div>
      )}
    </div>
  );
}
