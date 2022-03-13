import PropTypes from 'prop-types';
import React from 'react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';

function RouterConnected({ component: Component, path, initialPaths }) {
  return (
    <MemoryRouter initialEntries={initialPaths}>
      <Routes>
        <Route path={path} element={Component} />
      </Routes>
    </MemoryRouter>
  );
}

RouterConnected.propTypes = {
  component: PropTypes.object.isRequired,
  path: PropTypes.string,
  initialPaths: PropTypes.arrayOf(PropTypes.string),
};

RouterConnected.defaultProps = {
  path: '/',
  initialPaths: ['/'],
};

export default RouterConnected;
