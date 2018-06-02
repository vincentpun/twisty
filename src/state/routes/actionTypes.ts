export enum RoutesActionsTypes {
  CreateQuery = 'ROUTES_QUERY_CREATE',
  FetchRoutesToken = 'ROUTES_QUERY_FETCH_ROUTES',
  FetchRoutesTokenReceive = 'ROUTES_QUERY_FETCH_ROUTES_TOKEN_RECEIVE',
  PollResult = 'ROUTES_QUERY_POLL_RESULT',
  PollResultReceiveInProgress = 'ROUTES_QUERY_POLL_RESULT_RECEIVE_IN_PROGRESS',
  QuerySuccess = 'ROUTES_QUERY_SUCCESS',
  QueryReceive = 'ROUTES_QUERY_RECEIVE',
  QueryError = 'ROUTES_QUERY_ERROR',
}
