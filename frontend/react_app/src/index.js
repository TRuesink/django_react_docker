import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

import { createStore, compose, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import reducer from './store/reducers';

const composeEnhanced = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; // The first one is to make the chrome dev extension work
const store = createStore(reducer, composeEnhanced(applyMiddleware(thunk))); // We are using thunk, because it allows delaying the dispatch actions

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
