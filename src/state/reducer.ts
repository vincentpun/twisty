import { combineReducers } from 'redux';

import ui, { UIState } from './ui/reducer';
import routes, { RoutesState } from './routes/reducer';

export interface State {
  ui: Readonly<UIState>
  routes: Readonly<RoutesState>,
}

export default combineReducers<State>({
  ui,
  routes,
});
