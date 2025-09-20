import React from 'react';
import { useAppContext } from '../context/AppContext';
import EnhancedEpubPacker from '../services/epub';
import { fetchStory } from '../services/api';
import { parseHtml } from '../utils/dom';
import parserFactory from '../services/parser';

const ActionButtons = () => {
  const { state, dispatch } = useAppContext();
  const { story, selectedChapters } = state;

  const handleGenerateEpub = async () => {
    if (selectedChapters.length === 0) {
      dispatch({ type: 'SET_ERROR', payload: 'Please select at least one chapter' });
      return;
    }

    dispatch({ type: 'SET_LOADING', payload: { loading: true, message: 'Generating EPUB...' } });

    try {
      const metaInfo = {
        uuid: story.url,
        title: document.getElementById('titleInput').value || story.title,
        author: document.getElementById('authorInput').value || story.author,
        language: document.getElementById('languageInput').value || 'en',
        fileName: document.getElementById('filenameInput').value || 'story',
        subject: document.getElementById('subjectInput')?.value || '',
        description: document.getElementById('descriptionInput')?.value || '',
        seriesName: document.getElementById('seriesNameInput')?.value || null,
        seriesIndex: document.getElementById('seriesIndexInput')?.value || null,
        styleSheet: document.getElementById('stylesheetInput')?.value || ''
      };

      const packer = new EnhancedEpubPacker(metaInfo);

      const chapterContents = [];
      for (const chapter of selectedChapters) {
        dispatch({ type: 'SET_LOADING', payload: { loading: true, message: `Fetching chapter: ${chapter.title}` } });
        const chapterData = await fetchStory(chapter.sourceUrl);
        const dom = parseHtml(chapterData.html);
        const parser = parserFactory.getParser(chapter.sourceUrl);
        const content = parser.findContent(dom).innerHTML;
        chapterContents.push({
          title: chapter.title,
          content: content,
          sourceUrl: chapter.sourceUrl,
        });
      }

      dispatch({ type: 'SET_LOADING', payload: { loading: true, message: 'Assembling EPUB...' } });
      const epubBlob = await packer.assemble(chapterContents);

      const a = document.createElement('a');
      a.href = URL.createObjectURL(epubBlob);
      a.download = `${metaInfo.fileName}.epub`;
      a.click();
      URL.revokeObjectURL(a.href);

    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error.message });
    } finally {
      dispatch({ type: 'SET_LOADING', payload: { loading: false, message: '' } });
    }
  };

  return (
    <div id="generateSection" className="generate-section">
      <button id="generateBtn" className="btn btn-success btn-large" onClick={handleGenerateEpub} disabled={selectedChapters.length === 0}>
        <i className="fas fa-rocket"></i>
        Generate EPUB
      </button>
    </div>
  );
};

export default ActionButtons;
