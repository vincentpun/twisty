import { v4 as uuid } from 'uuid';
import { Dispatch } from 'redux';

import { RoutesActionsTypes } from './actionTypes';
import { createAction, ActionUnion, ActionWithPayload } from 'src/state/actions';
import { MapCoordinates } from 'src/state/ui/AppControl/types';
import * as api from './api';
import { create } from 'domain';
import { State } from 'src/state/reducer';
import { getQuery } from './selectors';
import { RouteQueryStatus } from './reducer';
import { stringArrayCoordinatesToMapCoordinates } from 'src/utils/formatCoordinates';

export const createQuery = () => createAction(RoutesActionsTypes.CreateQuery, uuid());

export const queryRoutes =
  (id: string, startingCoordinates: MapCoordinates, dropoffCoordinates: MapCoordinates[]) =>
  async (dispatch: Dispatch) => {
    dispatch(createAction(RoutesActionsTypes.FetchRoutesToken, id));

    api.getRoute(startingCoordinates, dropoffCoordinates)
      .then(response => {
        dispatch(createAction(RoutesActionsTypes.FetchRoutesTokenReceive, {
          id,
          token: response.token,
        }));
      }).catch(error => {
        dispatch(createAction(RoutesActionsTypes.QueryError, {
          id,
          error,
        }));
      });
  };

export const pollQuery =
  (id: string) =>
  async (dispatch: Dispatch, getState: () => State) => {
    const state = getState();
    const query = getQuery(state, id);

    if (query.status !== RouteQueryStatus.ToPoll) {
      return;
    }

    dispatch(createAction(RoutesActionsTypes.PollResult, id));

    api.poll(query.token)
      .then(response => {
        if (response.status === 'failure') {
          return Promise.reject(response.error);
        }

        if (response.status === 'in progress') {
          dispatch(createAction(RoutesActionsTypes.PollResultReceiveInProgress, id));
        }

        if (response.status === 'success') {
          dispatch(createAction(RoutesActionsTypes.QuerySuccess, id));
          dispatch(createAction(RoutesActionsTypes.QueryReceive, {
            id,
            response: {
              waypoints: stringArrayCoordinatesToMapCoordinates(response.path),
              totalDistance: response.total_distance,
              totalTime: response.total_time,
            },
          }));
        }
      })
      .catch(error => {
        dispatch(createAction(RoutesActionsTypes.QueryError, {
          id,
          error,
        }));
      });
  };

export const actions = {
  createQuery,
  queryRoutes,
  pollQuery,
};

export type Actions =
  ActionWithPayload<RoutesActionsTypes.CreateQuery, string> |
  ActionWithPayload<RoutesActionsTypes.FetchRoutesToken, string> |
  ActionWithPayload<RoutesActionsTypes.FetchRoutesTokenReceive, any> |
  ActionWithPayload<RoutesActionsTypes.PollResult, string> |
  ActionWithPayload<RoutesActionsTypes.PollResultReceiveInProgress, string> |
  ActionWithPayload<RoutesActionsTypes.QuerySuccess, string> |
  ActionWithPayload<RoutesActionsTypes.QueryReceive, any> |
  ActionWithPayload<RoutesActionsTypes.QueryError, any>;
