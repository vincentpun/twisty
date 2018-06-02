import { Dispatch } from 'redux';
import { v4 as uuid } from 'uuid';

import { createAction, ActionUnion, Action, ActionWithPayload } from 'src/state/actions';
import { AppControlUIActionTypes } from './actionTypes';
import { AppControlSelection, AppControlSelectionSection, MapCoordinates } from './types';
import { MapCoordinatesMap, coordinates } from './reducer';
import { create } from 'domain';

export const beginPickSession = (section: AppControlSelectionSection) => createAction(
  AppControlUIActionTypes.Select,
  section,
);

export const endPickSession = () => deselect();

export const selectItem = (id: string) => createAction(
  AppControlUIActionTypes.Select,
  id,
);

export const deselect = () => createAction(
  AppControlUIActionTypes.Select,
  null,
);

export const getClientLocation = () => async (dispatch: Dispatch) => {
  dispatch(createAction(AppControlUIActionTypes.FetchClientLocationRequest));

  if (navigator === undefined || navigator.geolocation === undefined) {
    dispatch(createAction(AppControlUIActionTypes.FetchClientLocationRequestError));
  } else {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    }).then((position: Position) => {
      dispatch(createAction(AppControlUIActionTypes.FetchClientLocationRequestSuccess));
      dispatch(createAction(AppControlUIActionTypes.FetchClientLocationReceive, {
        id: uuid(),
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      } as MapCoordinatesMap));
    }, (error) => {
      dispatch(createAction(AppControlUIActionTypes.FetchClientLocationRequestError));
      throw error;
    });
  }
};

export const addDropoffCoordinates = (coordinates: MapCoordinates) =>
  createAction(AppControlUIActionTypes.AddDropoffLocation, {
    id: uuid(),
    ...coordinates,
  } as MapCoordinatesMap);

export const pickStartingLocation = (coordinates: MapCoordinates) =>
  createAction(AppControlUIActionTypes.PickStartingPoint, {
    id: uuid(),
    ...coordinates,
  } as MapCoordinatesMap);

export const removeCoordinates = (coordinates: MapCoordinatesMap) =>
  createAction(AppControlUIActionTypes.RemoveCoordinates, coordinates);

export const actions = {
  beginPickSession,
  endPickSession,
  selectItem,
  deselect,
  addDropoffCoordinates,
  pickStartingLocation,
  removeCoordinates,
};

export type Actions =
  ActionUnion<typeof actions> |
  Action<AppControlUIActionTypes.FetchClientLocationRequest> |
  Action<AppControlUIActionTypes.FetchClientLocationRequestError> |
  Action<AppControlUIActionTypes.FetchClientLocationRequestSuccess> |
  ActionWithPayload<AppControlUIActionTypes.FetchClientLocationReceive, MapCoordinatesMap>
;
