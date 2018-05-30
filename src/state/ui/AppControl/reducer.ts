import { combineReducers } from 'redux';

import { createAction } from 'src/state/actions';
import { AppControlUIActionTypes } from './actionTypes';
import { AppControlSession } from './types';
import { Actions } from './actions';

export interface AppControlUIState {
  pickSession: AppControlSession;
}

const initialState: AppControlUIState = {
  pickSession: null,
};

export const pickSession = (state = initialState.pickSession, action: Actions) => {
  switch (action.type) {
    case AppControlUIActionTypes.PickSessionBegin:
      return action.payload;
    case AppControlUIActionTypes.PickSessionEnd:
      return null;
    default:
      return state;
  }
}

export default combineReducers<AppControlUIState>({
  pickSession,
});
