const express = require('express');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json({ limit: '50mb' }));

// Serve static files
app.use(express.static(path.join(__dirname, '../public')));
app.use('/src', express.static(path.join(__dirname, '../src')));

// Serve index.html for root path
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
});

// Rate limiting
const rateLimit = new Map();
const RATE_LIMIT_MS = 2000;

function checkRateLimit(hostname) {
    const now = Date.now();
    const lastRequest = rateLimit.get(hostname);
    if (lastRequest && now - lastRequest < RATE_LIMIT_MS) {
        return false;
    }
    rateLimit.set(hostname, now);
    return true;
}

// Fetch web page
app.post('/api/fetch', async (req, res) => {
    try {
        const { url } = req.body;
        if (!url) {
            return res.status(400).json({ error: 'URL is required' });
        }

        const hostname = new URL(url).hostname;
        if (!checkRateLimit(hostname)) {
            return res.status(429).json({ error: 'Rate limit exceeded' });
        }

        const response = await fetch(url, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }

        const html = await response.text();
        
        res.json({ 
            html, 
            url: response.url,
            status: response.status
        });

    } catch (error) {
        console.error('Fetch error:', error);
        res.status(500).json({ 
            error: error.message,
            type: 'fetch_error'
        });
    }
});

// Health check
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// For local development
if (process.env.NODE_ENV !== 'production') {
    app.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`);
    });
}

module.exports = app;