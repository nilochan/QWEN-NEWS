const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');
const path = require('path');

// Enhanced news sources with better selectors and more sources
const NEWS_SOURCES = {
  singapore: [
    {
      name: 'Channel NewsAsia',
      url: 'https://www.channelnewsasia.com',
      selectors: {
        container: 'article, .media-object, .card',
        title: 'h1 a, h2 a, h3 a, .teaser__title a',
        link: 'h1 a, h2 a, h3 a, .teaser__title a',
        image: 'img, .media-object__image',
        date: '.date, time, .timestamp, .teaser__timestamp'
      }
    },
    {
      name: 'The Straits Times',
      url: 'https://www.straitstimes.com',
      selectors: {
        container: 'article, .card, .story-card, .block-preview',
        title: 'h1 a, h2 a, h3 a, .headline',
        link: 'h1 a, h2 a, h3 a, .headline-link',
        image: 'img, .image-container img',
        date: '.date, time, .timestamp'
      }
    },
    {
      name: 'Today Online',
      url: 'https://www.todayonline.com',
      selectors: {
        container: 'article, .card, .teaser',
        title: 'h1 a, h2 a, h3 a, .teaser__title',
        link: 'h1 a, h2 a, h3 a, .teaser__title a',
        image: 'img, .teaser__image',
        date: '.date, time, .timestamp'
      }
    },
    {
      name: 'Mothership',
      url: 'https://mothership.sg',
      selectors: {
        container: 'article, .post-block, .card',
        title: 'h1 a, h2 a, h3 a, .post-title',
        link: 'h1 a, h2 a, h3 a, .post-title a',
        image: 'img, .post-image',
        date: '.date, time, .timestamp'
      }
    }
  ],
  malaysia: [
    {
      name: 'The Star',
      url: 'https://www.thestar.com.my',
      selectors: {
        container: 'article, .card, .story',
        title: 'h2 a, h3 a, .title',
        link: 'h2 a, h3 a, .title a',
        image: 'img, .image',
        date: '.date, time, .timestamp'
      }
    },
    {
      name: 'Malay Mail',
      url: 'https://www.malaymail.com',
      selectors: {
        container: 'article, .card, .story-item',
        title: 'h2 a, h3 a, .headline',
        link: 'h2 a, h3 a, .headline a',
        image: 'img, .story-image',
        date: '.date, time, .timestamp'
      }
    },
    {
      name: 'NST Online',
      url: 'https://www.nst.com.my',
      selectors: {
        container: 'article, .card, .teaser',
        title: 'h2 a, h3 a, .title',
        link: 'h2 a, h3 a, .title a',
        image: 'img, .teaser-image',
        date: '.date, time, .timestamp'
      }
    },
    {
      name: 'Free Malaysia Today',
      url: 'https://www.freemalaysiatoday.com',
      selectors: {
        container: 'article, .post, .card',
        title: 'h2 a, h3 a, .post-title',
        link: 'h2 a, h3 a, .post-title a',
        image: 'img, .post-image',
        date: '.date, time, .timestamp'
      }
    }
  ],
  business: [
    {
      name: 'CNBC',
      url: 'https://www.cnbc.com',
      selectors: {
        container: 'article, .Card, .story',
        title: 'h2 a, h3 a, .Card-title',
        link: 'h2 a, h3 a, .Card-title a',
        image: 'img, .Card-image',
        date: '.date, time, .timestamp'
      }
    },
    {
      name: 'Bloomberg',
      url: 'https://www.bloomberg.com',
      selectors: {
        container: 'article, .card, .story',
        title: 'h1 a, h2 a, h3 a, .story-title',
        link: 'h1 a, h2 a, h3 a, .story-title a',
        image: 'img, .story-image',
        date: '.date, time, .timestamp'
      }
    },
    {
      name: 'Reuters',
      url: 'https://www.reuters.com',
      selectors: {
        container: 'article, .story, .media-story',
        title: 'h2 a, h3 a, .story-title',
        link: 'h2 a, h3 a, .story-title a',
        image: 'img, .story-image',
        date: '.date, time, .timestamp'
      }
    },
    {
      name: 'Financial Times',
      url: 'https://www.ft.com',
      selectors: {
        container: 'article, .o-teaser, .story',
        title: 'h2 a, h3 a, .o-teaser__heading',
        link: 'h2 a, h3 a, .o-teaser__heading a',
        image: 'img, .o-teaser__image',
        date: '.date, time, .timestamp'
      }
    }
  ],
  technology: [
    {
      name: 'TechCrunch',
      url: 'https://techcrunch.com',
      selectors: {
        container: 'article, .post-block, .card',
        title: 'h2 a, h3 a, .post-title',
        link: 'h2 a, h3 a, .post-title a',
        image: 'img, .post-image',
        date: '.date, time, .timestamp'
      }
    },
    {
      name: 'The Verge',
      url: 'https://www.theverge.com',
      selectors: {
        container: 'article, .c-entry-box, .card',
        title: 'h2 a, h3 a, .c-entry-box__title',
        link: 'h2 a, h3 a, .c-entry-box__title a',
        image: 'img, .c-entry-box__image',
        date: '.date, time, .timestamp'
      }
    }
  ],
  sports: [
    {
      name: 'ESPN',
      url: 'https://www.espn.com',
      selectors: {
        container: 'article, .content-item, .card',
        title: 'h1 a, h2 a, h3 a, .content-item__title',
        link: 'h1 a, h2 a, h3 a, .content-item__title a',
        image: 'img, .content-item__image',
        date: '.date, time, .timestamp'
      }
    },
    {
      name: 'Sports Illustrated',
      url: 'https://www.si.com',
      selectors: {
        container: 'article, .molecules-card, .card',
        title: 'h2 a, h3 a, .molecules-card__title',
        link: 'h2 a, h3 a, .molecules-card__title a',
        image: 'img, .molecules-card__image',
        date: '.date, time, .timestamp'
      }
    }
  ]
};

