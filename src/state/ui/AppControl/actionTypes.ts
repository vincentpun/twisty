export enum AppControlUIActionTypes {
  Select = 'APP_CONTROL_SELECT',

  FetchClientLocationRequest = 'APP_CONTROL_FETCH_CLIENT_LOCATION_REQUEST',
  FetchClientLocationReceive = 'APP_CONTROL_FETCH_CLIENT_LOCATION_RECEIVE',
  FetchClientLocationRequestSuccess = 'APP_CONTROL_FETCH_CLIENT_LOCATION_REQUEST_SUCCESS',
  FetchClientLocationRequestError = 'APP_CONTROL_FETCH_CLIENT_LOCATION_REQUEST_ERROR',

  PickStartingPoint = 'APP_CONTROL_PICK_STARTING_POINT',
  RemoveCoordinates = 'APP_CONTROL_REMOVE_COORDINATES',

  AddDropoffLocation = 'APP_CONTROL_ADD_DROPOFF_LOCATION',
}
