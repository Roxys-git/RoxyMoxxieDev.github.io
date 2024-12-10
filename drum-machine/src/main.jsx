import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import DrumMachine from './components/DrumMachine';
import store from './store';
import './App.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <DrumMachine />
  </Provider>
);
