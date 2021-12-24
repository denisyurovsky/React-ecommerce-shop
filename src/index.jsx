import { createTheme, ThemeProvider } from '@mui/material/styles';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import './assets/styles/index.scss';
import { App } from './components/App/App';
import { store } from './store/store';

const theme = createTheme({
  palette: {
    secondary: {
      main: '#fff',
      dark: '#ccc',
      light: '#fff',
    },
  },
});

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
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
        <ToastContainer {...toastConfiguration} />
      </Provider>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
