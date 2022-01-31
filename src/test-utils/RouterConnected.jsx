import { createMemoryHistory } from 'history';
import PropTypes from 'prop-types';
import React from 'react';
import { Router, Route, Routes } from 'react-router-dom';

function RouterConnected({ component: Component, path, initialPaths }) {
  const history = createMemoryHistory({ initialEntries: initialPaths });

  return (
    <Router location={history.location} navigator={history}>
      <Routes>
        <Route path={path} element={Component} />
      </Routes>
    </Router>
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
