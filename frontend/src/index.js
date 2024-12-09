import React, { useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './utils.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ThemeProvider } from './utils/ThemeContext';
import axios from './utils/AxiosInterceptor'

axios.get('/auth/check')
  .then((res) => {
    console.log('user authorized')
  })
  .catch((err) => {
    console.error(err)
  })


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ThemeProvider defaultTheme="dark">
      <App />
    </ThemeProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
