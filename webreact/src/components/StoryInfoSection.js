import React from 'react';
import { useAppContext } from '../context/AppContext';

const StoryInfoSection = () => {
  const { state } = useAppContext();
  const { story } = state;

  if (!story) {
    return null;
  }

  return (
    <section id="storyInfo" className="story-info">
      <div className="story-header">
        {story.coverUrl && <img id="coverImage" className="cover-image" src={story.coverUrl} alt="Story Cover" />}
        <div className="story-details">
          <h2 id="storyTitle">{story.title}</h2>
          <p className="author">by <span id="storyAuthor">{story.author}</span></p>
          <div className="meta-info">
            <span className="meta-item">
              <i className="fas fa-list-ul"></i>
              <span id="chapterCount">{state.chapters.length}</span> chapters
            </span>
            <span className="meta-item">
              <i className="fas fa-globe"></i>
              <span id="storyLanguage">{story.language}</span>
            </span>
          </div>
        </div>
      </div>

      {/* Metadata Form */}
      <div className="metadata-form">
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="titleInput">Title</label>
            <input type="text" id="titleInput" className="form-control" defaultValue={story.title} />
          </div>
          <div className="form-group">
            <label htmlFor="authorInput">Author</label>
            <input type="text" id="authorInput" className="form-control" defaultValue={story.author} />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="languageInput">Language</label>
            <input type="text" id="languageInput" className="form-control" defaultValue={story.language} />
          </div>
          <div className="form-group">
            <label htmlFor="filenameInput">Filename</label>
            <input type="text" id="filenameInput" className="form-control" defaultValue={story.title.replace(/\s/g, '_')} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default StoryInfoSection;
