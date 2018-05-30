import * as React from 'react';
import { hot } from 'react-hot-loader';

import AppControl from './components/AppControl';

class App extends React.Component {
  render() {
    return (
      <div className="row no-gutters">
        <AppControl productName="Twisty" />
        <div className="col">
        </div>
      </div>
    );
  }
}

export default hot(module)(App);
