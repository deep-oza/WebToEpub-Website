import React from 'react';
import Header from '../components/Header';
import UrlInputSection from '../components/UrlInputSection';
import StoryInfoSection from '../components/StoryInfoSection';
import ChapterSection from '../components/ChapterSection';
import AdvancedOptionsSection from '../components/AdvancedOptionsSection';
import ActionButtons from '../components/ActionButtons';
import ProgressBar from '../components/ProgressBar';
import Footer from '../components/Footer';
import ErrorModal from '../components/ErrorModal';
import ParserModal from '../components/ParserModal';
import { useAppContext } from '../context/AppContext';

const HomePage = () => {
  const { state } = useAppContext();
  const { loading, loadingMessage } = state;

  return (
    <div className="container">
      <Header />

      {/* Main Content */}
      <main className="main-content">
      <UrlInputSection />

        {loading && (
          <div id="loadingState" className="loading-state">
            <div className="spinner"></div>
            <p id="loadingMessage">{loadingMessage}</p>
          </div>
        )}

        <StoryInfoSection />

        <ChapterSection />

        <AdvancedOptionsSection />

        <ActionButtons />

        <ProgressBar />
      </main>

      <Footer />

      <ErrorModal />

      <ParserModal />
    </div>
  );
};

export default HomePage;
