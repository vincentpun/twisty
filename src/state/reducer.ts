import { combineReducers } from 'redux';

import ui, { UIState } from './ui/reducer';

export interface State {
  ui: Readonly<UIState>
}

export default combineReducers<State>({
  ui,
});
