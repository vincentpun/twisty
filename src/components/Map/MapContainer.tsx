import * as React from 'react';
import { bindActionCreators } from 'redux';
import { connect, Dispatch } from 'react-redux';
import * as classNames from 'classnames';
import GoogleMapReact, { ClickEventValue, ChangeEventValue } from 'google-map-react';

import { MapCoordinates, AppControlSelectionSection } from 'src/state/ui/AppControl/types';
import { State } from 'src/state/reducer';
import { getStartingCoordinates, getCurrentSelection, getCoordinatesById } from 'src/state/ui/AppControl/selectors';
import { MapCoordinatesMap, startingCoordinates } from 'src/state/ui/AppControl/reducer';
import MapMarker, { MapMarkerColor } from './MapMarker';
import { selectItem, pickStartingLocation, deselect } from 'src/state/ui/AppControl/actions';
import { grmCoordinatesToCoordinates, coordinatesToGRMCoordinates } from './utils/convertCoordinates';
import * as Constants from './utils/constants';
import PathDrawer from './PathDrawer';
import { getMode } from 'src/state/ui/selectors';
import { AppUIMode } from '../../state/ui/reducer';

interface MapProps {
  className?: string;
  startingCoordinates: MapCoordinatesMap;
  currentSelection: string | AppControlSelectionSection;
  currentSelectionCoordinates: MapCoordinatesMap;
  mode: AppUIMode;
  selectMarker: (id: string) => any;
  pickStartingLocation: (coordinates: MapCoordinates) => any;
  deselect: () => any;
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
    const { currentSelection, pickStartingLocation, deselect } = this.props;

    const coordinates = grmCoordinatesToCoordinates(value);

    if (currentSelection === AppControlSelectionSection.StartingLocation) {
      pickStartingLocation(coordinates);
      deselect();
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
    const { className, startingCoordinates, mode } = this.props;
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
            !!startingCoordinates ?
            <MapMarker
              key={startingCoordinates.id}
              color={MapMarkerColor.Red}
              lat={startingCoordinates.latitude}
              lng={startingCoordinates.longitude}
              id={startingCoordinates.id}
            /> :
            null
          }
        </GoogleMapReact>

        {
          mode === AppUIMode.Route ?
            <PathDrawer
              map={this._map}
              maps={this._maps}
              coordinates={[
                {
                  latitude: 22.372081,
                  longitude: 114.107877,
                },
                {
                  latitude: 22.326442,
                  longitude: 114.167811,
                },
                {
                  latitude: 22.284419,
                  longitude: 114.159510,
                }
              ]}
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
  mode: getMode(state),
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  selectMarker: (id: string) => dispatch(selectItem(id)),
  pickStartingLocation: (coordinates: MapCoordinates) => dispatch(pickStartingLocation(coordinates)),
  deselect: () => dispatch(deselect()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Map);
