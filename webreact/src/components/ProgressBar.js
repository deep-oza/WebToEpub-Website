import React from 'react';

const ProgressBar = () => {
  return (
    <section id="progressSection" className="progress-section hidden">
      <div className="progress-header">
        <h3>Generating EPUB</h3>
        <span id="progressText">Preparing...</span>
      </div>
      <div className="progress-bar">
        <div id="progressFill" className="progress-fill" style={{width: '0%'}}></div>
      </div>
      <div id="progressDetails" className="progress-details"></div>
    </section>
  );
};

export default ProgressBar;