// Function to update project statistics
function updateStats(stats) {
  const statsFile = path.join(__dirname, 'project-stats.json');
  
  try {
    let currentStats = {
      startTime: Date.now(),
      totalRequests: 0,
      totalScrapedArticles: 0,
      averageResponseTime: 0,
      errors: 0,
      lastUpdated: new Date().toISOString(),
      uptimeHours: 0
    };
    
    // Load existing stats if file exists
    if (fs.existsSync(statsFile)) {
      currentStats = JSON.parse(fs.readFileSync(statsFile, 'utf8'));
    }
    
    // Update stats
    Object.keys(stats).forEach(key => {
      if (currentStats[key] !== undefined) {
        currentStats[key] += stats[key];
      }
    });
    
    // Calculate uptime
    currentStats.uptimeHours = (Date.now() - currentStats.startTime) / (1000 * 60 * 60);
    currentStats.lastUpdated = new Date().toISOString();
    
    // Save updated stats
    fs.writeFileSync(statsFile, JSON.stringify(currentStats, null, 2));
  } catch (error) {
    console.error('Error updating stats:', error.message);
  }
}

// Function to extract and parse date from element
function extractDate($, element, source) {
  try {
    // Look for date elements within the article container
    const dateElement = $(element).find(source.selectors.date).first();
    if (dateElement.length > 0) {
      const dateText = dateElement.text().trim() || dateElement.attr('datetime');
      if (dateText) {
        // Try to parse the date
        const parsedDate = new Date(dateText);
        if (!isNaN(parsedDate.getTime())) {
          return parsedDate;
        }
      }
    }
    
    // If no date found, try to find it in the article metadata
    const timeElement = $(element).find('time').first();
    if (timeElement.length > 0) {
      const dateTime = timeElement.attr('datetime') || timeElement.text().trim();
      if (dateTime) {
        const parsedDate = new Date(dateTime);
        if (!isNaN(parsedDate.getTime())) {
          return parsedDate;
        }
      }
    }
    
    // If still no date, return current date
    return new Date();
  } catch (error) {
    // If any error occurs, return current date
    return new Date();
  }
}

