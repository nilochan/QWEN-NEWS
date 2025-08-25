const axios = require('axios');
const cheerio = require('cheerio');

// News sources with selectors for titles, links, images, and dates
const NEWS_SOURCES = {
  singapore: [
    {
      name: 'Channel NewsAsia',
      url: 'https://www.channelnewsasia.com',
      selectors: {
        container: 'article, .card, .story',
        title: 'h1 a, h2 a, h3 a',
        link: 'h1 a, h2 a, h3 a',
        image: 'img',
        date: '.date, time, .timestamp'
      }
    },
    {
      name: 'The Straits Times',
      url: 'https://www.straitstimes.com',
      selectors: {
        container: 'article, .card, .story',
        title: 'h1 a, h2 a, h3 a',
        link: 'h1 a, h2 a, h3 a',
        image: 'img',
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
        title: 'h2 a, h3 a',
        link: 'h2 a, h3 a',
        image: 'img',
        date: '.date, time, .timestamp'
      }
    },
    {
      name: 'Malay Mail',
      url: 'https://www.malaymail.com',
      selectors: {
        container: 'article, .card, .story',
        title: 'h2 a, h3 a',
        link: 'h2 a, h3 a',
        image: 'img',
        date: '.date, time, .timestamp'
      }
    }
  ],
  business: [
    {
      name: 'CNBC',
      url: 'https://www.cnbc.com',
      selectors: {
        container: 'article, .card, .story',
        title: 'h2 a, h3 a',
        link: 'h2 a, h3 a',
        image: 'img',
        date: '.date, time, .timestamp'
      }
    },
    {
      name: 'Bloomberg',
      url: 'https://www.bloomberg.com',
      selectors: {
        container: 'article, .card, .story',
        title: 'h1 a, h2 a, h3 a',
        link: 'h1 a, h2 a, h3 a',
        image: 'img',
        date: '.date, time, .timestamp'
      }
    }
  ]
};

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

// Function to scrape news from a source
async function scrapeNewsSource(source, category = 'general') {
  try {
    const response = await axios.get(source.url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36'
      },
      timeout: 10000 // 10 second timeout
    });
    
    const $ = cheerio.load(response.data);
    const articles = [];
    
    // Find all article containers
    const containers = $(source.selectors.container);
    
    containers.each((index, element) => {
      if (index >= 15) return; // Limit to 15 articles per source
      
      // Find title and link within the container
      const titleElement = $(element).find(source.selectors.title).first();
      const title = titleElement.text().trim();
      let link = titleElement.attr('href');
      
      // Skip if no title or link
      if (!title || !link) return;
      
      // Handle relative links
      if (link && !link.startsWith('http')) {
        link = link.startsWith('/') ? `${source.url}${link}` : `${source.url}/${link}`;
      }
      
      // Extract date
      const timestamp = extractDate($, element, source);
      
      // Try to find an image for the article
      let image = null;
      const imageElement = $(element).find('img').first();
      if (imageElement.length > 0) {
        image = imageElement.attr('src') || imageElement.attr('data-src');
        // Handle relative image URLs
        if (image && !image.startsWith('http')) {
          image = image.startsWith('/') ? `${source.url}${image}` : `${source.url}/${image}`;
        }
      }
      
      // Use a placeholder image if no image found
      if (!image) {
        image = getDefaultImage(category);
      }
      
      // Create a unique ID for the article
      const articleId = `${source.name}-${title.substring(0, 50)}-${timestamp.getTime()}`.replace(/[^a-zA-Z0-9-]/g, '-');
      
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
    
    return articles;
  } catch (error) {
    console.error(`Error scraping ${source.name}:`, error.message);
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
  
  // Scrape Singapore news
  for (const source of NEWS_SOURCES.singapore) {
    const articles = await scrapeNewsSource(source, 'singapore');
    allNews.push(...articles);
  }
  
  // Scrape Malaysia news
  for (const source of NEWS_SOURCES.malaysia) {
    const articles = await scrapeNewsSource(source, 'malaysia');
    allNews.push(...articles);
  }
  
  // Scrape Business news
  for (const source of NEWS_SOURCES.business) {
    const articles = await scrapeNewsSource(source, 'business');
    allNews.push(...articles);
  }
  
  const endTime = Date.now();
  console.log(`Scraped ${allNews.length} articles in ${endTime - startTime}ms`);
  
  return allNews;
}

// Function to get Singapore news only
async function getSingaporeNews() {
  const singaporeNews = [];
  
  for (const source of NEWS_SOURCES.singapore) {
    const articles = await scrapeNewsSource(source, 'singapore');
    singaporeNews.push(...articles);
  }
  
  return singaporeNews;
}

// Function to get Malaysia news only
async function getMalaysiaNews() {
  const malaysiaNews = [];
  
  for (const source of NEWS_SOURCES.malaysia) {
    const articles = await scrapeNewsSource(source, 'malaysia');
    malaysiaNews.push(...articles);
  }
  
  return malaysiaNews;
}

// Function to get Business news only
async function getBusinessNews() {
  const businessNews = [];
  
  for (const source of NEWS_SOURCES.business) {
    const articles = await scrapeNewsSource(source, 'business');
    businessNews.push(...articles);
  }
  
  return businessNews;
}

// Function to search news by keyword
async function searchNews(keyword) {
  const allNews = await getAllNews();
  const searchTerm = keyword.toLowerCase();
  
  return allNews.filter(article => 
    article.title.toLowerCase().includes(searchTerm) ||
    article.source.toLowerCase().includes(searchTerm)
  );
}

module.exports = {
  getAllNews,
  getSingaporeNews,
  getMalaysiaNews,
  getBusinessNews,
  searchNews,
  NEWS_SOURCES
};