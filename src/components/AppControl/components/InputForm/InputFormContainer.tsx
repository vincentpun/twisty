import * as React from 'react';
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import { isNil } from 'ramda';

import { StartingLocationPicker, LocationPicker } from './components';
import { Trash } from 'src/components/Icons';
import { AppUIMode } from 'src/state/ui/reducer';
import { switchMode } from 'src/state/ui/actions';
import { State } from 'src/state/reducer';
import { getStartingCoordinates } from 'src/state/ui/AppControl/selectors';
import { MapCoordinatesMap } from 'src/state/ui/AppControl/reducer';

interface InputFormContainerProps {
  switchMode: (mode: AppUIMode) => any;
  startingCoordinates?: MapCoordinatesMap;
}

const InputFormContainer = ({ switchMode, startingCoordinates }: InputFormContainerProps) => (
  <div>
    <StartingLocationPicker />
    <hr />
    <LocationPicker
      sectionTitle="Dropoff Locations"
      items={[]}
    />
    <hr />
    <button
      disabled={isNil(startingCoordinates)}
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
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  switchMode: (mode: AppUIMode) => dispatch(switchMode(mode)),
});

export default connect(mapStateToProps, mapDispatchToProps)(InputFormContainer);
