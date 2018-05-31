import * as React from 'react';
import { hot } from 'react-hot-loader';
import { Provider } from 'react-redux';
import { Store } from 'redux';

import AppControl from './components/AppControl';
import MapContainer from './components/Map';

const App = ({ store }: { store?: Store }) => (
  <Provider store={store}>
    <div className="app-wrapper">
      <AppControl className="app-wrapper__app-control" productName="Twisty" />
      <MapContainer className="app-wrapper__map" />
    </div>
  </Provider>
);

export default hot(module)(App);
