import * as React from 'react';
import { hot } from 'react-hot-loader';
import { Provider } from 'react-redux';
import { Store } from 'redux';

import AppControl from './components/AppControl';

const App = ({ store }: { store?: Store }) => (
  <Provider store={store}>
    <div className="row no-gutters">
      <AppControl productName="Twisty" />
      <div className="col">
      </div>
    </div>
  </Provider>
);

export default hot(module)(App);
