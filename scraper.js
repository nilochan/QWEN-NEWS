const axios = require('axios');
const cheerio = require('cheerio');

// News sources with selectors for titles, links, and images
const NEWS_SOURCES = {
  singapore: [
    {
      name: 'Channel NewsAsia',
      url: 'https://www.channelnewsasia.com',
      selectors: {
        title: 'h1 a',
        link: 'h1 a',
        image: 'img'
      }
    },
    {
      name: 'The Straits Times',
      url: 'https://www.straitstimes.com',
      selectors: {
        title: 'h1 a, h2 a, h3 a',
        link: 'h1 a, h2 a, h3 a',
        image: 'img'
      }
    }
  ],
  malaysia: [
    {
      name: 'The Star',
      url: 'https://www.thestar.com.my',
      selectors: {
        title: 'h2 a, h3 a',
        link: 'h2 a, h3 a',
        image: 'img'
      }
    },
    {
      name: 'Malay Mail',
      url: 'https://www.malaymail.com',
      selectors: {
        title: 'h2 a, h3 a',
        link: 'h2 a, h3 a',
        image: 'img'
      }
    }
  ],
  business: [
    {
      name: 'CNBC',
      url: 'https://www.cnbc.com',
      selectors: {
        title: 'h2 a, h3 a',
        link: 'h2 a, h3 a',
        image: 'img'
      }
    },
    {
      name: 'Bloomberg',
      url: 'https://www.bloomberg.com',
      selectors: {
        title: 'h1 a, h2 a, h3 a',
        link: 'h1 a, h2 a, h3 a',
        image: 'img'
      }
    }
  ]
};

// Function to scrape news from a source
async function scrapeNewsSource(source, category = 'general') {
  try {
    const response = await axios.get(source.url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      }
    });
    
    const $ = cheerio.load(response.data);
    const articles = [];
    
    // Extract articles based on selectors
    const titleElements = $(source.selectors.title);
    
    titleElements.each((index, element) => {
      if (index >= 10) return; // Limit to 10 articles per source
      
      const title = $(element).text().trim();
      let link = $(element).attr('href');
      
      // Handle relative links
      if (link && !link.startsWith('http')) {
        link = link.startsWith('/') ? `${source.url}${link}` : `${source.url}/${link}`;
      }
      
      // Try to find an image for the article
      let image = null;
      const imageElement = $(element).closest('article, .card, .story, .item').find('img').first();
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
      
      if (title && link) {
        articles.push({
          title,
          link,
          source: source.name,
          image,
          category,
          timestamp: new Date()
        });
      }
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

module.exports = {
  getAllNews,
  getSingaporeNews,
  getMalaysiaNews,
  getBusinessNews,
  NEWS_SOURCES
};