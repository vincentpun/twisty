import * as reducer from '../reducer';
import { RoutesActionsTypes } from '../../../routes/actionTypes';

describe('routes', () => {
  it('matches the snapshot', () => {
    const state = reducer.default(undefined, { type: null });
    expect(state).toMatchSnapshot();
  });

  describe('query', () => {
    it('matches the snapshot', () => {
      const state = reducer.default(undefined, { type: null, payload: null });
      expect(state).toMatchSnapshot();
    });

    it('handles RoutesActionsType.UseQuery', () => {
      const state = reducer.query('a', { type: RoutesActionsTypes.CreateQuery, payload: 'b' });
      expect(state).toEqual('b');
    });
  });
});
