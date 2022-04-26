import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './assets/css/main.scss'
import {CookiesProvider} from 'react-cookie'

ReactDOM.render(<CookiesProvider><App /></CookiesProvider>,
  document.getElementById('root')
);
