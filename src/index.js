import 'babel-polyfill';
import './index.css';
import React        from 'react';
import { Provider } from 'react-redux';
import { render }   from 'react-dom';
import store        from 'store';
import App          from './components/app';

const Application = <Provider store={store}>
  <App />
</Provider>

render(Application, document.getElementById('root'));
