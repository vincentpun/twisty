import { compose, equals, pathOr } from 'ramda';

import { State } from 'src/state/reducer';
import { AppControlSelectionSection } from './types';

export const getCurrentSelection = (state: State) => state.ui.appControl.selection;

export const isPickingSection = (state: State, section: AppControlSelectionSection) =>
  compose(
    equals(section),
    pathOr(null, ['ui', 'appControl', 'selection']),
  )(state);
