import { MapCoordinates } from "src/state/ui/AppControl/types";
import { postData, get } from "../../utils/fetchUtils";

const mapCoordinatesToArray = (coordinates: MapCoordinates) => [`${coordinates.latitude}`, `${coordinates.longitude}`];

export const getRoute = (startingCoordinates: MapCoordinates, dropoffCoordinates: MapCoordinates[]) => {
  let coordinates = [mapCoordinatesToArray(startingCoordinates)];
  dropoffCoordinates.forEach(c => coordinates.push(mapCoordinatesToArray(c)));
  return postData('route', coordinates).then(
    response => Promise.resolve(response),
    error => Promise.reject(error.message),
  );
};

export const poll = (token: string) =>
  get(`route/${token}`).then(
    response => Promise.resolve(response),
    error => Promise.reject(error.message),
  );
