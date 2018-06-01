import { MapCoordinates } from "../state/ui/AppControl/types";

export const formatCoordinates = (coordinates: MapCoordinates) => `${coordinates.latitude.toFixed(5)}, ${coordinates.longitude.toFixed(5)}`;
