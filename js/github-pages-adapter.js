// Replace server API calls with CORS proxy
const CORS_PROXY = 'https://api.allorigins.win/raw?url=';

// Replace fetch calls in app.js
async function fetchPage(url) {
    const response = await fetch(CORS_PROXY + encodeURIComponent(url));
    return response.text();
}

async function fetchImage(url) {
    const response = await fetch(CORS_PROXY + encodeURIComponent(url));
    return response.blob();
}