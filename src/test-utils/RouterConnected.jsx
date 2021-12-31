import { createMemoryHistory } from 'history';
import PropTypes from 'prop-types';
import React from 'react';
import { Router, Route, Routes } from 'react-router-dom';

function RouterConnected({ component: Component, path }) {
  const history = createMemoryHistory();

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
};

RouterConnected.defaultProps = {
  path: '/',
};

export default RouterConnected;
