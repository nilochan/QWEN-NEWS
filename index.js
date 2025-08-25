const express = require('express');
const path = require('path');
const fs = require('fs');
const { 
  getAllNews, 
  getSingaporeNews, 
  getMalaysiaNews, 
  getBusinessNews, 
  getTechnologyNews, 
  getSportsNews, 
  getEntertainmentNews, 
  getHealthNews, 
  getScienceNews, 
  searchNews 
} = require('./scraper');

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files from the 'public' directory
app.use(express.static('public'));

// Middleware to log requests and update stats
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  
  // Update request stats
  const statsFile = path.join(__dirname, 'project-stats.json');
  try {
    let stats = {
      startTime: Date.now(),
      totalRequests: 0,
      totalScrapedArticles: 0,
      averageResponseTime: 0,
      errors: 0,
      lastUpdated: new Date().toISOString(),
      uptimeHours: 0
    };
    
    if (fs.existsSync(statsFile)) {
      stats = JSON.parse(fs.readFileSync(statsFile, 'utf8'));
    }
    
    stats.totalRequests += 1;
    stats.lastUpdated = new Date().toISOString();
    stats.uptimeHours = (Date.now() - stats.startTime) / (1000 * 60 * 60);
    
    fs.writeFileSync(statsFile, JSON.stringify(stats, null, 2));
  } catch (error) {
    console.error('Error updating request stats:', error.message);
  }
  
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
    // Update error stats
    const statsFile = path.join(__dirname, 'project-stats.json');
    try {
      let stats = {
        startTime: Date.now(),
        totalRequests: 0,
        totalScrapedArticles: 0,
        averageResponseTime: 0,
        errors: 0,
        lastUpdated: new Date().toISOString(),
        uptimeHours: 0
      };
      
      if (fs.existsSync(statsFile)) {
        stats = JSON.parse(fs.readFileSync(statsFile, 'utf8'));
      }
      
      stats.errors += 1;
      stats.lastUpdated = new Date().toISOString();
      
      fs.writeFileSync(statsFile, JSON.stringify(stats, null, 2));
    } catch (statsError) {
      console.error('Error updating error stats:', statsError.message);
    }
    
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
    // Update error stats
    const statsFile = path.join(__dirname, 'project-stats.json');
    try {
      let stats = {
        startTime: Date.now(),
        totalRequests: 0,
        totalScrapedArticles: 0,
        averageResponseTime: 0,
        errors: 0,
        lastUpdated: new Date().toISOString(),
        uptimeHours: 0
      };
      
      if (fs.existsSync(statsFile)) {
        stats = JSON.parse(fs.readFileSync(statsFile, 'utf8'));
      }
      
      stats.errors += 1;
      stats.lastUpdated = new Date().toISOString();
      
      fs.writeFileSync(statsFile, JSON.stringify(stats, null, 2));
    } catch (statsError) {
      console.error('Error updating error stats:', statsError.message);
    }
    
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
    // Update error stats
    const statsFile = path.join(__dirname, 'project-stats.json');
    try {
      let stats = {
        startTime: Date.now(),
        totalRequests: 0,
        totalScrapedArticles: 0,
        averageResponseTime: 0,
        errors: 0,
        lastUpdated: new Date().toISOString(),
        uptimeHours: 0
      };
      
      if (fs.existsSync(statsFile)) {
        stats = JSON.parse(fs.readFileSync(statsFile, 'utf8'));
      }
      
      stats.errors += 1;
      stats.lastUpdated = new Date().toISOString();
      
      fs.writeFileSync(statsFile, JSON.stringify(stats, null, 2));
    } catch (statsError) {
      console.error('Error updating error stats:', statsError.message);
    }
    
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
    // Update error stats
    const statsFile = path.join(__dirname, 'project-stats.json');
    try {
      let stats = {
        startTime: Date.now(),
        totalRequests: 0,
        totalScrapedArticles: 0,
        averageResponseTime: 0,
        errors: 0,
        lastUpdated: new Date().toISOString(),
        uptimeHours: 0
      };
      
      if (fs.existsSync(statsFile)) {
        stats = JSON.parse(fs.readFileSync(statsFile, 'utf8'));
      }
      
      stats.errors += 1;
      stats.lastUpdated = new Date().toISOString();
      
      fs.writeFileSync(statsFile, JSON.stringify(stats, null, 2));
    } catch (statsError) {
      console.error('Error updating error stats:', statsError.message);
    }
    
    res.status(500).json({
      status: 'error',
      message: 'Failed to fetch Business news',
      error: error.message
    });
  }
});

