const express = require('express');
const cors = require('cors');
const axios = require('axios');
const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// Demo user for basic auth
const user = { username: 'user', password: 'pass123' };

app.post('/login', (req, res) => {
  const { username, password } = req.body;
  if (username === user.username && password === user.password) {
    res.json({ success: true, message: 'Login successful' });
  } else {
    res.status(401).json({ success: false, message: 'Invalid credentials' });
  }
});

app.post('/recommend', async (req, res) => {
  const { preferences } = req.body;
  const apiKey = 'c1ee4094103ef495d026263a63bd1575'; // Replace with your API Key
  const query = preferences.join(' ');

  try {
    const response = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${query}`);
    res.json(response.data.results);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch recommendations' });
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
