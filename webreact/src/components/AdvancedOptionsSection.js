import React from 'react';

const AdvancedOptionsSection = () => {
  return (
    <section id="advancedOptionsSection" className="options-section hidden">
      <div className="section-header">
        <h3>Advanced Options</h3>
        <button id="advancedOptionsToggle" className="btn btn-secondary">
          <i className="fas fa-cog"></i>
          Show Options
        </button>
      </div>

      <div id="advancedOptionsContent" className="hidden">
        {/* Metadata Options */}
        <div className="option-group">
          <h4>
            <i className="fas fa-tags"></i>
            Additional Metadata
          </h4>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="subjectInput">Subject/Tags</label>
              <textarea id="subjectInput" className="form-control" rows="2" placeholder="Fantasy, Adventure, Romance..."></textarea>
            </div>
            <div className="form-group">
              <label htmlFor="descriptionInput">Description</label>
              <textarea id="descriptionInput" className="form-control" rows="2" placeholder="Book description or summary..."></textarea>
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="seriesNameInput">Series Name</label>
              <input type="text" id="seriesNameInput" className="form-control" placeholder="Series or collection name" />
            </div>
            <div className="form-group">
              <label htmlFor="seriesIndexInput">Volume/Index</label>
              <input type="text" id="seriesIndexInput" className="form-control" placeholder="1, 2, 3..." />
            </div>
          </div>
        </div>

        {/* Image Options */}
        <div className="option-group">
          <h4>
            <i className="fas fa-image"></i>
            Image Processing
          </h4>
          <div className="options-grid">
            <label className="option-item">
              <input type="checkbox" id="skipImagesCheckbox" />
              <span className="checkmark"></span>
              Skip Images
            </label>
            <label className="option-item">
              <input type="checkbox" id="compressImagesCheckbox" />
              <span className="checkmark"></span>
              Compress Images
            </label>
            <label className="option-item">
              <input type="checkbox" id="removeDuplicateImages" defaultChecked />
              <span className="checkmark"></span>
              Remove Duplicates
            </label>
            <label className="option-item">
              <input type="checkbox" id="includeImageSourceUrl" />
              <span className="checkmark"></span>
              Include Image URLs
            </label>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="compressImagesMaxResolution">Max Image Resolution</label>
              <input type="number" id="compressImagesMaxResolution" className="form-control" defaultValue="1080" min="100" placeholder="1080" />
            </div>
          </div>
        </div>

        {/* Content Options */}
        <div className="option-group">
          <h4>
            <i className="fas fa-file-alt"></i>
            Content Processing
          </h4>
          <div className="options-grid">
            <label className="option-item">
              <input type="checkbox" id="removeNextPrevLinks" defaultChecked />
              <span className="checkmark"></span>
              Remove Navigation Links
            </label>
            <label className="option-item">
              <input type="checkbox" id="addInformationPage" defaultChecked />
              <span className="checkmark"></span>
              Add Information Page
            </label>
            <label className="option-item">
              <input type="checkbox" id="skipFailedChapters" />
              <span className="checkmark"></span>
              Skip Failed Chapters
            </label>
            <label className="option-item">
              <input type="checkbox" id="createEpub3" defaultChecked />
              <span className="checkmark"></span>
              Create EPUB 3.0
            </label>
          </div>
        </div>

        {/* Rate Limiting */}
        <div className="option-group">
          <h4>
            <i className="fas fa-clock"></i>
            Rate Limiting
          </h4>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="manualDelayPerChapter">Delay Per Chapter (ms)</label>
              <input type="number" id="manualDelayPerChapter" className="form-control" defaultValue="2000" min="500" placeholder="2000" />
            </div>
            <div className="form-group">
              <label htmlFor="maxChaptersPerEpub">Max Chapters Per EPUB</label>
              <select id="maxChaptersPerEpub" className="form-control">
                <option value="100">100</option>
                <option value="200">200</option>
                <option value="500">500</option>
                <option value="1000" selected>1,000</option>
                <option value="2000">2,000</option>
              </select>
            </div>
          </div>
        </div>

        {/* Parser Selection */}
        <div className="option-group">
          <h4>
            <i className="fas fa-cogs"></i>
            Parser Selection
          </h4>
          <div className="form-group">
            <label htmlFor="manuallySelectParser">Manually Select Parser</label>
            <select id="manuallySelectParser" className="form-control">
              <option value="">Auto-detect</option>
              <option value="Default">Default Parser</option>
              <option value="RoyalRoad">Royal Road</option>
              <option value="ArchiveOfOurOwn">Archive of Our Own</option>
              <option value="FanFiction">FanFiction.Net</option>
            </select>
          </div>
        </div>

        {/* Custom Stylesheet */}
        <div className="option-group">
          <h4>
            <i className="fas fa-palette"></i>
            Custom Styling
          </h4>
          <div className="form-group">
            <label htmlFor="stylesheetInput">Custom CSS</label>
            <textarea id="stylesheetInput" className="form-control" rows="6" placeholder="Enter custom CSS for EPUB styling..."></textarea>
            <button type="button" id="resetStylesheetBtn" className="btn btn-secondary btn-sm mt-2">
              <i className="fas fa-undo"></i>
              Reset to Default
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AdvancedOptionsSection;
