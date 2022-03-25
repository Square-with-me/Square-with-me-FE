import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './shared/App';
import store from './redux/configureStore';
import { Provider } from 'react-redux';
import * as serviceWorker from './shared/serviceWorker';
import axios from 'axios'
// axios.defaults.withCredentials=true;
axios.defaults.baseURL = "https://api.nemowithme.com";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

serviceWorker.unregister();
