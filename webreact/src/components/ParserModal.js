import React from 'react';

const ParserModal = () => {
  return (
    <div id="defaultParserModal" className="modal hidden">
      <div className="modal-content">
        <div className="modal-header">
          <h3>
            <i className="fas fa-cog"></i>
            Parser Configuration
          </h3>
          <button className="modal-close">&times;</button>
        </div>
        <div className="modal-body">
          <p>WebToEpub doesn't have a specific parser for this site. Configure the default parser to extract content.</p>

          <div className="form-group">
            <label htmlFor="defaultParserContentCss">Content CSS Selector</label>
            <input type="text" id="defaultParserContentCss" className="form-control" placeholder="e.g., .content, article, #main" />
          </div>

          <div className="form-group">
            <label htmlFor="defaultParserTitleCss">Chapter Title CSS Selector</label>
            <input type="text" id="defaultParserTitleCss" className="form-control" placeholder="e.g., h1, .title, .chapter-title" />
          </div>

          <div className="form-group">
            <label htmlFor="defaultParserUnwantedCss">Unwanted Elements CSS Selector</label>
            <input type="text" id="defaultParserUnwantedCss" className="form-control" placeholder="e.g., .ads, .navigation, .comments" />
          </div>

          <div className="form-group">
            <label htmlFor="defaultParserTestUrl">Test Chapter URL</label>
            <input type="url" id="defaultParserTestUrl" className="form-control" placeholder="URL to test the parser configuration" />
          </div>

          <button id="testDefaultParser" className="btn btn-primary">
            <i className="fas fa-vial"></i>
            Test Configuration
          </button>

          <div id="defaultParserResult" className="mt-3 hidden">
            <h4>Preview:</h4>
            <div id="defaultParserPreview" className="preview-content glass" style={{padding: '1rem', borderRadius: 'var(--radius)', maxHeight: '200px', overflowY: 'auto'}}></div>
          </div>
        </div>
        <div className="modal-footer">
          <button id="saveDefaultParser" className="btn btn-success">
            <i className="fas fa-save"></i>
            Use This Configuration
          </button>
          <button id="cancelDefaultParser" className="btn btn-secondary">Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default ParserModal;