// API endpoint for Technology news only
app.get('/api/news/technology', async (req, res) => {
  try {
    const startTime = Date.now();
    const news = await getTechnologyNews();
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
    // Update error stats
    const statsFile = path.join(__dirname, 'project-stats.json');
    try {
      let stats = {
        startTime: Date.now(),
        totalRequests: 0,
        totalScrapedArticles: 0,
        averageResponseTime: 0,
        errors: 0,
        lastUpdated: new Date().toISOString(),
        uptimeHours: 0
      };
      
      if (fs.existsSync(statsFile)) {
        stats = JSON.parse(fs.readFileSync(statsFile, 'utf8'));
      }
      
      stats.errors += 1;
      stats.lastUpdated = new Date().toISOString();
      
      fs.writeFileSync(statsFile, JSON.stringify(stats, null, 2));
    } catch (statsError) {
      console.error('Error updating error stats:', statsError.message);
    }
    
    res.status(500).json({
      status: 'error',
      message: 'Failed to fetch Technology news',
      error: error.message
    });
  }
});

// API endpoint for Sports news only
app.get('/api/news/sports', async (req, res) => {
  try {
    const startTime = Date.now();
    const news = await getSportsNews();
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
    // Update error stats
    const statsFile = path.join(__dirname, 'project-stats.json');
    try {
      let stats = {
        startTime: Date.now(),
        totalRequests: 0,
        totalScrapedArticles: 0,
        averageResponseTime: 0,
        errors: 0,
        lastUpdated: new Date().toISOString(),
        uptimeHours: 0
      };
      
      if (fs.existsSync(statsFile)) {
        stats = JSON.parse(fs.readFileSync(statsFile, 'utf8'));
      }
      
      stats.errors += 1;
      stats.lastUpdated = new Date().toISOString();
      
      fs.writeFileSync(statsFile, JSON.stringify(stats, null, 2));
    } catch (statsError) {
      console.error('Error updating error stats:', statsError.message);
    }
    
    res.status(500).json({
      status: 'error',
      message: 'Failed to fetch Sports news',
      error: error.message
    });
  }
});

// API endpoint for Entertainment news only
app.get('/api/news/entertainment', async (req, res) => {
  try {
    const startTime = Date.now();
    const news = await getEntertainmentNews();
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
    // Update error stats
    const statsFile = path.join(__dirname, 'project-stats.json');
    try {
      let stats = {
        startTime: Date.now(),
        totalRequests: 0,
        totalScrapedArticles: 0,
        averageResponseTime: 0,
        errors: 0,
        lastUpdated: new Date().toISOString(),
        uptimeHours: 0
      };
      
      if (fs.existsSync(statsFile)) {
        stats = JSON.parse(fs.readFileSync(statsFile, 'utf8'));
      }
      
      stats.errors += 1;
      stats.lastUpdated = new Date().toISOString();
      
      fs.writeFileSync(statsFile, JSON.stringify(stats, null, 2));
    } catch (statsError) {
      console.error('Error updating error stats:', statsError.message);
    }
    
    res.status(500).json({
      status: 'error',
      message: 'Failed to fetch Entertainment news',
      error: error.message
    });
  }
});

