import React from 'react';
import ReactDOM from 'react-dom';
<<<<<<< HEAD
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import App from './Components/App/App';
import { BrowserRouter } from 'react-router-dom';
=======
import { BrowserRouter } from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker';
import App from './Components/App/App';
import './index.css';
>>>>>>> 66ca6a86ab1b2ba08de0c15d9fcbb546133cd4d0

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('root'),
);
registerServiceWorker();