// Function to scrape news from a source with enhanced logic
async function scrapeNewsSource(source, category = 'general') {
  try {
    const response = await axios.get(source.url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.5',
        'Accept-Encoding': 'gzip, deflate',
        'Connection': 'keep-alive',
        'Upgrade-Insecure-Requests': '1',
      },
      timeout: 15000 // 15 second timeout
    });
    
    const $ = cheerio.load(response.data);
    const articles = [];
    
    // Try multiple container selectors
    const containerSelectors = source.selectors.container.split(',').map(s => s.trim());
    let containers = [];
    
    for (const selector of containerSelectors) {
      const found = $(selector);
      if (found.length > 0) {
        containers = found;
        break;
      }
    }
    
    // If still no containers found, try broader selectors
    if (containers.length === 0) {
      containers = $('article, .card, .story, .post, .item');
    }
    
    console.log(`Found ${containers.length} containers for ${source.name}`);
    
    containers.each((index, element) => {
      if (index >= 25) return; // Increase limit to 25 articles per source
      
      // Try multiple title selectors
      const titleSelectors = source.selectors.title.split(',').map(s => s.trim());
      let titleElement = null;
      let title = '';
      
      for (const selector of titleSelectors) {
        const element = $(element).find(selector).first();
        if (element.length > 0 && element.text().trim()) {
          titleElement = element;
          title = element.text().trim();
          break;
        }
      }
      
      // Skip if no title
      if (!title) return;
      
      // Try multiple link selectors
      let link = '';
      if (titleElement && titleElement.attr('href')) {
        link = titleElement.attr('href');
      } else {
        const linkSelectors = source.selectors.link.split(',').map(s => s.trim());
        for (const selector of linkSelectors) {
          const linkElement = $(element).find(selector).first();
          if (linkElement.length > 0 && linkElement.attr('href')) {
            link = linkElement.attr('href');
            break;
          }
        }
      }
      
      // Skip if no link
      if (!link) return;
      
      // Handle relative links
      if (link && !link.startsWith('http')) {
        // Handle protocol-relative URLs
        if (link.startsWith('//')) {
          link = 'https:' + link;
        } else if (link.startsWith('/')) {
          link = source.url + link;
        } else {
          link = source.url + '/' + link;
        }
      }
      
      // Extract date
      const timestamp = extractDate($, element, source);
      
      // Try to find an image for the article
      let image = null;
      const imageSelectors = source.selectors.image.split(',').map(s => s.trim());
      
      for (const selector of imageSelectors) {
        const imageElement = $(element).find(selector).first();
        if (imageElement.length > 0) {
          image = imageElement.attr('src') || imageElement.attr('data-src') || imageElement.attr('data-lazy-src');
          if (image) break;
        }
      }
      
      // If no image found in specific selectors, try general image search
      if (!image) {
        const generalImage = $(element).find('img').first();
        if (generalImage.length > 0) {
          image = generalImage.attr('src') || generalImage.attr('data-src') || generalImage.attr('data-lazy-src');
        }
      }
      
      // Handle relative image URLs
      if (image && !image.startsWith('http')) {
        // Handle protocol-relative URLs
        if (image.startsWith('//')) {
          image = 'https:' + image;
        } else if (image.startsWith('/')) {
          image = source.url + image;
        } else {
          image = source.url + '/' + image;
        }
      }
      
      // Use a placeholder image if no image found
      if (!image) {
        image = getDefaultImage(category);
      }
      
      // Create a unique ID for the article
      const articleId = `${source.name}-${title.substring(0, 30)}-${timestamp.getTime()}`.replace(/[^a-zA-Z0-9-]/g, '-');
      
      // Avoid duplicates by checking if we already have this article
      const isDuplicate = articles.some(article => article.title === title && article.source === source.name);
      if (isDuplicate) return;
      
      articles.push({
        id: articleId,
        title,
        link,
        source: source.name,
        image,
        category,
        timestamp: timestamp.toISOString(),
        displayDate: timestamp.toLocaleDateString('en-US', { 
          year: 'numeric', 
          month: 'short', 
          day: 'numeric' 
        })
      });
    });
    
    console.log(`Scraped ${articles.length} articles from ${source.name}`);
    return articles;
  } catch (error) {
    console.error(`Error scraping ${source.name}:`, error.message);
    updateStats({ errors: 1 });
    return [];
  }
}

// Function to get default placeholder images based on category
function getDefaultImage(category) {
  const defaultImages = {
    general: 'https://placehold.co/600x400/2563eb/white?text=General+News',
    singapore: 'https://placehold.co/600x400/0ea5e9/white?text=Singapore+News',
    malaysia: 'https://placehold.co/600x400/8b5cf6/white?text=Malaysia+News',
    business: 'https://placehold.co/600x400/10b981/white?text=Business+News',
    technology: 'https://placehold.co/600x400/f59e0b/white?text=Tech+News',
    sports: 'https://placehold.co/600x400/ef4444/white?text=Sports+News',
    entertainment: 'https://placehold.co/600x400/ec4899/white?text=Entertainment'
  };
  
  return defaultImages[category] || defaultImages.general;
}

// Function to get all news from all sources
async function getAllNews() {
  const startTime = Date.now();
  const allNews = [];
  
  // Scrape all categories
  const categories = ['singapore', 'malaysia', 'business', 'technology', 'sports'];
  
  for (const category of categories) {
    if (NEWS_SOURCES[category]) {
      for (const source of NEWS_SOURCES[category]) {
        const articles = await scrapeNewsSource(source, category);
        allNews.push(...articles);
      }
    }
  }
  
  const endTime = Date.now();
  const responseTime = endTime - startTime;
  
  console.log(`Total scraped ${allNews.length} articles in ${responseTime}ms`);
  
  // Update stats
  updateStats({
    totalRequests: 1,
    totalScrapedArticles: allNews.length,
    averageResponseTime: responseTime
  });
  
  return allNews;
}

