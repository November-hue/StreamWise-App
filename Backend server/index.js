const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// Nov Movie Database 
const movies = [
    { title: 'The Blacklist', tags: ['plot twist', 'cinematography', 'sci-fi'] },
    { title: 'The Godfather', tags: ['character development', 'drama'] },
    { title: 'Breaking Bad', tags: ['plot twist', 'cinematography'] },
    { title: 'Ozark', tags: ['plot twist', 'strong cinematography'] },
];

// Recommend based on selected preferences 
app.post('/recommend', (req, res) => {
    const { preferences } = req.body;
    const recommendations = movies.filter(movie =>
        movie.tags.some(tag => preferences.includes(tag))
    );
    res.json(recommendations);
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));