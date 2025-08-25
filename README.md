# QWEN-NEWS - News Aggregation Platform

An interactive website that gathers news from multiple sources in Singapore and Malaysia, allowing users to access news by type/category with future capabilities for interactive features.

## ✨ Features

- **News Aggregation**: Real-time news from Singapore and Malaysia sources
- **Beautiful UI**: Modern, responsive design with intuitive navigation
- **Source Filtering**: Filter news by Singapore, Malaysia, or Business sources
- **Image Support**: Visual thumbnails for each news article
- **Direct Linking**: Click through to original news sources
- **Mobile Responsive**: Works on all device sizes

## 🚀 Technologies Used

- **Backend**: Node.js with Express.js
- **Web Scraping**: Axios and Cheerio
- **Frontend**: HTML5, CSS3, JavaScript (Vanilla)
- **Styling**: Modern CSS with Flexbox and Grid
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
- `GET /api/health` - Health check endpoint

## 🎨 UI/UX Features

- Modern gradient-based design
- Responsive card layout with images for news articles
- Interactive filter buttons with hover effects
- Loading and error states
- Category-specific badges for news sources
- Mobile-friendly navigation

## 📈 Current Features

- [x] News aggregation from Singapore sources
- [x] News aggregation from Malaysia sources
- [x] Business news aggregation
- [x] Image thumbnails for articles
- [x] Category filtering (Singapore, Malaysia, Business)
- [x] Responsive design
- [x] Direct linking to original sources
- [x] Health check monitoring

## 📈 Future Enhancements

- [ ] Advanced news filtering by additional categories
- [ ] Search functionality
- [ ] User accounts and preferences
- [ ] Live chat integration
- [ ] Social sharing features
- [ ] Bookmarking favorite articles
- [ ] Push notifications for breaking news

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.