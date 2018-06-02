import { combineReducers } from 'redux';
import { Actions } from 'src/state/routes/actions';
import { RoutesActionsTypes } from '../../routes/actionTypes';

export interface RoutesState {
  query: Readonly<string>;
}

export const query = (state: string = null, action: Actions) => {
  switch (action.type) {
    case RoutesActionsTypes.CreateQuery:
      return action.payload;
    default:
      return state;
  }
};

export default combineReducers({
  query,
});
