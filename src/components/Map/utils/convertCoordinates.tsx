import { Coords } from "google-map-react";

import { MapCoordinates } from "src/state/ui/AppControl/types";

export const coordinatesToGRMCoordinates = (coordinates: MapCoordinates): Coords => ({
  lat: coordinates.latitude,
  lng: coordinates.longitude,
});

export const grmCoordinatesToCoordinates = (coordinates: Coords): MapCoordinates => ({
  latitude: coordinates.lat,
  longitude: coordinates.lng,
})
