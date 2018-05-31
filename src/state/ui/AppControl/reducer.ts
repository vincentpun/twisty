import { combineReducers } from 'redux';

import { createAction } from 'src/state/actions';
import { AppControlUIActionTypes } from './actionTypes';
import { AppControlSelection } from './types';
import { Actions } from './actions';

export interface AppControlUIState {
  selection: AppControlSelection;
}

const initialState: AppControlUIState = {
  selection: null,
};

export const selection = (state = initialState.selection, action: Actions) => {
  switch (action.type) {
    case AppControlUIActionTypes.Select:
      return action.payload;
    default:
      return state;
  }
}

export default combineReducers<AppControlUIState>({
  selection,
});
