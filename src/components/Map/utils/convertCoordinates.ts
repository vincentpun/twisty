import { Coords } from "google-map-react";

import { MapCoordinates } from "src/state/ui/AppControl/types";
import { coordinates } from "../../../state/ui/AppControl/reducer";

export const coordinatesToGRMCoordinates = (coordinates: MapCoordinates): Coords => ({
  lat: coordinates.latitude,
  lng: coordinates.longitude,
});

export const grmCoordinatesToCoordinates = (coordinates: Coords): MapCoordinates => ({
  latitude: coordinates.lat,
  longitude: coordinates.lng,
})

export const coordinatesToDirectionCoordinates = (coordinates: MapCoordinates): string =>
  `${coordinates.latitude}, ${coordinates.longitude}`;
