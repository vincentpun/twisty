import { combineReducers } from 'redux';

import { Actions } from './actions';
import { RoutesActionsTypes } from './actionTypes';
import { MapCoordinates } from '../ui/AppControl/types';

export enum RouteQueryStatus {
  NotStarted = 'ROUTE_QUERY_STATUS_NOT_STARTED',
  FetchingRoutesToken = 'ROUTE_QUERY_STATUS_FETCHING_ROUTES_TOKEN',
  ToPoll = 'ROUTE_QUERY_STATUS_TO_POLL',
  PollingInProgress = 'ROUTE_QUERY_STATUS_POLLING_IN_PROGRESS',
  Success = 'ROUTE_QUERY_STATUS_SUCCESS',
  Error = 'ROUTE_QUERY_STATUS_ERROR',
}

export interface RoutesState {
  queries: {
    [id: string]: RouteQuery;
  };
}

export interface RouteQuery {
  id: string;
  status: RouteQueryStatus;
  token?: string;
  response?: {
    waypoints: MapCoordinates[];
    totalDistance: number;
    totalTime: number;
    [key: string]: any;
  }
  error?: any;
}

const initialState = {
  queries: {} as { [id: string]: RouteQuery },
};

export const queries = (state = initialState.queries, action: Actions) => {
  switch (action.type) {
    case RoutesActionsTypes.CreateQuery: {
      const id = action.payload;
      return {
        ...state,
        [id]: {
          id,
          status: RouteQueryStatus.NotStarted,
        },
      };
    }
    case RoutesActionsTypes.FetchRoutesToken: {
      const id = action.payload;
      return {
        ...state,
        [id]: {
          ...state[id],
          status: RouteQueryStatus.FetchingRoutesToken,
        },
      };
    }
    case RoutesActionsTypes.FetchRoutesTokenReceive: {
      const { id, token } = action.payload;
      return {
        ...state,
        [id]: {
          ...state[id],
          status: RouteQueryStatus.ToPoll,
          token,
        },
      };
    };
    case RoutesActionsTypes.PollResult: {
      const id = action.payload;

      return {
        ...state,
        [id]: {
          ...state[id],
          status: RouteQueryStatus.PollingInProgress,
        },
      };
    }
    case RoutesActionsTypes.PollResultReceiveInProgress: {
      const id = action.payload;

      return {
        ...state,
        [id]: {
          ...state[id],
          status: RouteQueryStatus.ToPoll,
        },
      };
    }
    case RoutesActionsTypes.QuerySuccess: {
      const id = action.payload;
      return {
        ...state,
        [id]: {
          ...state[id],
          status: RouteQueryStatus.Success,
        },
      };
    }
    case RoutesActionsTypes.QueryReceive: {
      const { id, response } = action.payload;
      return {
        ...state,
        [id]: {
          ...state[id],
          response,
        }
      };
    }
    case RoutesActionsTypes.QueryError: {
      const { id, error } = action.payload;
      return {
        ...state,
        [id]: {
          ...state[id],
          status: RouteQueryStatus.Error,
          error,
        }
      };
    }
    default:
      return state;
  }
}

export default combineReducers<RoutesState>({
  queries,
});
