# QWEN-NEWS - News Aggregation Platform

An interactive website that gathers news from multiple sources in Singapore and Malaysia, allowing users to access news by type/category with future capabilities for interactive features.

## Project Structure

- `CLAUDE.md` - Main project documentation
- `NEWS/Product Manager.md` - Product requirements and vision
- `NEWS/Architect.md` - Technical architecture
- `NEWS/UIUX Engineer.md` - User experience design specifications
- `NEWS/DEPLOYMENT-GUIDE.md` - Detailed deployment instructions
- `package.json` - Node.js project configuration
- `index.js` - Main application server
- `public/index.html` - Frontend interface
- `railway.json` - Railway deployment configuration

## Setup Instructions

### GitHub Repository Setup
1. Clone this repository:
   ```
   git clone https://github.com/nilochan/QWEN-NEWS.git
   cd QWEN-NEWS
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Run the application locally:
   ```
   npm start
   ```

### Railway Deployment
1. Sign up/in to [Railway](https://railway.app/)
2. Create a new project
3. Connect your GitHub account
4. Select this repository (nilochan/QWEN-NEWS)
5. Railway will automatically detect the Node.js project and deploy it
6. The application will be available at the provided URL

## Development

### Project Structure
```
QWEN-NEWS/
├── NEWS/
│   ├── Product Manager.md
│   ├── Architect.md
│   ├── UIUX Engineer.md
│   └── DEPLOYMENT-GUIDE.md
├── public/
│   └── index.html
├── CLAUDE.md
├── README.md
├── index.js
├── package.json
└── railway.json
```

### Technologies Used
- Node.js with Express.js for the backend
- HTML/CSS for the frontend
- Railway for deployment

## Future Features
- News aggregation from Singapore and Malaysia news portals
- Live chat functionality
- User comments on news articles
- Personalized news feed
- Social sharing capabilities
- Advanced filtering and search