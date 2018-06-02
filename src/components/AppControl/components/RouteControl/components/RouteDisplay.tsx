import * as React from 'react';
import { v4 as uuid } from 'uuid';

import { MapCoordinates } from 'src/state/ui/AppControl/types';
import { formatSeconds } from 'src/utils/formatSeconds';
import { formatCoordinates } from 'src/utils/formatCoordinates';
import { formatMetersAsKilometers } from 'src/utils/formatMetersAsKilometers';

interface RouteDisplayProps {
  totalTime: number;
  totalDistance: number;
  wayPoints: MapCoordinates[];
}

const RouteDisplay = ({ totalTime, totalDistance, wayPoints }: RouteDisplayProps) => (
  <div className="route-display">
    <div className="route-display__statistic">
      {formatSeconds(totalTime)}
      <div className="route-display__statistic-label">
        Total Time
      </div>
    </div>
    <div className="route-display__statistic">
      {formatMetersAsKilometers(totalDistance)} km
      <div className="route-display__statistic-label">
        Total Distance
      </div>
    </div>
    {
      wayPoints.length > 0 ?
        <React.Fragment>
          <hr />
          <ul className="list-group">
            {
              wayPoints.map(p => (
                <li key={uuid()} className="list-group-item">{formatCoordinates(p)}</li>
              ))
            }
          </ul>
        </React.Fragment> :
        null
    }
  </div>
);

export default RouteDisplay;
