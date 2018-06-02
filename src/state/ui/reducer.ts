import { combineReducers } from 'redux';

import appControl, { AppControlUIState } from './AppControl/reducer';
import routes, { RoutesState } from './Routes/reducer';
import { Actions } from './actions';
import { AppUIActionTypes } from './actionTypes';

export interface UIState {
  mode: Readonly<AppUIMode>,
  routes: Readonly<RoutesState>,
  appControl: Readonly<AppControlUIState>,
}

export enum AppUIMode {
  AppControl = 'appControl',
  Route = 'route',
}

export const mode = (state = AppUIMode.AppControl, action: Actions) => {
  switch (action.type) {
    case AppUIActionTypes.SwitchMode:
      return action.payload;
    default:
      return state;
  }
}

export default combineReducers<UIState>({
  appControl,
  routes,
  mode,
});
