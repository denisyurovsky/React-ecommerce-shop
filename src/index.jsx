import { createTheme, ThemeProvider } from '@mui/material/styles';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import './assets/styles/index.scss';
import App from './components/App/App';
import ToastContainer from './components/ToastContainer/ToastContainer';
import { store } from './store/store';

const theme = createTheme({
  palette: {
    secondary: {
      main: '#fff',
      dark: '#ccc',
      light: '#fff',
    },
  },
  typography: {
    htmlFontSize: 10,
  },
});

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
        <ToastContainer />
      </Provider>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
