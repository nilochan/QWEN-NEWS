const express = require('express');
const path = require('path');
const { getAllNews, getSingaporeNews, getMalaysiaNews, getBusinessNews, searchNews } = require('./scraper');

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files from the 'public' directory
app.use(express.static('public'));

// Middleware to log requests
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// Serve the main page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// API endpoint for all news
app.get('/api/news', async (req, res) => {
  try {
    const startTime = Date.now();
    const news = await getAllNews();
    const endTime = Date.now();
    
    res.json({
      status: 'success',
      count: news.length,
      data: news,
      metadata: {
        requestTime: endTime - startTime,
        timestamp: new Date().toISOString()
      }
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
    const startTime = Date.now();
    const news = await getSingaporeNews();
    const endTime = Date.now();
    
    res.json({
      status: 'success',
      count: news.length,
      data: news,
      metadata: {
        requestTime: endTime - startTime,
        timestamp: new Date().toISOString()
      }
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
    const startTime = Date.now();
    const news = await getMalaysiaNews();
    const endTime = Date.now();
    
    res.json({
      status: 'success',
      count: news.length,
      data: news,
      metadata: {
        requestTime: endTime - startTime,
        timestamp: new Date().toISOString()
      }
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
    const startTime = Date.now();
    const news = await getBusinessNews();
    const endTime = Date.now();
    
    res.json({
      status: 'success',
      count: news.length,
      data: news,
      metadata: {
        requestTime: endTime - startTime,
        timestamp: new Date().toISOString()
      }
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Failed to fetch Business news',
      error: error.message
    });
  }
});

// API endpoint for searching news
app.get('/api/news/search', async (req, res) => {
  try {
    const { q } = req.query;
    
    if (!q) {
      return res.status(400).json({
        status: 'error',
        message: 'Query parameter "q" is required'
      });
    }
    
    const startTime = Date.now();
    const news = await searchNews(q);
    const endTime = Date.now();
    
    res.json({
      status: 'success',
      count: news.length,
      query: q,
      data: news,
      metadata: {
        requestTime: endTime - startTime,
        timestamp: new Date().toISOString()
      }
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Failed to search news',
      error: error.message
    });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'success',
    message: 'QWEN-NEWS API is running',
    timestamp: new Date().toISOString()
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
  console.log(`📊 Health check endpoint: http://localhost:${PORT}/api/health`);
  console.log(`📰 News API endpoint: http://localhost:${PORT}/api/news`);
  console.log(`🔍 Search API endpoint: http://localhost:${PORT}/api/news/search?q=keyword`);
});