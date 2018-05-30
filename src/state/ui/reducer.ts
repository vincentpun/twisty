import { combineReducers } from 'redux';

import appControl, { AppControlUIState } from './AppControl/reducer';

export interface UIState {
  appControl: Readonly<AppControlUIState>,
}

export default combineReducers<UIState>({
  appControl,
});
