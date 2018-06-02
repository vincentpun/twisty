import * as React from 'react';
import { bindActionCreators } from 'redux';
import { connect, Dispatch } from 'react-redux';
import * as classNames from 'classnames';
import GoogleMapReact, { ClickEventValue, ChangeEventValue } from 'google-map-react';

import { MapCoordinates, AppControlSelectionSection } from 'src/state/ui/AppControl/types';
import { State } from 'src/state/reducer';
import { getStartingCoordinates, getCurrentSelection, getCoordinatesById, getDropoffCoordinates } from 'src/state/ui/AppControl/selectors';
import { MapCoordinatesMap, startingCoordinates } from 'src/state/ui/AppControl/reducer';
import MapMarker, { MapMarkerColor } from './MapMarker';
import { selectItem, pickStartingLocation, deselect, addDropoffCoordinates } from 'src/state/ui/AppControl/actions';
import { grmCoordinatesToCoordinates, coordinatesToGRMCoordinates } from './utils/convertCoordinates';
import * as Constants from './utils/constants';
import PathDrawer from './PathDrawer';
import { getMode } from 'src/state/ui/selectors';
import { AppUIMode } from 'src/state/ui/reducer';
import { getCurrentRouteQuery } from 'src/state/ui/Routes/selectors';
import { RouteQuery } from 'src/state/routes/reducer';
import { getMarkerColor } from './utils/getMarkerColor';

interface MapProps {
  className?: string;
  startingCoordinates: MapCoordinatesMap;
  dropoffCoordinates: MapCoordinatesMap[];
  currentSelection: string | AppControlSelectionSection;
  currentSelectionCoordinates: MapCoordinatesMap;
  mode: AppUIMode;
  selectMarker: (id: string) => any;
  pickStartingLocation: (coordinates: MapCoordinates) => any;
  addDropoffCoordinates: (coordinates: MapCoordinates) => any;
  deselect: () => any;
  query: RouteQuery;
}

interface MapState {
  center: MapCoordinates;
}

class Map extends React.Component<MapProps, MapState> {
  private _map: any;
  private _maps: any;

  constructor(props: MapProps) {
    super(props);

    this.handleChildClick = this.handleChildClick.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleMapLoad = this.handleMapLoad.bind(this);

    this.state = {
      center: Constants.DefaultCenter,
    }
  }

  handleClick(value: ClickEventValue) {
    const { currentSelection, pickStartingLocation, addDropoffCoordinates, deselect } = this.props;

    const coordinates = grmCoordinatesToCoordinates(value);

    if (currentSelection === AppControlSelectionSection.StartingLocation) {
      pickStartingLocation(coordinates);
      deselect();
    } else if (currentSelection === AppControlSelectionSection.DropoffPoints) {
      addDropoffCoordinates(coordinates);
    }
  }

  handleChildClick(hoverKey: any, childProps: any) {
    const { id } = childProps;
    const { selectMarker } = this.props;

    selectMarker(id);
  }

  handleChange(value: ChangeEventValue) {
    this.setState({
      center: grmCoordinatesToCoordinates(value.center),
    });
  }

  handleMapLoad(maps: { map: any, maps: any }) {
    const { map, maps: gMaps } = maps;
    this._map = map;
    this._maps = gMaps;

    this.forceUpdate();
  }

  componentDidUpdate(prevProps: MapProps, prevState: MapState) {
    const { currentSelection: oldSelection } = prevProps;
    const { currentSelection, currentSelectionCoordinates } = this.props;

    if (currentSelection !== oldSelection
      && !!currentSelection
      && (currentSelection !== AppControlSelectionSection.StartingLocation)
      && (currentSelection !== AppControlSelectionSection.DropoffPoints)
    ) {
      this.setState({
        center: currentSelectionCoordinates,
      });
    }
  }

  render() {
    const { className, startingCoordinates, dropoffCoordinates, mode, query, currentSelection } = this.props;
    const { center } = this.state;

    const mapCenter = coordinatesToGRMCoordinates(center);
    const defaultCenter = coordinatesToGRMCoordinates(Constants.DefaultCenter);

    return (
      <div className={classNames('map', className)}>
        <GoogleMapReact
          defaultCenter={defaultCenter}
          defaultZoom={12}
          bootstrapURLKeys={{
            key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
          }}
          center={mapCenter}
          onChange={this.handleChange}
          onChildClick={this.handleChildClick}
          onClick={this.handleClick}
          onGoogleApiLoaded={this.handleMapLoad}
          yesIWantToUseGoogleMapApiInternals={true}
        >
          {
            !!startingCoordinates && mode !== AppUIMode.Route ?
            <MapMarker
              key={startingCoordinates.id}
              color={getMarkerColor(AppControlSelectionSection.StartingLocation)}
              lat={startingCoordinates.latitude}
              lng={startingCoordinates.longitude}
              id={startingCoordinates.id}
            /> :
            null
          }
          {
            dropoffCoordinates.length > 0 && mode !== AppUIMode.Route ?
            dropoffCoordinates.map(dc => (
              <MapMarker
                key={dc.id}
                color={getMarkerColor(AppControlSelectionSection.DropoffPoints)}
                lat={dc.latitude}
                lng={dc.longitude}
                id={dc.id}
              />
            )) :
            null
          }
        </GoogleMapReact>

        {
          mode === AppUIMode.Route && !!query && !!query.response ?
            <PathDrawer
              map={this._map}
              maps={this._maps}
              coordinates={query.response.waypoints}
            /> :
            null
        }
      </div>
    );
  }
};

const mapStateToProps = (state: State) => ({
  currentSelection: getCurrentSelection(state),
  startingCoordinates: getStartingCoordinates(state),
  currentSelectionCoordinates: getCoordinatesById(state, getCurrentSelection(state)),
  query: getCurrentRouteQuery(state),
  dropoffCoordinates: getDropoffCoordinates(state),
  mode: getMode(state),
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  selectMarker: (id: string) => dispatch(selectItem(id)),
  pickStartingLocation: (coordinates: MapCoordinates) => dispatch(pickStartingLocation(coordinates)),
  addDropoffCoordinates: (coordinates: MapCoordinates) => dispatch(addDropoffCoordinates(coordinates)),
  deselect: () => dispatch(deselect()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Map);
