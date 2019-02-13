import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { Provider as AlertProvider } from 'react-alert'
import AlertTemplate from 'react-alert-template-basic';
const options = {
  position: 'bottom center',
  timeout: 3500,
  offset: '30px',
  transition: 'fade'
}

ReactDOM.render(<AlertProvider template={AlertTemplate} {...options}>
  <App />
</AlertProvider>, document.getElementById('root'));
registerServiceWorker();