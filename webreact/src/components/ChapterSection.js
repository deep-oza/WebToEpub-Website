import React from 'react';
import { useAppContext } from '../context/AppContext';

const ChapterSection = () => {
  const { state, dispatch } = useAppContext();
  const { chapters, selectedChapters } = state;

  if (chapters.length === 0) {
    return null;
  }

  const handleSelectAll = () => {
    dispatch({ type: 'SELECT_ALL_CHAPTERS' });
  };

  const handleSelectNone = () => {
    dispatch({ type: 'SELECT_NONE_CHAPTERS' });
  };

  const handleChapterToggle = (chapter, isSelected) => {
    dispatch({ type: 'TOGGLE_CHAPTER_SELECTION', payload: { chapter, isSelected } });
  };

  return (
    <section id="chapterSection" className="chapter-section">
      <div className="section-header">
        <h3><i className="fas fa-list-ul"></i> Chapter Selection</h3>
        <div className="chapter-controls">
          <button id="selectAllBtn" className="btn btn-secondary" onClick={handleSelectAll}>
            <i className="fas fa-check-double"></i>
            Select All
          </button>
          <button id="selectNoneBtn" className="btn btn-secondary" onClick={handleSelectNone}>
            <i className="fas fa-times"></i>
            Select None
          </button>
          <button id="reverseOrderBtn" className="btn btn-secondary">
            <i className="fas fa-sort-amount-down"></i>
            Reverse Order
          </button>
          <button id="editChaptersBtn" className="btn btn-secondary">
            <i className="fas fa-edit"></i>
            Edit URLs
          </button>
        </div>
      </div>

      {/* Chapter Statistics */}
      <div className="chapter-stats">
        <div className="stat-item">
          <div className="stat-value" id="totalChapters">{chapters.length}</div>
          <div className="stat-label">Total</div>
        </div>
        <div className="stat-item">
          <div className="stat-value" id="selectedChapters">{selectedChapters.length}</div>
          <div className="stat-label">Selected</div>
        </div>
        <div className="stat-item">
          <div className="stat-value" id="downloadedChapters">0</div>
          <div className="stat-label">Downloaded</div>
        </div>
        <div className="stat-item">
          <div className="stat-value" id="estimatedSize">0 MB</div>
          <div className="stat-label">Est. Size</div>
        </div>
      </div>

      <div id="chapterList" className="chapter-list">
        <table className="chapterlist">
          <thead>
            <tr>
              <th>Select</th>
              <th>Chapter Title</th>
              <th>URL</th>
            </tr>
          </thead>
          <tbody>
            {chapters.map((chapter, index) => (
              <tr key={index}>
                <td>
                  <input
                    type="checkbox"
                    checked={selectedChapters.some(c => c.sourceUrl === chapter.sourceUrl)}
                    onChange={(e) => handleChapterToggle(chapter, e.target.checked)}
                  />
                </td>
                <td>{chapter.title}</td>
                <td className="url-column">{chapter.sourceUrl}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default ChapterSection;
