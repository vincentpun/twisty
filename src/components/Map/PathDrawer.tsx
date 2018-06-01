import * as React from 'react';

import { MapCoordinates } from 'src/state/ui/AppControl/types';
import { coordinatesToGRMCoordinates, coordinatesToDirectionCoordinates } from './utils/convertCoordinates';

interface PathDrawerProps {
  maps: any;
  map: any;
  coordinates: MapCoordinates[];
  onPathDrawError?: (status: string) => any;
}

class PathDrawer extends React.Component<PathDrawerProps> {
  private _routes: any;
  private _directionDisplay: any;
  private _service: any;
  private _maps: any;
  private _map: any;

  componentDidUpdate(prevProps: PathDrawerProps, prevState: {}, snapshot: any) {
    const { coordinates: oldCoordinates, map: oldMap, maps: oldMaps } = prevProps;
    const { coordinates, map, maps, onPathDrawError } = this.props;

    if (map !== oldMap) {
      this._map = map;

      if (!!this._map && !!this._directionDisplay) {
        this._directionDisplay.setMap(this._map);

        if (!!this._routes) {
          this._directionDisplay.setDirections(this._routes);
        }
      }
    }

    if (maps !== oldMaps) {
      this._maps = maps;

      if (!!this._maps) {
        this._service = new this._maps.DirectionsService();
        this._directionDisplay = new this._maps.DirectionsRenderer({ preserveViewport: true });

        if (!!this._map) {
          this._directionDisplay.setMap(this._map);
        }

        if (!!this._routes) {
          this._directionDisplay.setDirections(this._routes);
        }
      }
    }

    if (coordinates !== oldCoordinates) {
      this._routes = null;

      if (!!this._directionDisplay && coordinates.length < 2) {
        this._directionDisplay.setDirections([]);
      }

      if (!!this._directionDisplay && !!this._service && coordinates.length >= 2) {
        let waypoints: object[] = [];
        for (let i = 1; i < coordinates.length - 1; i++) {
          waypoints.push({
            location: coordinatesToDirectionCoordinates(coordinates[i]),
            stopover: true,
          });
        }

        new Promise((resolve, reject) =>
          this._service.route({
            origin: coordinatesToDirectionCoordinates(coordinates[0]),
            destination: coordinatesToDirectionCoordinates(coordinates[coordinates.length - 1]),
            waypoints,
            optimizeWaypoints: true,
            travelMode: this._maps.DirectionsTravelMode.DRIVING,
          }, function(response: any, status: string) {
            if (status === 'OK') {
              resolve(response);
            } else {
              reject(status);
            }
          })
        ).then(response => {
          this._routes = response;
          this._directionDisplay.setDirections(response);
        }).catch(status =>
          !!onPathDrawError ? onPathDrawError(status) : null
        );
      }
    }
  }

  componentWillUnmount() {
    if (!!this._directionDisplay) {
      this._directionDisplay.setMap(null);
    }
  }

  render(): null {
    return null;
  }
}

export default PathDrawer;
