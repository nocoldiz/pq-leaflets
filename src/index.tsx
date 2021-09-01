import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from 'react-redux';
import Store from './store';

import './scss/style.scss';

const Main: React.FC = () => (
  <Provider store={Store}>
    <App />
  </Provider>

);

ReactDOM.render(<Main />, document.getElementById('root'));

if (module.hot) {
  module.hot.accept();
}
