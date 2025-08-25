const fs = require('fs');
const path = require('path');

// Monitoring script for QWEN-NEWS project
class ProjectMonitor {
  constructor() {
    this.logFile = path.join(__dirname, 'monitoring.log');
    this.statsFile = path.join(__dirname, 'project-stats.json');
    this.startTime = Date.now();
    
    // Initialize stats file if it doesn't exist
    if (!fs.existsSync(this.statsFile)) {
      fs.writeFileSync(this.statsFile, JSON.stringify({
        startTime: this.startTime,
        totalRequests: 0,
        totalScrapedArticles: 0,
        averageResponseTime: 0,
        errors: 0,
        lastUpdated: new Date().toISOString()
      }, null, 2));
    }
  }

  // Log a message to the monitoring log
  log(message, level = 'INFO') {
    const timestamp = new Date().toISOString();
    const logEntry = `[${timestamp}] ${level}: ${message}
`;
    fs.appendFileSync(this.logFile, logEntry);
    console.log(logEntry.trim());
  }

  // Update project statistics
  updateStats(stats) {
    try {
      const currentStats = JSON.parse(fs.readFileSync(this.statsFile, 'utf8'));
      
      // Update stats
      Object.keys(stats).forEach(key => {
        if (currentStats[key] !== undefined) {
          currentStats[key] += stats[key];
        }
      });
      
      // Update last updated time
      currentStats.lastUpdated = new Date().toISOString();
      
      // Calculate uptime
      currentStats.uptimeHours = (Date.now() - currentStats.startTime) / (1000 * 60 * 60);
      
      fs.writeFileSync(this.statsFile, JSON.stringify(currentStats, null, 2));
      this.log(`Updated stats: ${JSON.stringify(stats)}`);
    } catch (error) {
      this.log(`Error updating stats: ${error.message}`, 'ERROR');
    }
  }

  // Get current project statistics
  getStats() {
    try {
      return JSON.parse(fs.readFileSync(this.statsFile, 'utf8'));
    } catch (error) {
      this.log(`Error reading stats: ${error.message}`, 'ERROR');
      return null;
    }
  }

  // Display current statistics
  displayStats() {
    const stats = this.getStats();
    if (!stats) {
      console.log('Unable to retrieve statistics');
      return;
    }

    console.log('
=== QWEN-NEWS Project Monitoring ===');
    console.log(`Start Time: ${new Date(stats.startTime).toLocaleString()}`);
    console.log(`Uptime: ${stats.uptimeHours.toFixed(2)} hours`);
    console.log(`Total Requests: ${stats.totalRequests}`);
    console.log(`Total Scraped Articles: ${stats.totalScrapedArticles}`);
    console.log(`Average Response Time: ${stats.averageResponseTime.toFixed(2)}ms`);
    console.log(`Errors: ${stats.errors}`);
    console.log(`Last Updated: ${new Date(stats.lastUpdated).toLocaleString()}`);
    console.log('=====================================
');
  }

  // Monitor API endpoint
  monitorEndpoint() {
    // This would typically make HTTP requests to your API endpoints
    // For now, we'll just log that monitoring is active
    this.log('Monitoring endpoint check');
  }
}

// Create monitor instance
const monitor = new ProjectMonitor();

// Handle process events
process.on('SIGINT', () => {
  monitor.log('Process interrupted (SIGINT)', 'WARN');
  process.exit(0);
});

process.on('SIGTERM', () => {
  monitor.log('Process terminated (SIGTERM)', 'WARN');
  process.exit(0);
});

process.on('uncaughtException', (error) => {
  monitor.log(`Uncaught exception: ${error.message}`, 'ERROR');
  process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
  monitor.log(`Unhandled rejection at: ${promise}, reason: ${reason}`, 'ERROR');
});

// Export for use in other modules
module.exports = ProjectMonitor;

// If run directly, display stats
if (require.main === module) {
  monitor.displayStats();
  
  // Set up periodic monitoring
  setInterval(() => {
    monitor.monitorEndpoint();
  }, 30000); // Check every 30 seconds
}