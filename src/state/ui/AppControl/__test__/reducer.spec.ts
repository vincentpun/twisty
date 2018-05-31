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
      let state = reducer.selection(AppControlSelectionSection.StartingLocation, {
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

    it('handles AppControlUIActionTypes.RemoveCoordinates', () => {
      let state = reducer.selection('test', {
        type: AppControlUIActionTypes.RemoveCoordinates,
        payload: {
          id: 'test',
          latitude: 10,
          longitude: 10,
        },
      });
      expect(state).toEqual(null);

      state = reducer.selection('test2', {
        type: AppControlUIActionTypes.RemoveCoordinates,
        payload: {
          id: 'test',
          latitude: 10,
          longitude: 10,
        },
      });
      expect(state).toEqual('test2');

      state = reducer.selection(null, {
        type: AppControlUIActionTypes.RemoveCoordinates,
        payload: {
          id: 'test',
          latitude: 10,
          longitude: 10,
        },
      });
      expect(state).toEqual(null);
    });
  });

  describe('isGrabbingClientLocation', () => {
    it('matches the snapshot', () => {
      const state = reducer.isGrabbingClientLocation(undefined, { type: null, payload: null });
      expect(state).toMatchSnapshot();
    });

    it('handles AppControlUIActionTypes.FetchClientLocationRequest', () => {
      const state = reducer.isGrabbingClientLocation(false, { type: AppControlUIActionTypes.FetchClientLocationRequest });
      expect(state).toBe(true);
    });

    it('handles AppControlUIActionTypes.FetchClientLocationRequestError', () => {
      const state = reducer.isGrabbingClientLocation(true, { type: AppControlUIActionTypes.FetchClientLocationRequestError });
      expect(state).toBe(false);
    });

    it('handles AppControlUIActionTypes.FetchClientLocationRequestSuccess', () => {
      const state = reducer.isGrabbingClientLocation(false, { type: AppControlUIActionTypes.FetchClientLocationRequestSuccess });
      expect(state).toBe(false);
    });
  });

  describe('hasFailedGrabbingClientLocation', () => {
    it('matches the snapshot', () => {
      const state = reducer.hasFailedGrabbingClientLocation(undefined, { type: null, payload: null });
      expect(state).toMatchSnapshot();
    });

    it('handles AppControlUIActionTypes.FetchClientLocationRequestError', () => {
      const state = reducer.hasFailedGrabbingClientLocation(false, { type: AppControlUIActionTypes.FetchClientLocationRequestError });
      expect(state).toBe(true);
    });

    it('handles AppControlUIActionTypes.FetchClientLocationRequestSuccess', () => {
      const state = reducer.hasFailedGrabbingClientLocation(true, { type: AppControlUIActionTypes.FetchClientLocationRequestSuccess });
      expect(state).toBe(false);
    });
  });

  describe('startingCoordinates', () => {
    it('matches the snapshot', () => {
      const state = reducer.startingCoordinates(undefined, { type: null, payload: null });
      expect(state).toMatchSnapshot();
    });

    it('handles AppControlUIActionTypes.PickStartingPoint', () => {
      const state = reducer.startingCoordinates(null, {
        type: AppControlUIActionTypes.PickStartingPoint,
        payload: {
          id: 'test',
          latitude: 10,
          longitude: 10,
        },
      });
      expect(state).toBe('test');
    });

    it('handles AppControlUIActionTypes.PickStartingPoint', () => {
      const state = reducer.startingCoordinates(null, {
        type: AppControlUIActionTypes.FetchClientLocationReceive,
        payload: {
          id: 'test',
          latitude: 10,
          longitude: 10,
        },
      });
      expect(state).toBe('test');
    });

    it('handles AppControlUIActionTypes.RemoveCoordinates', () => {
      let state = reducer.selection('test', {
        type: AppControlUIActionTypes.RemoveCoordinates,
        payload: {
          id: 'test',
          latitude: 10,
          longitude: 10,
        },
      });
      expect(state).toEqual(null);

      state = reducer.selection('test2', {
        type: AppControlUIActionTypes.RemoveCoordinates,
        payload: {
          id: 'test',
          latitude: 10,
          longitude: 10,
        },
      });
      expect(state).toEqual('test2');

      state = reducer.selection(null, {
        type: AppControlUIActionTypes.RemoveCoordinates,
        payload: {
          id: 'test',
          latitude: 10,
          longitude: 10,
        },
      });
      expect(state).toEqual(null);
    });
  });

  describe('startingCoordinates', () => {
    it('matches the snapshot', () => {
      const state = reducer.startingCoordinates(undefined, { type: null, payload: null });
      expect(state).toMatchSnapshot();
    });

    it('handles AppControlUIActionTypes.PickStartingPoint', () => {
      const state = reducer.startingCoordinates(null, {
        type: AppControlUIActionTypes.PickStartingPoint,
        payload: {
          id: 'test',
          latitude: 10,
          longitude: 10,
        },
      });
      expect(state).toBe('test');
    });

    it('handles AppControlUIActionTypes.PickStartingPoint', () => {
      const state = reducer.startingCoordinates(null, {
        type: AppControlUIActionTypes.FetchClientLocationReceive,
        payload: {
          id: 'test',
          latitude: 10,
          longitude: 10,
        },
      });
      expect(state).toBe('test');
    });
  });

  describe('coordinates', () => {
    it('matches the snapshot', () => {
      const state = reducer.startingCoordinates(undefined, { type: null, payload: null });
      expect(state).toMatchSnapshot();
    });

    it('handles AppControlUIActionTypes.PickStartingPoint', () => {
      const state = reducer.coordinates({}, {
        type: AppControlUIActionTypes.PickStartingPoint,
        payload: {
          id: 'test',
          latitude: 10,
          longitude: 10,
        },
      });
      expect(state).toEqual({
        'test': {
          id: 'test',
          latitude: 10,
          longitude: 10,
        },
      });
    });

    it('handles AppControlUIActionTypes.PickStartingPoint', () => {
      const state = reducer.coordinates({}, {
        type: AppControlUIActionTypes.FetchClientLocationReceive,
        payload: {
          id: 'test',
          latitude: 10,
          longitude: 10,
        },
      });
      expect(state).toEqual({
        'test': {
          id: 'test',
          latitude: 10,
          longitude: 10,
        },
      });
    });

    it('handles AppControlUIActionTypes.RemoveCoordinates', () => {
      const state = reducer.coordinates({
        a: {
          id: 'a',
          latitude: 10,
          longitude: 10,
        },
      }, {
        type: AppControlUIActionTypes.RemoveCoordinates,
        payload: {
          id: 'a',
          latitude: 10,
          longitude: 10,
        },
      });
      expect(state).toEqual({});
    });
  });
});
