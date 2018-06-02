import * as reducer from '../reducer';
import { RoutesActionsTypes } from '../actionTypes';
import { RouteQueryStatus } from '../reducer';

describe('routes reducer', () => {
  it('matches the snapshot', () => {
    const state = reducer.default(undefined, { type: null });
    expect(state).toMatchSnapshot();
  });

  describe('queries', () => {
    it('matches the snapshot', () => {
      const state = reducer.queries(undefined, { type: null, payload: null });
      expect(state).toMatchSnapshot();
    });

    it('handles RoutesActionsTypes.CreateQuery', () => {
      let state = reducer.queries({}, {
        type: RoutesActionsTypes.CreateQuery,
        payload: 'id',
      });
      expect(state).toEqual({
        id: {
          id: 'id',
          status: RouteQueryStatus.NotStarted,
        },
      });

      state = reducer.queries({
        id2: {
          id: 'id2',
          status: RouteQueryStatus.NotStarted,
        },
      }, {
        type: RoutesActionsTypes.CreateQuery,
        payload: 'id',
      });
      expect(state).toEqual({
        id2: {
          id: 'id2',
          status: RouteQueryStatus.NotStarted,
        },
        id: {
          id: 'id',
          status: RouteQueryStatus.NotStarted,
        },
      });
    });

    it('handles RoutesActionsTypes.FetchRoutesToken', () => {
      const state = reducer.queries({
        id: {
          id: 'id',
          status: RouteQueryStatus.NotStarted,
        }
      }, {
        type: RoutesActionsTypes.FetchRoutesToken,
        payload: 'id',
      });
      expect(state).toEqual({
        id: {
          id: 'id',
          status: RouteQueryStatus.FetchingRoutesToken,
        },
      });
    });

    it('handles RoutesActionsTypes.FetchRoutesTokenReceive', () => {
      const state = reducer.queries({
        id: {
          id: 'id',
          status: RouteQueryStatus.FetchingRoutesToken,
        }
      }, {
        type: RoutesActionsTypes.FetchRoutesTokenReceive,
        payload: {
          id: 'id',
          token: 'test',
        },
      });
      expect(state).toEqual({
        id: {
          id: 'id',
          status: RouteQueryStatus.ToPoll,
          token: 'test',
        },
      });
    });

    it('handles RoutesActionsTypes.PollResult', () => {
      const state = reducer.queries({
        id: {
          id: 'id',
          status: RouteQueryStatus.ToPoll,
          token: 'test',
        }
      }, {
        type: RoutesActionsTypes.PollResult,
        payload: 'id',
      });
      expect(state).toEqual({
        id: {
          id: 'id',
          status: RouteQueryStatus.PollingInProgress,
          token: 'test',
        },
      });
    });

    it('handles RoutesActionsTypes.PollResultReceiveInProgress', () => {
      const state = reducer.queries({
        id: {
          id: 'id',
          status: RouteQueryStatus.PollingInProgress,
          token: 'test',
        }
      }, {
        type: RoutesActionsTypes.PollResultReceiveInProgress,
        payload: 'id',
      });
      expect(state).toEqual({
        id: {
          id: 'id',
          status: RouteQueryStatus.ToPoll,
          token: 'test',
        },
      });
    });

    it('handles RoutesActionsTypes.QuerySuccess', () => {
      const state = reducer.queries({
        id: {
          id: 'id',
          status: RouteQueryStatus.ToPoll,
          token: 'test',
        }
      }, {
        type: RoutesActionsTypes.QuerySuccess,
        payload: 'id',
      });
      expect(state).toEqual({
        id: {
          id: 'id',
          status: RouteQueryStatus.Success,
          token: 'test',
        },
      });
    });

    it('handles RoutesActionsTypes.QueryReceive', () => {
      const state = reducer.queries({
        id: {
          id: 'id',
          status: RouteQueryStatus.Success,
          token: 'test',
        }
      }, {
        type: RoutesActionsTypes.QueryReceive,
        payload: {
          id: 'id',
          response: {
            waypoints: [],
            totalDistance: 10,
            totalTime: 10,
          },
        },
      });
      expect(state).toEqual({
        id: {
          id: 'id',
          status: RouteQueryStatus.Success,
          token: 'test',
          response: {
            waypoints: [],
            totalDistance: 10,
            totalTime: 10,
          },
        },
      });
    });

    it('handles RoutesActionsTypes.QueryError', () => {
      const state = reducer.queries({
        id: {
          id: 'id',
          status: RouteQueryStatus.ToPoll,
          token: 'test',
        }
      }, {
        type: RoutesActionsTypes.QueryError,
        payload: {
          id: 'id',
          error: 'test',
        },
      });
      expect(state).toEqual({
        id: {
          id: 'id',
          status: RouteQueryStatus.Error,
          token: 'test',
          error: 'test',
        },
      });
    });
  });
});
