import { createAction, ActionUnion } from 'src/state/actions';
import { AppControlUIActionTypes } from './actionTypes';
import { AppControlSelection, AppControlSelectionSection } from './types';

export const beginPickSession = (section: AppControlSelectionSection) => createAction(
  AppControlUIActionTypes.Select,
  section,
);

export const endPickSession = () => deselect();

export const selectItem = (section: AppControlSelectionSection, id: string) => createAction(
  AppControlUIActionTypes.Select,
  id,
);

export const deselect = () => createAction(
  AppControlUIActionTypes.Select,
  null,
);

export const actions = {
  beginPickSession,
  endPickSession,
  selectItem,
  deselect,
};

export type Actions = ActionUnion<typeof actions>;
