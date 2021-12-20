import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import './assets/styles/index.scss';
import { App } from './components/App/App';
import { store } from './store/store';

const toastConfiguration = {
  position: 'top-right',
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  newestOnTop: false,
  rtl: false,
  pauseOnFocusLoss: true,
  theme: 'colored',
};

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
      <ToastContainer {...toastConfiguration} />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
