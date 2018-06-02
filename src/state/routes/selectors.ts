import { State } from 'src/state/reducer';

export const getQuery = (state: State, id: string) => state.routes.queries[id];
