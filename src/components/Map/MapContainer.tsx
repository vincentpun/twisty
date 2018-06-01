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

interface MapProps {
  className?: string;
  startingCoordinates: MapCoordinatesMap;
  currentSelection: string | AppControlSelectionSection;
  currentSelectionCoordinates: MapCoordinatesMap;
  selectMarker: (id: string) => any;
  pickStartingLocation: (coordinates: MapCoordinates) => any;
  deselect: () => any;
}

interface MapState {
  center: MapCoordinates;
}

class Map extends React.Component<MapProps, MapState> {
  constructor(props: MapProps) {
    super(props);

    this.handleChildClick = this.handleChildClick.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);

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
    const { className, startingCoordinates } = this.props;
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
      </div>
    );
  }
};

const mapStateToProps = (state: State) => ({
  currentSelection: getCurrentSelection(state),
  startingCoordinates: getStartingCoordinates(state),
  currentSelectionCoordinates: getCoordinatesById(state, getCurrentSelection(state)),
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  selectMarker: (id: string) => dispatch(selectItem(id)),
  pickStartingLocation: (coordinates: MapCoordinates) => dispatch(pickStartingLocation(coordinates)),
  deselect: () => dispatch(deselect()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Map);
