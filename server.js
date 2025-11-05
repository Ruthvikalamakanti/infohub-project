require('dotenv').config();
const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

// Local backup quotes
const localQuotes = [
  { text: "Start where you are. Use what you have. Do what you can.", author: "Arthur Ashe" },
  { text: "Act as if what you do makes a difference. It does.", author: "William James" }
];

app.get('/api/quote', async (req, res) => {
  try {
    const r = await axios.get('https://api.quotable.io/random');
    res.json({ success: true, quote: { text: r.data.content, author: r.data.author } });
  } catch (err) {
    const q = localQuotes[Math.floor(Math.random() * localQuotes.length)];
    res.json({ success: true, quote: q, fallback: true });
  }
});

app.get('/api/weather', async (req, res) => {
  try {
    const city = req.query.city || 'London';
    const apiKey = process.env.OPENWEATHER_API_KEY;
    const r = await axios.get('https://api.openweathermap.org/data/2.5/weather', {
      params: { q: city, appid: apiKey, units: 'metric' }
    });
    const data = r.data;
    res.json({
      success: true,
      weather: {
        city: data.name,
        country: data.sys.country,
        temp_c: data.main.temp,
        condition: data.weather[0].description
      }
    });
  } catch {
    res.status(500).json({ success: false, message: 'Weather fetch failed' });
  }
});

app.get('/api/currency', async (req, res) => {
  try {
    const amount = Number(req.query.amount) || 1;
    const r = await axios.get('https://api.exchangerate.host/latest', {
      params: { base: 'INR', symbols: 'USD,EUR' }
    });
    const rates = r.data.rates;
    res.json({
      success: true,
      results: {
        USD: (amount * rates.USD).toFixed(2),
        EUR: (amount * rates.EUR).toFixed(2)
      }
    });
  } catch {
    res.status(500).json({ success: false, message: 'Currency fetch failed' });
  }
});

app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
