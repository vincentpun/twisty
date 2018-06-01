import { createAction, ActionUnion } from 'src/state/actions';
import { AppUIActionTypes } from './actionTypes';
import { AppUIMode } from './reducer';

export const switchMode = (mode: AppUIMode) => createAction(AppUIActionTypes.SwitchMode, mode);

export const actions = {
  switchMode,
};

export type Actions = ActionUnion<typeof actions>;
