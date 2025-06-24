import React, { useState } from 'react';
import axios from 'axios';

function App() { 
    const [preferences, setPreferences] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const tags = ['plot twists', 'cinematography', 'character development', 'background watching', 'sci-fi', 'comedy', 'drama'];

  const togglePreference = (tag) => {
    setPreferences(prev =>
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    );
  };

  const getRecommendations = async () => {
    const res = await axios.post('http://localhost:5000/recommend', { preferences });
    setRecommendations(res.data);
  };

  const login = async () => {
    try {
      const res = await axios.post('http://localhost:5000/login', { username, password });
      if (res.data.success) setIsLoggedIn(true);
    } catch {
      alert('Login failed');
    }
  };

  if (!isLoggedIn) {
    return (
      <div style={{ padding: '20px' }}>
        <h2>Login to StreamWise</h2>
        <input placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} /><br />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} /><br />
        <button onClick={login}>Login</button>
      </div>
    );
  }

  return (
    <div style={{ padding: '20px' }}>
      <h2>StreamWise - Personalized Recommendations</h2>
      <p>Select your preferences:</p>
      {tags.map(tag => (
        <button
          key={tag}
          style={{
            margin: '5px',
            backgroundColor: preferences.includes(tag) ? 'black' : 'white'
          }}
          onClick={() => togglePreference(tag)}
        >
          {tag}
        </button>
      ))}
      <div>
        <button onClick={getRecommendations} style={{ marginTop: '20px' }}>Get Recommendations</button>
      </div>
      <h3>Recommendations:</h3>
      <ul>
        {recommendations.map((movie, i) => (
          <li key={i}>{movie.title}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
