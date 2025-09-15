# GitHub Pages Deployment Guide

## Changes Made for GitHub Pages Compatibility

### 1. Removed Server Dependencies
- **Before**: Express.js server with `/api/fetch` endpoints
- **After**: Client-side CORS proxy using `allorigins.win`

### 2. Client-Side Fetching
- Created `js/github-pages-client.js` for CORS proxy requests
- Modified `js/app.js` to use client-side fetching
- Added fallback for direct CORS requests

### 3. Static File Structure
```
WebToEpub-Website/
├── index.html              # Main page (entry point)
├── styles.css              # Embedded in HTML
├── js/                     # All JavaScript files
├── plugin/                 # Extension parsers
├── @zip.js/               # ZIP library
└── dompurify/             # Content sanitization
```

## Deployment Steps

### 1. Push to GitHub Repository
```bash
git add .
git commit -m "GitHub Pages compatibility"
git push origin main
```

### 2. Enable GitHub Pages
1. Go to repository **Settings** → **Pages**
2. Source: **Deploy from a branch**
3. Branch: **main** / **root**
4. Click **Save**

### 3. Access Your Site
- URL: `https://yourusername.github.io/WebToEpub-Website`
- Takes 5-10 minutes to deploy

## Limitations on GitHub Pages

### CORS Proxy Limitations
- **Slower**: Extra hop through proxy server
- **Rate Limited**: Public proxy has usage limits
- **Reliability**: Dependent on third-party service
- **Some Sites Block Proxies**: May not work for all sites

### Recommended Alternatives
1. **Vercel** (Best option)
   ```bash
   npx vercel --prod
   ```

2. **Netlify**
   - Drag & drop deployment
   - Supports serverless functions

3. **Railway/Render**
   - Full Node.js support
   - Better for production use

## Testing Locally
```bash
# Serve static files
python -m http.server 8000
# or
npx serve .
```

Open `http://localhost:8000`

## Known Issues
- Some websites block CORS proxy requests
- Slower than direct server requests
- May hit rate limits on popular proxy services
- No server-side caching

## Production Recommendation
For production use, deploy to **Vercel** or **Netlify** with the original server code for better performance and reliability.