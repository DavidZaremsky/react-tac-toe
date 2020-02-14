import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { combineReducers } from 'redux';
import './index.css';
import Game from './components/game';
import configureStore from './store/configureStore';
// ========================================


ReactDOM.render(
  <Provider store={configureStore()}>
    <Game />
  </Provider>,
  document.getElementById("root"));
