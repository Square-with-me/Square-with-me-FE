import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './shared/App';
import store from './redux/configureStore';
import { Provider } from 'react-redux';
import axios from 'axios';
import { BackUrl } from './shared/config';
// import 'bootstrap/dist/css/bootstrap.min.css';
// axios.defaults.withCredentials=true;
axios.defaults.baseURL = BackUrl;

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

