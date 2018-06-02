import { State } from 'src/state/reducer';

export const getCurrentRouteQuery = (state: State) => state.ui.routes.query ? state.routes.queries[state.ui.routes.query] : undefined;
