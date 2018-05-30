import appControl, * as reducer from '../reducer';
import { AppControlUIActionTypes } from '../actionTypes';
import { AppControlSession } from '../types';

describe('appControl', () => {
  it('matches the snapshot', () => {
    const state = appControl(undefined, { type: null });
    expect(state).toMatchSnapshot();
  });

  describe('pickSession', () => {
    it('matches the snapshot', () => {
      const state = reducer.pickSession(undefined, { type: null });
      expect(state).toEqual(null);
    });

    it('handles AppControlUIActionTypes.PickSessionBegin', () => {
      let state = reducer.pickSession(null, {
        type: AppControlUIActionTypes.PickSessionBegin,
        payload: AppControlSession.StartingPoint
      });
      expect(state).toEqual(AppControlSession.StartingPoint);

      state = reducer.pickSession(AppControlSession.StartingPoint, {
        type: AppControlUIActionTypes.PickSessionBegin,
        payload: AppControlSession.EndingPoint
      });
      expect(state).toEqual(AppControlSession.EndingPoint);
    });

    it('handles AppControlUIActionTypes.PickSessionEnd', () => {
      const state = reducer.pickSession(AppControlSession.EndingPoint, {
        type: AppControlUIActionTypes.PickSessionEnd,
      });
      expect(state).toEqual(null);
    });
  });
});