// API endpoint for Health news only
app.get('/api/news/health', async (req, res) => {
  try {
    const startTime = Date.now();
    const news = await getHealthNews();
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
    // Update error stats
    const statsFile = path.join(__dirname, 'project-stats.json');
    try {
      let stats = {
        startTime: Date.now(),
        totalRequests: 0,
        totalScrapedArticles: 0,
        averageResponseTime: 0,
        errors: 0,
        lastUpdated: new Date().toISOString(),
        uptimeHours: 0
      };
      
      if (fs.existsSync(statsFile)) {
        stats = JSON.parse(fs.readFileSync(statsFile, 'utf8'));
      }
      
      stats.errors += 1;
      stats.lastUpdated = new Date().toISOString();
      
      fs.writeFileSync(statsFile, JSON.stringify(stats, null, 2));
    } catch (statsError) {
      console.error('Error updating error stats:', statsError.message);
    }
    
    res.status(500).json({
      status: 'error',
      message: 'Failed to fetch Health news',
      error: error.message
    });
  }
});

// API endpoint for Science news only
app.get('/api/news/science', async (req, res) => {
  try {
    const startTime = Date.now();
    const news = await getScienceNews();
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
    // Update error stats
    const statsFile = path.join(__dirname, 'project-stats.json');
    try {
      let stats = {
        startTime: Date.now(),
        totalRequests: 0,
        totalScrapedArticles: 0,
        averageResponseTime: 0,
        errors: 0,
        lastUpdated: new Date().toISOString(),
        uptimeHours: 0
      };
      
      if (fs.existsSync(statsFile)) {
        stats = JSON.parse(fs.readFileSync(statsFile, 'utf8'));
      }
      
      stats.errors += 1;
      stats.lastUpdated = new Date().toISOString();
      
      fs.writeFileSync(statsFile, JSON.stringify(stats, null, 2));
    } catch (statsError) {
      console.error('Error updating error stats:', statsError.message);
    }
    
    res.status(500).json({
      status: 'error',
      message: 'Failed to fetch Science news',
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
    // Update error stats
    const statsFile = path.join(__dirname, 'project-stats.json');
    try {
      let stats = {
        startTime: Date.now(),
        totalRequests: 0,
        totalScrapedArticles: 0,
        averageResponseTime: 0,
        errors: 0,
        lastUpdated: new Date().toISOString(),
        uptimeHours: 0
      };
      
      if (fs.existsSync(statsFile)) {
        stats = JSON.parse(fs.readFileSync(statsFile, 'utf8'));
      }
      
      stats.errors += 1;
      stats.lastUpdated = new Date().toISOString();
      
      fs.writeFileSync(statsFile, JSON.stringify(stats, null, 2));
    } catch (statsError) {
      console.error('Error updating error stats:', statsError.message);
    }
    
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

// Stats endpoint
app.get('/api/stats', (req, res) => {
  const statsFile = path.join(__dirname, 'project-stats.json');
  
  try {
    if (fs.existsSync(statsFile)) {
      const stats = JSON.parse(fs.readFileSync(statsFile, 'utf8'));
      res.json({
        status: 'success',
        data: stats
      });
    } else {
      res.json({
        status: 'success',
        data: {
          startTime: Date.now(),
          totalRequests: 0,
          totalScrapedArticles: 0,
          averageResponseTime: 0,
          errors: 0,
          lastUpdated: new Date().toISOString(),
          uptimeHours: 0
        }
      });
    }
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Failed to fetch stats',
      error: error.message
    });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
  console.log(`📊 Health check endpoint: http://localhost:${PORT}/api/health`);
  console.log(`📈 Stats endpoint: http://localhost:${PORT}/api/stats`);
  console.log(`📰 News API endpoint: http://localhost:${PORT}/api/news`);
  console.log(`🔍 Search API endpoint: http://localhost:${PORT}/api/news/search?q=keyword`);
  
  // Initialize stats file
  const statsFile = path.join(__dirname, 'project-stats.json');
  if (!fs.existsSync(statsFile)) {
    const initialStats = {
      startTime: Date.now(),
      totalRequests: 0,
      totalScrapedArticles: 0,
      averageResponseTime: 0,
      errors: 0,
      lastUpdated: new Date().toISOString(),
      uptimeHours: 0
    };
    fs.writeFileSync(statsFile, JSON.stringify(initialStats, null, 2));
  }
});