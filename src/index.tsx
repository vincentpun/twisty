import * as React from 'react';
import * as ReactDOM from 'react-dom';

import App from './App';
import { createReduxStore } from 'src/state/createReduxStore';

const store = createReduxStore();

ReactDOM.render(
  <App store={store} />,
  document.getElementById('app'),
);
