import { zipObj } from 'ramda';

import { MapCoordinates } from 'src/state/ui/AppControl/types';

export const formatCoordinates = (coordinates: MapCoordinates) => `${coordinates.latitude.toFixed(5)}, ${coordinates.longitude.toFixed(5)}`;

export const stringArrayCoordinatesToMapCoordinates = (coordinates: string[][]): MapCoordinates =>
  coordinates.map(c => zipObj(['latitude', 'longitude'], c.map(parseFloat))) as any;
