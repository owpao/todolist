import React from 'react';
import ReactDOM from 'react-dom';
import './main/index.css';
import App from './main/App';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('todolist-root')
);

reportWebVitals();
