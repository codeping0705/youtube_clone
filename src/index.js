// src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './App';
import './index.css';
import store from './store/configureStore';

const root = ReactDOM.createRoot(document.getElementById('root')); // Use createRoot from react-dom/client

root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
