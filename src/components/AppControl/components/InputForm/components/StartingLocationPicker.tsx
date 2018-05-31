import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { bindActionCreators } from 'redux';

import LocationPicker from './LocationPicker';
import { State } from 'src/state/reducer';
import { AppControlSelection, AppControlSelectionSection } from 'src/state/ui/AppControl/types';
import { getCurrentSelection, isPickingSection, getStartingCoordinates } from 'src/state/ui/AppControl/selectors';
import { actions } from 'src/state/ui/AppControl/actions';
import { Trash } from 'src/components/Icons';
import LocationGrabber from './LocationGrabber';
import { MapCoordinatesMap, coordinates } from 'src/state/ui/AppControl/reducer';
import { LocationPickerListItem } from './LocationPicker';

interface StartingLocationPickerProps {
  selection: AppControlSelection;
  isPicking: boolean;
  coordinates: MapCoordinatesMap;
  beginPickSession: (section: AppControlSelectionSection) => any;
  endPickSession: () => any;
  selectItem: (id: string) => any;
  removeCoordinates: (coordinates: MapCoordinatesMap) => any;
}

const StartingLocationPicker = ({
  isPicking,
  selection,
  coordinates,
  beginPickSession,
  endPickSession,
  selectItem,
  removeCoordinates,
}: StartingLocationPickerProps) => {
  let item: LocationPickerListItem;

  if (isPicking) {
    item = {
      key: 'pick',
      title: 'Click to Cancel Picking',
      active: true,
    };
  } else {
    if (!!coordinates) {
      item = {
        key: 'coordinates',
        title: `${coordinates.latitude}, ${coordinates.longitude}`,
        active: selection === coordinates.id,
        rightAccessoryRender: () => <span onClick={e => {e.preventDefault(); removeCoordinates(coordinates);}}><Trash /></span>,
      };
    } else {
      item = {
        key: 'pick',
        title: 'Click to Start Picking',
      };
    }
  }

  return (
    <LocationPicker
      sectionTitle="Starting Location"
      items={[item]}
      onItemClick={
        () => {
          if (isPicking) {
            endPickSession();
          } else {
            if (!!coordinates) {
              selectItem(coordinates.id);
            } else {
              beginPickSession(AppControlSelectionSection.StartingLocation);
            }
          }
        }
      }
      titleAccessoryRender={() =>
        <LocationGrabber />
      }
    />
  );
};

const mapStateToProps = (state: State) => ({
  selection: getCurrentSelection(state),
  isPicking: isPickingSection(state, AppControlSelectionSection.StartingLocation),
  coordinates: getStartingCoordinates(state),
});

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators({
  beginPickSession: actions.beginPickSession,
  endPickSession: actions.endPickSession,
  selectItem: actions.selectItem,
  removeCoordinates: actions.removeCoordinates,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(StartingLocationPicker);
