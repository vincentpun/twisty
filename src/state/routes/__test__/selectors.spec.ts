import * as selectors from '../selectors';
import { RecursivePartial } from 'src/utils/types';
import { State } from 'src/state/reducer';

describe('routes selectors', () => {
  describe('getQuery', () => {
    it('gets the query', () => {
      const state: RecursivePartial<State> = {
        routes: {
          queries: {
            test: {
              id: 'test',
            },
          },
        },
      };

      expect(selectors.getQuery(state as State, 'test')).toEqual({ id: 'test' });
      expect(selectors.getQuery(state as State, 'test2')).toBeUndefined();
    });
  });
});
