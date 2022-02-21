import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';

import App from './App';
import store from './redux/store';

const theme = createTheme({
  palette: {
    primary: {
      main: '#fafafa',
    },
    secondary: {
      main: '#212121',
    },
  },
});

ReactDOM.render(
  <BrowserRouter>
    {/* <ThemeProvider theme={theme}> */}
      <Provider store={store}>
        <CssBaseline />
        <App />
      </Provider>
    {/* </ThemeProvider> */}
  </BrowserRouter>,
  document.getElementById('root')
);
