import { compose, equals, pathOr, values } from 'ramda';

import { State } from 'src/state/reducer';
import { AppControlSelectionSection } from './types';

export const getCurrentSelection = (state: State) => state.ui.appControl.selection;

export const isPickingSection = (state: State, section: AppControlSelectionSection) =>
  compose(
    equals(section),
    pathOr(null, ['ui', 'appControl', 'selection']),
  )(state);

export const isGrabbingClientLocation = (state: State) => state.ui.appControl.isGrabbingClientLocation;

export const hasFailedGrabbingClientLocation = (state: State) => state.ui.appControl.hasFailedGrabbingClientLocation;

export const getStartingCoordinates = (state: State) => {
  const coordinates = state.ui.appControl.startingCoordinates;
  return !!coordinates ? state.ui.appControl.coordinates[coordinates] : null;
};

export const getCoordinates = (state: State) => values(state.ui.appControl.coordinates);

export const getCoordinatesById = (state: State, id: string) => state.ui.appControl.coordinates[id];
