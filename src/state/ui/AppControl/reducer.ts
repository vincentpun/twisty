import { omit } from 'ramda';
import { combineReducers } from 'redux';

import { createAction } from 'src/state/actions';
import { AppControlUIActionTypes } from './actionTypes';
import { AppControlSelection, MapCoordinates } from './types';
import { Actions } from './actions';

export interface MapCoordinatesMap extends MapCoordinates {
  id: string;
}

export interface AppControlUIState {
  selection: Readonly<AppControlSelection>;
  isGrabbingClientLocation: Readonly<boolean>;
  hasFailedGrabbingClientLocation: Readonly<boolean>;
  startingCoordinates: Readonly<string>;
  coordinates: {
    [id: string]: MapCoordinatesMap,
  };
}

const initialState: AppControlUIState = {
  selection: null,
  isGrabbingClientLocation: false,
  hasFailedGrabbingClientLocation: false,
  startingCoordinates: null,
  coordinates: {},
};

export const selection = (state = initialState.selection, action: Actions) => {
  switch (action.type) {
    case AppControlUIActionTypes.Select:
      return action.payload;
    case AppControlUIActionTypes.RemoveCoordinates:
      return action.payload.id === state ? null : state;
    default:
      return state;
  }
};

export const isGrabbingClientLocation = (state = initialState.isGrabbingClientLocation, action: Actions) => {
  switch (action.type) {
    case AppControlUIActionTypes.FetchClientLocationRequest:
      return true;
    case AppControlUIActionTypes.FetchClientLocationRequestError:
    case AppControlUIActionTypes.FetchClientLocationRequestSuccess:
      return false;
    default:
      return state;
  }
};

export const hasFailedGrabbingClientLocation = (state = initialState.hasFailedGrabbingClientLocation, action: Actions) => {
  switch (action.type) {
    case AppControlUIActionTypes.FetchClientLocationRequestError:
      return true;
    case AppControlUIActionTypes.FetchClientLocationRequestSuccess:
      return false;
    default:
      return state;
  }
};

export const startingCoordinates = (state = initialState.startingCoordinates, action: Actions) => {
  switch (action.type) {
    case AppControlUIActionTypes.PickStartingPoint:
    case AppControlUIActionTypes.FetchClientLocationReceive:
      return action.payload.id;
    case AppControlUIActionTypes.RemoveCoordinates:
      return action.payload.id === state ? null : state;
    default:
      return state;
  }
}

export const coordinates = (state = initialState.coordinates, action: Actions) => {
  switch (action.type) {
    case AppControlUIActionTypes.PickStartingPoint:
    case AppControlUIActionTypes.FetchClientLocationReceive:
      const map = action.payload;
      return {
        ...state,
        [map.id]: map,
      };
    case AppControlUIActionTypes.RemoveCoordinates:
      return omit([action.payload.id], state);
    default:
      return state;
  }
}

export default combineReducers<AppControlUIState>({
  selection,
  isGrabbingClientLocation,
  hasFailedGrabbingClientLocation,
  startingCoordinates,
  coordinates,
});
