import * as React from 'react';
import { hot } from 'react-hot-loader';

import InputFormContainer from './components/InputForm';
import AppSidebar from './components/AppSidebar';

class App extends React.Component {
  render() {
    return (
      <div className="row no-gutters">
        <AppSidebar productName="Twisty">
          <InputFormContainer />
        </AppSidebar>
        <div className="col">
        </div>
      </div>
    );
  }
}

export default hot(module)(App);
