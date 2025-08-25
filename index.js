const express = require('express');
const path = require('path');
const { getAllNews, getSingaporeNews, getMalaysiaNews, getBusinessNews } = require('./scraper');

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files from the 'public' directory
app.use(express.static('public'));

// Serve the main page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// API endpoint for all news
app.get('/api/news', async (req, res) => {
  try {
    const news = await getAllNews();
    res.json({
      status: 'success',
      count: news.length,
      data: news
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Failed to fetch news',
      error: error.message
    });
  }
});

// API endpoint for Singapore news only
app.get('/api/news/singapore', async (req, res) => {
  try {
    const news = await getSingaporeNews();
    res.json({
      status: 'success',
      count: news.length,
      data: news
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Failed to fetch Singapore news',
      error: error.message
    });
  }
});

// API endpoint for Malaysia news only
app.get('/api/news/malaysia', async (req, res) => {
  try {
    const news = await getMalaysiaNews();
    res.json({
      status: 'success',
      count: news.length,
      data: news
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Failed to fetch Malaysia news',
      error: error.message
    });
  }
});

// API endpoint for Business news only
app.get('/api/news/business', async (req, res) => {
  try {
    const news = await getBusinessNews();
    res.json({
      status: 'success',
      count: news.length,
      data: news
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Failed to fetch Business news',
      error: error.message
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});