// Function to get Singapore news only
async function getSingaporeNews() {
  const startTime = Date.now();
  const singaporeNews = [];
  
  if (NEWS_SOURCES.singapore) {
    for (const source of NEWS_SOURCES.singapore) {
      const articles = await scrapeNewsSource(source, 'singapore');
      singaporeNews.push(...articles);
    }
  }
  
  const endTime = Date.now();
  const responseTime = endTime - startTime;
  
  console.log(`Scraped ${singaporeNews.length} Singapore articles in ${responseTime}ms`);
  
  // Update stats
  updateStats({
    totalRequests: 1,
    totalScrapedArticles: singaporeNews.length,
    averageResponseTime: responseTime
  });
  
  return singaporeNews;
}

// Function to get Malaysia news only
async function getMalaysiaNews() {
  const startTime = Date.now();
  const malaysiaNews = [];
  
  if (NEWS_SOURCES.malaysia) {
    for (const source of NEWS_SOURCES.malaysia) {
      const articles = await scrapeNewsSource(source, 'malaysia');
      malaysiaNews.push(...articles);
    }
  }
  
  const endTime = Date.now();
  const responseTime = endTime - startTime;
  
  console.log(`Scraped ${malaysiaNews.length} Malaysia articles in ${responseTime}ms`);
  
  // Update stats
  updateStats({
    totalRequests: 1,
    totalScrapedArticles: malaysiaNews.length,
    averageResponseTime: responseTime
  });
  
  return malaysiaNews;
}

// Function to get Business news only
async function getBusinessNews() {
  const startTime = Date.now();
  const businessNews = [];
  
  if (NEWS_SOURCES.business) {
    for (const source of NEWS_SOURCES.business) {
      const articles = await scrapeNewsSource(source, 'business');
      businessNews.push(...articles);
    }
  }
  
  const endTime = Date.now();
  const responseTime = endTime - startTime;
  
  console.log(`Scraped ${businessNews.length} Business articles in ${responseTime}ms`);
  
  // Update stats
  updateStats({
    totalRequests: 1,
    totalScrapedArticles: businessNews.length,
    averageResponseTime: responseTime
  });
  
  return businessNews;
}

// Function to get Technology news only
async function getTechnologyNews() {
  const startTime = Date.now();
  const technologyNews = [];
  
  if (NEWS_SOURCES.technology) {
    for (const source of NEWS_SOURCES.technology) {
      const articles = await scrapeNewsSource(source, 'technology');
      technologyNews.push(...articles);
    }
  }
  
  const endTime = Date.now();
  const responseTime = endTime - startTime;
  
  console.log(`Scraped ${technologyNews.length} Technology articles in ${responseTime}ms`);
  
  // Update stats
  updateStats({
    totalRequests: 1,
    totalScrapedArticles: technologyNews.length,
    averageResponseTime: responseTime
  });
  
  return technologyNews;
}

// Function to get Sports news only
async function getSportsNews() {
  const startTime = Date.now();
  const sportsNews = [];
  
  if (NEWS_SOURCES.sports) {
    for (const source of NEWS_SOURCES.sports) {
      const articles = await scrapeNewsSource(source, 'sports');
      sportsNews.push(...articles);
    }
  }
  
  const endTime = Date.now();
  const responseTime = endTime - startTime;
  
  console.log(`Scraped ${sportsNews.length} Sports articles in ${responseTime}ms`);
  
  // Update stats
  updateStats({
    totalRequests: 1,
    totalScrapedArticles: sportsNews.length,
    averageResponseTime: responseTime
  });
  
  return sportsNews;
}

// Function to search news by keyword
async function searchNews(keyword) {
  const startTime = Date.now();
  const allNews = await getAllNews();
  const searchTerm = keyword.toLowerCase();
  
  const results = allNews.filter(article => 
    article.title.toLowerCase().includes(searchTerm) ||
    article.source.toLowerCase().includes(searchTerm)
  );
  
  const endTime = Date.now();
  const responseTime = endTime - startTime;
  
  // Update stats
  updateStats({
    totalRequests: 1,
    averageResponseTime: responseTime
  });
  
  return results;
}

module.exports = {
  getAllNews,
  getSingaporeNews,
  getMalaysiaNews,
  getBusinessNews,
  getTechnologyNews,
  getSportsNews,
  searchNews,
  NEWS_SOURCES
};