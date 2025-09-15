# Vercel Deployment Guide

## Quick Deploy

### Option 1: One-Click Deploy
```bash
npx vercel --prod
```

### Option 2: GitHub Integration
1. Push to GitHub
2. Connect repository to Vercel
3. Auto-deploy on push

## Configuration

### vercel.json
- Routes API calls to server.js
- Serves static files directly
- Uses @vercel/node runtime

### Environment Variables (Optional)
```bash
vercel env add RATE_LIMIT_MS 2000
vercel env add NODE_ENV production
```

## Deployment Steps

1. **Install Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Deploy**
   ```bash
   vercel --prod
   ```

3. **Access Your Site**
   - URL provided after deployment
   - Custom domain available in dashboard

## Benefits Over GitHub Pages
- ✅ Full Node.js support
- ✅ Server-side API endpoints
- ✅ No CORS proxy needed
- ✅ Better performance
- ✅ Automatic HTTPS
- ✅ Global CDN

## Project Structure
```
WebToEpub-Website/
├── server.js          # Express server
├── vercel.json        # Vercel config
├── package.json       # Dependencies
├── index.html         # Frontend
└── js/               # Client scripts
```

Ready for production use!