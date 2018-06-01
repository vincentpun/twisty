import * as reducer from '../reducer';
import { AppUIActionTypes } from '../actionTypes';

describe('ui', () => {
  it('matches the snapshot', () => {
    const state = reducer.default(undefined, { type: null });
    expect(state).toMatchSnapshot();
  });

  describe('mode', () => {
    it('matches the snapshot', () => {
      const state = reducer.mode(undefined, { type: null, payload: null });
      expect(state).toMatchSnapshot();
    });

    it('handles AppUIActionTypes.SwitchMode', () => {
      let state = reducer.mode(reducer.AppUIMode.Route, { type: AppUIActionTypes.SwitchMode, payload: reducer.AppUIMode.AppControl });
      expect(state).toEqual(reducer.AppUIMode.AppControl);

      state = reducer.mode(reducer.AppUIMode.AppControl, { type: AppUIActionTypes.SwitchMode, payload: reducer.AppUIMode.Route });
      expect(state).toEqual(reducer.AppUIMode.Route);
    });
  });
});
