import * as React from 'react';
import * as classNames from 'classnames';

import { Marker } from 'src/components/Icons';

interface MapMarkerProps {
  id: string;
  lat: number;
  lng: number;
  color: MapMarkerColor;
}

export enum MapMarkerColor {
  Red = 'red',
  Blue = 'blue',
  Yellow = 'yellow',
}

const MapMarker = ({ id, lat, lng, color }: MapMarkerProps) => (
  <div className={classNames('map__marker', `map__marker--${color}`)}>
    <Marker />
  </div>
);

export default MapMarker;
