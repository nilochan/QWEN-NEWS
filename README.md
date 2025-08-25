# QWEN-NEWS - News Aggregation Platform

An interactive website that gathers news from multiple sources in Singapore and Malaysia, allowing users to access news by type/category with future capabilities for interactive features.

## ✨ Features

- **News Aggregation**: Real-time news from Singapore and Malaysia sources
- **Professional UI**: Mimics international news portals with modern design
- **Source Filtering**: Filter news by Singapore, Malaysia, or Business sources
- **Search Functionality**: Search news by keywords
- **Image Support**: Visual thumbnails for each news article
- **Accurate Dates**: Extracts real publication dates from news sources
- **Direct Linking**: Click through to original news sources
- **Mobile Responsive**: Works on all device sizes

## 🚀 Technologies Used

- **Backend**: Node.js with Express.js
- **Web Scraping**: Axios and Cheerio
- **Frontend**: HTML5, CSS3, JavaScript (Vanilla)
- **Styling**: Modern CSS with Flexbox and Grid
- **Fonts**: Playfair Display and Roboto from Google Fonts
- **Icons**: Font Awesome
- **Deployment**: Railway with GitHub Integration

## 📁 Project Structure

```
QWEN-NEWS/
├── NEWS/
│   ├── Product Manager.md
│   ├── Architect.md
│   ├── UIUX Engineer.md
│   └── DEPLOYMENT-GUIDE.md
├── public/
│   └── index.html (Frontend UI)
├── CLAUDE.md (Main documentation)
├── README.md (This file)
├── index.js (Server logic)
├── scraper.js (News scraping logic)
├── monitor.js (Node.js monitoring)
├── monitor.ps1 (PowerShell monitoring)
├── monitor.bat (Windows batch monitoring)
├── package.json (Dependencies)
├── package-lock.json (Dependency lock)
└── railway.json (Railway config)
```

## 🛠️ Setup Instructions

### Local Development

1. Clone this repository:
   ```bash
   git clone https://github.com/nilochan/QWEN-NEWS.git
   cd QWEN-NEWS
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the application:
   ```bash
   npm start
   ```

4. Visit `http://localhost:3000` in your browser

### Deployment to Railway

1. Connect your GitHub repository to Railway
2. Railway will automatically deploy on pushes to the main branch
3. The application will be available at your Railway-provided URL

## 🌐 API Endpoints

- `GET /api/news` - Retrieve all aggregated news
- `GET /api/news/singapore` - Retrieve Singapore news
- `GET /api/news/malaysia` - Retrieve Malaysia news
- `GET /api/news/business` - Retrieve Business news
- `GET /api/news/search?q=keyword` - Search news by keyword
- `GET /api/health` - Health check endpoint

## 🎨 UI/UX Features

- Professional news portal design mimicking international newspapers
- Featured article display for prominent stories
- Category-based navigation with active state management
- Search bar with real-time search functionality
- Responsive card layout with images for news articles
- Loading and error states with user-friendly messages
- Category-specific styling for news sources
- Mobile-friendly navigation and layout
- Real publication dates extracted from news sources

## 📈 Current Features

- [x] News aggregation from Singapore sources
- [x] News aggregation from Malaysia sources
- [x] Business news aggregation
- [x] Image thumbnails for articles
- [x] Category filtering (Singapore, Malaysia, Business)
- [x] Keyword search functionality
- [x] Accurate publication dates
- [x] Responsive design
- [x] Direct linking to original sources
- [x] Health check monitoring
- [x] Project monitoring system

## 📊 Monitoring System

The QWEN-NEWS project includes a comprehensive monitoring system to track performance, usage, and errors:

### Node.js Monitoring
```bash
npm run monitor
```

### PowerShell Monitoring (Windows)
```bash
# Run the batch file
monitor.bat

# Or run directly with PowerShell
powershell -ExecutionPolicy Bypass -File monitor.ps1 -Continuous
```

### Monitoring Features
- Real-time project statistics
- Performance metrics tracking
- Error logging and reporting
- Uptime monitoring
- Resource usage tracking

## 📈 Future Enhancements

- [ ] Advanced news filtering by additional categories
- [ ] User accounts and preferences
- [ ] Live chat integration
- [ ] Social sharing features
- [ ] Bookmarking favorite articles
- [ ] Push notifications for breaking news
- [ ] News article summarization
- [ ] Multi-language support

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.