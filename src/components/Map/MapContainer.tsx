import * as React from 'react';
import * as classNames from 'classnames';
import GoogleMapReact from 'google-map-react';

import { MapCoordinates } from 'src/state/ui/AppControl/types';

interface MapProps {
  className?: string;
}

const Map = ({ className }: MapProps) => {
  return (
    <div className={classNames('map', className)}>
      <GoogleMapReact
        defaultCenter={{
          lat: 22.3103691,
          lng: 114.174259,
        }}
        defaultZoom={12}
        bootstrapURLKeys={{
          key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
        }}
      />
    </div>
  );
};

export default Map
