import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux'; 
import { thunk, withExtraArgument } from 'redux-thunk';

import Reducers from './reducers';

const store = createStore(Reducers, compose(applyMiddleware(thunk)))

ReactDOM.render(
<Provider store={store}>
<React.StrictMode>
    <App />
  </React.StrictMode>
  </Provider>,
  document.getElementById('root')
);

