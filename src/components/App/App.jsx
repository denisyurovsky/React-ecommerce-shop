import React from 'react';
import { Routes, Route } from 'react-router-dom';

import { HomePage } from '../../pages/HomePage/HomePage';
import { NotFoundPage } from '../../pages/NotFoundPage/NotFoundPage';
import { Layout } from '../Layout/Layout';

export function App() {
  return (
    <Layout>
      <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Layout>
  );
}
