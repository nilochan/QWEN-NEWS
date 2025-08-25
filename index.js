const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files from the 'public' directory
app.use(express.static('public'));

// Serve the main page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// API endpoint for news (to be implemented)
app.get('/api/news', (req, res) => {
  // This is a placeholder that will be replaced with actual news aggregation logic
  res.json({
    message: 'News API endpoint - to be implemented',
    sources: [
      'Singapore News Source 1',
      'Singapore News Source 2',
      'Singapore News Source 3',
      'Malaysia News Source 1',
      'Malaysia News Source 2',
      'Malaysia News Source 3'
    ]
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});