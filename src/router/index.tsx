import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import FeedContainer from '../containers/feed';
import OptionsContainer from '../containers/options';

const AppRoutes: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<FeedContainer />} />
        <Route path="/options" element={<OptionsContainer />} />
        <Route path="*" element={<FeedContainer />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes; 