import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { fetchStory } from '../services/api';
import parserFactory from '../services/parser';
import { parseHtml, setBaseTag } from '../utils/dom';

const UrlInputSection = () => {
  const [url, setUrl] = useState('');
  const { dispatch } = useAppContext();

  const handleAnalyze = async () => {
    if (!url) {
      dispatch({ type: 'SET_ERROR', payload: 'Please enter a valid URL' });
      return;
    }

    dispatch({ type: 'SET_LOADING', payload: { loading: true, message: 'Analyzing story structure...' } });

    try {
      const storyData = await fetchStory(url);
      const dom = parseHtml(storyData.html);
      setBaseTag(storyData.url, dom);

      const parser = parserFactory.getParser(storyData.url);
      const story = {
        url: storyData.url,
        title: parser.extractTitle(dom),
        author: parser.extractAuthor(dom),
        language: parser.extractLanguage(dom),
        coverUrl: parser.findCoverImageUrl(dom),
      };

      const chapters = await parser.getChapterUrls(dom);

      dispatch({ type: 'SET_STORY', payload: story });
      dispatch({ type: 'SET_CHAPTERS', payload: chapters });

    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error.message });
    } finally {
      dispatch({ type: 'SET_LOADING', payload: { loading: false, message: '' } });
    }
  };

  return (
    <section className="url-section">
      <div className="input-group">
        <input
          type="url"
          id="urlInput"
          placeholder="Enter story URL (e.g., https://royalroad.com/fiction/...)"
          required
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
        <button id="analyzeBtn" className="btn btn-primary" onClick={handleAnalyze}>
          <i className="fas fa-magic"></i>
          Analyze
        </button>
      </div>
      <div className="supported-sites">
        <span>Supports 400+ sites including:</span>
        <div className="site-tags">
          <span className="tag">RoyalRoad</span>
          <span className="tag">Archive of Our Own</span>
          <span className="tag">Wuxiaworld</span>
          <span className="tag">FanFiction.Net</span>
          <span className="tag">Webnovel</span>
          <span className="tag">And many more...</span>
        </div>
      </div>
    </section>
  );
};

export default UrlInputSection;
