import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { BrowserRouter } from 'react-router-dom';

import { reducers } from './component/reducers';
import './index.css';
import App from './App';
import { ContextProvider } from './contexts/ContextProvider';

const store = createStore(reducers, compose(applyMiddleware(thunk)));

ReactDOM.render(
  <BrowserRouter>
  <Provider store={store}>
    <ContextProvider>
      
      <App />
    </ContextProvider>
    </Provider>
    </BrowserRouter>,
  document.getElementById('root'),
);
