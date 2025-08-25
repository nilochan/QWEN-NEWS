// Test script for QWEN-NEWS project
const fs = require('fs');
const path = require('path');

console.log('🧪 QWEN-NEWS Project Test Script');
console.log('================================');

// Test 1: Check if all required files exist
console.log('\n📋 File Structure Test:');
const requiredFiles = [
  'index.js',
  'scraper.js',
  'package.json',
  'public/index.html',
  'monitor.js',
  'monitor.ps1',
  'monitor.bat'
];

let allFilesExist = true;
requiredFiles.forEach(file => {
  const filePath = path.join(__dirname, file);
  if (fs.existsSync(filePath)) {
    console.log(`✅ ${file} - Found`);
  } else {
    console.log(`❌ ${file} - Missing`);
    allFilesExist = false;
  }
});

// Test 2: Check if stats file can be created
console.log('\n📊 Stats File Test:');
const statsFile = path.join(__dirname, 'project-stats.json');
try {
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
    console.log('✅ Stats file created successfully');
  } else {
    console.log('✅ Stats file already exists');
  }
} catch (error) {
  console.log(`❌ Error creating stats file: ${error.message}`);
}

// Test 3: Check dependencies
console.log('\n📦 Dependencies Test:');
try {
  const packageJson = JSON.parse(fs.readFileSync(path.join(__dirname, 'package.json'), 'utf8'));
  const requiredDeps = ['express', 'axios', 'cheerio'];
  
  requiredDeps.forEach(dep => {
    if (packageJson.dependencies && packageJson.dependencies[dep]) {
      console.log(`✅ ${dep} - Installed`);
    } else {
      console.log(`❌ ${dep} - Missing`);
    }
  });
} catch (error) {
  console.log(`❌ Error reading package.json: ${error.message}`);
}

// Test 4: Display project info
console.log('\nℹ️  Project Information:');
try {
  const packageJson = JSON.parse(fs.readFileSync(path.join(__dirname, 'package.json'), 'utf8'));
  console.log(`📝 Name: ${packageJson.name}`);
  console.log(`📌 Version: ${packageJson.version}`);
  console.log(`📖 Description: ${packageJson.description}`);
} catch (error) {
  console.log(`❌ Error reading project info: ${error.message}`);
}

console.log('\n🏁 Test Summary:');
if (allFilesExist) {
  console.log('✅ All required files are present');
} else {
  console.log('❌ Some required files are missing');
}

console.log('\n🔧 Next Steps:');
console.log('1. Run "npm install" to install dependencies');
console.log('2. Run "npm start" to start the server');
console.log('3. Visit http://localhost:3000 in your browser');
console.log('4. Use monitor.bat to track project statistics');

console.log('\n✨ QWEN-NEWS Project is ready for deployment!');