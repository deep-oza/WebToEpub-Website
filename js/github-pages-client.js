// Client-side replacement for server functionality
class GitHubPagesClient {
    constructor() {
        this.corsProxy = 'https://api.allorigins.win/raw?url=';
        this.rateLimit = new Map();
    }

    async fetchPage(url) {
        // Rate limiting
        const hostname = new URL(url).hostname;
        const now = Date.now();
        const lastRequest = this.rateLimit.get(hostname);
        if (lastRequest && now - lastRequest < 2000) {
            await new Promise(resolve => setTimeout(resolve, 2000 - (now - lastRequest)));
        }
        this.rateLimit.set(hostname, Date.now());

        try {
            const response = await fetch(this.corsProxy + encodeURIComponent(url));
            if (!response.ok) throw new Error(`HTTP ${response.status}`);
            
            const html = await response.text();
            return { html, url, status: response.status };
        } catch (error) {
            throw new Error(`Failed to fetch: ${error.message}`);
        }
    }

    async fetchBatch(urls) {
        const results = [];
        for (const url of urls) {
            try {
                const result = await this.fetchPage(url);
                results.push({ ...result, success: true });
            } catch (error) {
                results.push({ url, error: error.message, success: false });
            }
        }
        return { results };
    }

    async fetchImage(url) {
        try {
            const response = await fetch(this.corsProxy + encodeURIComponent(url));
            const blob = await response.blob();
            const reader = new FileReader();
            
            return new Promise((resolve, reject) => {
                reader.onload = () => {
                    const base64 = reader.result.split(',')[1];
                    resolve({
                        data: base64,
                        contentType: blob.type,
                        size: blob.size
                    });
                };
                reader.onerror = reject;
                reader.readAsDataURL(blob);
            });
        } catch (error) {
            throw new Error(`Image fetch failed: ${error.message}`);
        }
    }
}

// Replace server API calls
window.githubPagesClient = new GitHubPagesClient();