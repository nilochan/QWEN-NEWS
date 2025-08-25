const axios = require('axios');
const cheerio = require('cheerio');

// Sample news sources - to be expanded
const NEWS_SOURCES = {
  singapore: [
    {
      name: 'Channel NewsAsia',
      url: 'https://www.channelnewsasia.com',
      selector: 'h1.h3___1NFeH a' // Example selector, needs to be updated with actual selectors
    },
    {
      name: 'The Straits Times',
      url: 'https://www.straitstimes.com',
      selector: 'h1 a' // Example selector, needs to be updated with actual selectors
    },
    {
      name: 'Today Online',
      url: 'https://www.todayonline.com',
      selector: 'h3 a' // Example selector, needs to actual selectors
    }
  ],
  malaysia: [
    {
      name: 'The Star',
      url: 'https://www.thestar.com.my',
      selector: 'h2.f18___2QcMC a' // Example selector, needs to be updated with actual selectors
    },
    {
      name: 'Malay Mail',
      url: 'https://www.malaymail.com',
      selector: 'h2 a' // Example selector, needs to be updated with actual selectors
    },
    {
      name: 'NST Online',
      url: 'https://www.nst.com.my',
      selector: 'h3 a' // Example selector, needs to be updated with actual selectors
    }
  ]
};

// Function to scrape news from a source
async function scrapeNewsSource(source) {
  try {
    const response = await axios.get(source.url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      }
    });
    
    const $ = cheerio.load(response.data);
    const articles = [];
    
    $(source.selector).each((index, element) => {
      const title = $(element).text().trim();
      const link = $(element).attr('href');
      
      if (title && link) {
        articles.push({
          title,
          link: link.startsWith('http') ? link : `${source.url}${link}`,
          source: source.name,
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

// Function to get all news from all sources
async function getAllNews() {
  const allNews = [];
  
  // Scrape Singapore news
  for (const source of NEWS_SOURCES.singapore) {
    const articles = await scrapeNewsSource(source);
    allNews.push(...articles);
  }
  
  // Scrape Malaysia news
  for (const source of NEWS_SOURCES.malaysia) {
    const articles = await scrapeNewsSource(source);
    allNews.push(...articles);
  }
  
  return allNews;
}

module.exports = {
  getAllNews,
  NEWS_SOURCES
};