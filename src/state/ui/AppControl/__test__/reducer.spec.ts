import appControl, * as reducer from '../reducer';
import { AppControlUIActionTypes } from '../actionTypes';
import { AppControlSelection, AppControlSelectionSection } from '../types';

describe('appControl', () => {
  it('matches the snapshot', () => {
    const state = appControl(undefined, { type: null });
    expect(state).toMatchSnapshot();
  });

  describe('selection', () => {
    it('matches the snapshot', () => {
      const state = reducer.selection(undefined, { type: null, payload: null });
      expect(state).toMatchSnapshot();
    });

    it('handles AppControlUIActionTypes.Select', () => {
      let state = reducer.selection(AppControlSelectionSection.StartingLocation,{
        type: AppControlUIActionTypes.Select,
        payload: null,
      });
      expect(state).toEqual(null);

      state = reducer.selection(null, {
        type: AppControlUIActionTypes.Select,
        payload: AppControlSelectionSection.StartingLocation,
      });
      expect(state).toEqual(AppControlSelectionSection.StartingLocation);

      state = reducer.selection(null, {
        type: AppControlUIActionTypes.Select,
        payload: 'test',
      });
      expect(state).toEqual('test');
    });
  });
});
