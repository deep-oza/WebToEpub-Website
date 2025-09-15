# WebToEpub Website

A standalone web application that brings the complete WebToEpub browser extension functionality to the web. Convert web novels and stories from 400+ supported websites directly to EPUB format without needing a browser extension.

## 🚀 Features

### Complete Extension Integration
- **400+ Site Parsers**: All WebToEpub extension parsers integrated
- **Real Content Extraction**: Live fetching from actual websites
- **Extension-Style UI**: Complete advanced options and chapter management
- **Professional EPUB Output**: Valid EPUB 3.0 with proper metadata
- **Rate Limiting**: Respectful scraping with configurable delays
- **Error Recovery**: Robust retry logic and error handling

### Advanced Options
- **Metadata Fields**: Subject, description, series information
- **Image Processing**: Skip, compress, deduplicate options
- **Content Processing**: Remove links, add info page
- **Custom Styling**: CSS editor with reset functionality
- **Parser Selection**: Manual parser override
- **Default Parser**: Configuration for unknown sites

## 📁 Project Structure

```
WebToEpub-Website/
├── server.js              # Express backend server
├── package.json           # Dependencies and scripts
├── start.sh              # Easy startup script
├── index.html            # Main web interface
├── styles.css            # Modern UI styling
├── js/                   # Website JavaScript
│   ├── app.js            # Main application logic
│   ├── extension-core.js # Extension classes integration
│   ├── parser-factory.js # Site parsers
│   ├── epub-packer.js    # EPUB generation
│   └── ...
├── plugin/               # Extension files
│   ├── js/               # Core extension JavaScript
│   │   ├── parsers/      # 400+ site-specific parsers
│   │   ├── EpubPacker.js # EPUB generation logic
│   │   ├── ParserFactory.js # Parser management
│   │   └── ...
│   ├── css/              # Extension stylesheets
│   └── images/           # UI icons and assets
├── @zip.js/              # ZIP library for EPUB
└── dompurify/            # Content sanitization
```

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ and npm
- Modern web browser

### Installation & Launch
```bash
# Clone or download this project
cd WebToEpub-Website

# Run the startup script (installs dependencies and starts server)
./start.sh

# Or manually:
npm install
npm start
```

Open http://localhost:3000 in your browser.

### Usage
1. **Enter Story URL**: Any supported website (Royal Road, AO3, etc.)
2. **Configure Options**: Click "Show Options" for advanced settings
3. **Select Chapters**: Use range selectors or manual selection
4. **Customize Metadata**: Add series info, descriptions
5. **Generate EPUB**: Download professional ebook

## 🌐 Supported Websites

### Fully Tested & Working
- **Royal Road**: Fiction stories and serials
- **Archive of Our Own**: Fanfiction and original works
- **FanFiction.Net**: Large fanfiction archive
- **Wuxiaworld**: Chinese web novels
- **Webnovel**: International web novels
- **Scribble Hub**: Original fiction platform

### 400+ Sites Supported
Includes all sites from the original WebToEpub extension:
- Light novel sites (NovelUpdates, LightNovelPub, etc.)
- Fanfiction platforms (Wattpad, Quotev, etc.)
- Web novel aggregators (NovelFull, ReadLightNovel, etc.)
- Original content sites (Tapas, RoyalRoad, etc.)

## 🔧 API Endpoints

### Fetch Single Page
```http
POST /api/fetch
Content-Type: application/json

{
  "url": "https://example.com/story"
}
```

### Batch Fetch Multiple Pages
```http
POST /api/fetch-batch
Content-Type: application/json

{
  "urls": ["url1", "url2", "url3"]
}
```

### Fetch Images
```http
POST /api/fetch-image
Content-Type: application/json

{
  "url": "https://example.com/image.jpg"
}
```

## 🚀 Deployment

### Local Development
```bash
npm run dev  # Uses nodemon for auto-restart
```

### Vercel Deployment (Recommended)
```bash
# One-click deploy
npx vercel --prod

# Or connect GitHub repository to Vercel
```

### Alternative Deployments
```bash
# Railway
railway deploy

# Render
# Connect GitHub repository

# Heroku
heroku create your-app-name
git push heroku main
```

## 🛠️ Development

### Adding New Site Support
```javascript
// In plugin/js/parsers/NewSiteParser.js
class NewSiteParser extends Parser {
    canHandle(url) {
        return url.includes('newsite.com');
    }
    
    async getChapterUrls(dom) {
        // Site-specific chapter extraction
    }
    
    findContent(dom) {
        // Site-specific content extraction
    }
}

// Register in ParserFactory
```

### Project Dependencies
- **Express.js**: Web server framework
- **JSDOM**: Server-side DOM parsing
- **node-fetch**: HTTP requests
- **CORS**: Cross-origin resource sharing
- **zip.js**: EPUB file generation
- **DOMPurify**: Content sanitization

## 📊 Performance

### Benchmarks
- **Small story** (10 chapters): ~30 seconds
- **Medium story** (50 chapters): ~3 minutes
- **Large story** (200+ chapters): ~10 minutes

### Optimization Features
- Batch processing for multiple chapters
- Content cleaning to reduce size
- Efficient DOM parsing
- Memory management for large stories

## 🛠️ Troubleshooting

### Common Issues

**"Rate limit exceeded"**
- Wait 2 seconds between requests
- Server implements per-hostname limiting

**"Failed to fetch content"**
- Check if website blocks scrapers
- Verify URL is accessible
- Some sites require specific headers

**"No chapters found"**
- Website structure may have changed
- Try different URL (table of contents page)
- Check if site is supported

### Debug Mode
```bash
DEBUG=* npm start  # Enable debug logging
```

## 🤝 Contributing

### Based on WebToEpub Extension
This project is based on the [WebToEpub browser extension](https://github.com/dteviot/WebToEpub) by David Teviotdale and contributors.

### Website Implementation
- **Deep Oza** - Complete website implementation and integration
  - Integrated all 400+ extension parsers into web interface
  - Built production-ready Express.js backend
  - Implemented extension-style UI with advanced options
  - Created comprehensive chapter management system
  - Added real-time progress tracking and error handling

## 📝 License

GPL-3.0 - Based on the WebToEpub browser extension

## 🆘 Support

1. Check this documentation
2. Review browser console for errors
3. Test with supported websites first
4. Report issues with detailed error information

---

**Ready to convert web novels to EPUB format!** 📚✨