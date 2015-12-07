import React from 'react';
import ReactDOM from 'react-dom';
import App from './app';

const config = {};

window.addEventListener('load', () => {
  ReactDOM.render(
      <App config={config} />,
      document.getElementById('app')
  );
});

