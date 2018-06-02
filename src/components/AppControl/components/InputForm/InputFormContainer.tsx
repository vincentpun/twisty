import * as React from 'react';
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import { isNil } from 'ramda';

import { StartingLocationPicker, LocationPicker, DropoffLocationsPicker } from './components';
import { Trash } from 'src/components/Icons';
import { AppUIMode } from 'src/state/ui/reducer';
import { switchMode } from 'src/state/ui/actions';
import { State } from 'src/state/reducer';
import { getStartingCoordinates, getDropoffCoordinates } from 'src/state/ui/AppControl/selectors';
import { MapCoordinatesMap, dropoffCoordinates } from 'src/state/ui/AppControl/reducer';

interface InputFormContainerProps {
  switchMode: (mode: AppUIMode) => any;
  startingCoordinates?: MapCoordinatesMap;
  dropoffCoordinates?: MapCoordinatesMap[];
}

const InputFormContainer = ({ switchMode, startingCoordinates, dropoffCoordinates }: InputFormContainerProps) => (
  <div>
    <StartingLocationPicker />
    <hr />
    <DropoffLocationsPicker />
    <hr />
    <button
      disabled={
        isNil(startingCoordinates) || isNil(dropoffCoordinates) || dropoffCoordinates.length === 0
      }
      onClick={
        (e) => {
          e.preventDefault();
          switchMode(AppUIMode.Route);
        }
      }
      className="app-control__switch-button"
    >
      Route
    </button>
  </div>
);

const mapStateToProps = (state: State) => ({
  startingCoordinates: getStartingCoordinates(state),
  dropoffCoordinates: getDropoffCoordinates(state),
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  switchMode: (mode: AppUIMode) => dispatch(switchMode(mode)),
});

export default connect(mapStateToProps, mapDispatchToProps)(InputFormContainer);
