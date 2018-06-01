import * as React from 'react';
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';

import { Trash } from 'src/components/Icons';
import { AppUIMode } from '../../../../state/ui/reducer';
import { switchMode } from 'src/state/ui/actions';

interface RouteControlProps {
  switchMode: (mode: AppUIMode) => any;
}

const RouteControl = ({ switchMode }: RouteControlProps) => (
  <button
    onClick={(e) => { e.preventDefault(); switchMode(AppUIMode.AppControl); }}
    className="app-control__switch-button"
  >
    Back
  </button>
);

const mapDispatchToProps = (dispatch: Dispatch) => ({
  switchMode: (mode: AppUIMode) => dispatch(switchMode(mode)),
});

export default connect(null, mapDispatchToProps)(RouteControl);
