import * as selectors from '../selectors';
import { State } from 'src/state/reducer';
import { RecursivePartial } from 'src/utils/types';
import { AppControlSession } from '../types';

describe('AppControl selectors', () => {
  it('gets the current session', () => {
    const state: RecursivePartial<State> = {
      ui: {
        appControl: {
          pickSession: AppControlSession.StartingPoint,
        },
      },
    };

    const pickSession = selectors.getPickSession(state);
    expect(pickSession).toEqual(AppControlSession.StartingPoint);
  });
});
