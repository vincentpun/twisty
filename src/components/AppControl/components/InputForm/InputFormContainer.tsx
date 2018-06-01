import * as React from 'react';
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';

import { StartingLocationPicker, LocationPicker } from './components';
import { Trash } from 'src/components/Icons';
import { AppUIMode } from '../../../../state/ui/reducer';
import { switchMode } from 'src/state/ui/actions';

interface InputFormContainerProps {
  switchMode: (mode: AppUIMode) => any;
}

const InputFormContainer = ({ switchMode }: InputFormContainerProps) => (
  <div className="app-control__input-form">
    <StartingLocationPicker />
    <hr />
    <LocationPicker
      sectionTitle="Dropoff Locations"
      items={[]}
    />
    <hr />
    <button
      onClick={(e) => { e.preventDefault(); switchMode(AppUIMode.Route); }}
      className="app-control__switch-button"
    >
      Route
    </button>
  </div>
);

const mapDispatchToProps = (dispatch: Dispatch) => ({
  switchMode: (mode: AppUIMode) => dispatch(switchMode(mode)),
});

export default connect(null, mapDispatchToProps)(InputFormContainer);
