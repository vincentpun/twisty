import * as React from 'react';
import { connect } from 'react-redux';
import * as classNames from 'classnames';

import HeaderBar from './components/HeaderBar';
import InputFormContainer from './components/InputForm';
import { State } from 'src/state/reducer';
import { getMode } from 'src/state/ui/selectors';
import { AppUIMode } from 'src/state/ui/reducer';
import RouteControl from './components/RouteControl';

interface AppControlProps {
  children?: JSX.Element;
  productName: string;
  className?: string;
  mode: AppUIMode;
}

const AppControl = ({ children, productName, mode, className }: AppControlProps) => (
  <div className={classNames('app-control', className)}>
    <HeaderBar title={productName} />
    <div className="app-control__content">
      {
        mode === AppUIMode.AppControl ?
          <InputFormContainer /> :
          mode === AppUIMode.Route ?
            <RouteControl /> :
            null
      }
    </div>
  </div>
);

const mapStateToProps = (state: State) => ({
  mode: getMode(state),
});

export default connect(mapStateToProps)(AppControl);
