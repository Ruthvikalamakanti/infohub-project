import React, { useState } from 'react';
import axios from 'axios';

export default function QuoteGenerator(){
  const [quote, setQuote] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchQuote = async () => {
    setLoading(true);
    const r = await axios.get('/api/quote');
    setQuote(r.data.quote);
    setLoading(false);
  };

  return (
    <div>
      <button onClick={fetchQuote}>Get Quote</button>
      {loading && <p>Loading...</p>}
      {quote && <p>"{quote.text}" — <b>{quote.author}</b></p>}
    </div>
  );
}
