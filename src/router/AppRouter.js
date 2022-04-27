import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { VideoPage } from '../pages/VideoPage';
import { VideosPage } from '../pages/VideosPage';

export const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<VideosPage />} />
        <Route path="/video/:id" element={<VideoPage />} />
      </Routes>
    </Router>
  );
};
