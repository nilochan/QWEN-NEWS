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

// Create HTTP server and Socket.IO instance
const server = require('http').createServer(app);
const io = require('socket.io')(server);

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

// Store connected users for chat
const connectedUsers = new Map();

// Socket.IO connection handling
io.on('connection', (socket) => {
  console.log('User connected:', socket.id);
  
  // Handle user joining chat
  socket.on('join-chat', (userData) => {
    const user = {
      id: socket.id,
      name: userData.name || 'Anonymous',
      joinTime: new Date()
    };
    
    connectedUsers.set(socket.id, user);
    console.log('User joined chat:', user.name);
    
    // Broadcast to all users that someone joined
    io.emit('user-joined', {
      message: `${user.name} joined the chat`,
      user: user.name,
      timestamp: new Date().toISOString()
    });
    
    // Send current user list to everyone
    io.emit('update-users', Array.from(connectedUsers.values()).map(u => u.name));
  });
  
  // Handle incoming messages
  socket.on('send-message', (messageData) => {
    const user = connectedUsers.get(socket.id);
    if (user) {
      const message = {
        user: user.name,
        text: messageData.text,
        timestamp: new Date().toISOString()
      };
      
      console.log('Message received:', message);
      
      // Broadcast message to all connected clients
      io.emit('receive-message', message);
    }
  });
  
  // Handle user disconnecting
  socket.on('disconnect', () => {
    const user = connectedUsers.get(socket.id);
    if (user) {
      console.log('User disconnected:', user.name);
      connectedUsers.delete(socket.id);
      
      // Broadcast to all users that someone left
      io.emit('user-left', {
        message: `${user.name} left the chat`,
        user: user.name,
        timestamp: new Date().toISOString()
      });
      
      // Send updated user list to everyone
      io.emit('update-users', Array.from(connectedUsers.values()).map(u => u.name));
    }
  });
});

// Store connected users
const users = new Map();

// Socket.IO connection handling
io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);
  
  // Handle user joining chat
  socket.on('join', (username) => {
    users.set(socket.id, username);
    io.emit('userJoined', `${username} joined the chat`);
    io.emit('onlineUsers', Array.from(users.values()));
    console.log(`${username} joined the chat`);
  });
  
  // Handle incoming messages
  socket.on('message', (data) => {
    const username = users.get(socket.id) || 'Anonymous';
    const messageData = {
      username: username,
      message: data.message,
      timestamp: new Date().toISOString()
    };
    
    // Broadcast message to all connected clients
    io.emit('message', messageData);
    console.log('Message sent:', messageData);
  });
  
  // Handle user disconnecting
  socket.on('disconnect', () => {
    const username = users.get(socket.id) || 'Anonymous';
    users.delete(socket.id);
    io.emit('userLeft', `${username} left the chat`);
    io.emit('onlineUsers', Array.from(users.values()));
    console.log(`${username} left the chat`);
  });
});

server.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
  console.log(`📊 Health check endpoint: http://localhost:${PORT}/api/health`);
  console.log(`📈 Stats endpoint: http://localhost:${PORT}/api/stats`);
  console.log(`📰 News API endpoint: http://localhost:${PORT}/api/news`);
  console.log(`🔍 Search API endpoint: http://localhost:${PORT}/api/news/search?q=keyword`);
  console.log(`💬 Chat endpoint: ws://localhost:${PORT}`);
  
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