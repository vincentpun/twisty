import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { bindActionCreators } from 'redux';

import LocationPicker from './LocationPicker';
import { State } from 'src/state/reducer';
import { AppControlSelection, AppControlSelectionSection, MapCoordinates } from 'src/state/ui/AppControl/types';
import { getCurrentSelection, isPickingSection, getStartingCoordinates, getDropoffCoordinates } from 'src/state/ui/AppControl/selectors';
import { actions } from 'src/state/ui/AppControl/actions';
import { Trash } from 'src/components/Icons';
import LocationGrabber from './LocationGrabber';
import { MapCoordinatesMap, coordinates } from 'src/state/ui/AppControl/reducer';
import { LocationPickerListItem } from './LocationPicker';
import { formatCoordinates } from 'src/utils/formatCoordinates';

interface DropoffLocationsPickerProps {
  selection: AppControlSelection;
  isPicking: boolean;
  coordinates: MapCoordinatesMap[];
  beginPickSession: (section: AppControlSelectionSection) => any;
  endPickSession: () => any;
  selectItem: (id: string) => any;
  deselect: () => any;
  removeCoordinates: (coordinates: MapCoordinatesMap) => any;
}

const DropoffLocationsPicker = ({
  isPicking,
  selection,
  coordinates,
  beginPickSession,
  endPickSession,
  selectItem,
  deselect,
  removeCoordinates,
}: DropoffLocationsPickerProps) => {
  let items = coordinates.map(c => ({
    key: c.id,
    title: formatCoordinates(c),
    active: selection === c.id,
    rightAccessoryRender: () => <span onClick={e => {e.preventDefault(); removeCoordinates(c);}}><Trash /></span>
  })) as LocationPickerListItem[];

  let finalItem: LocationPickerListItem;
  finalItem = {
    key: 'add',
    title: isPicking ? 'Click to Stop Adding' : 'Click to Start Adding',
    active: isPicking,
  };

  items = items.concat(finalItem);

  return (
    <LocationPicker
      sectionTitle="Dropoff Locations"
      items={items}
      onItemClick={
        (item) => {
          if (item.key === 'add') {
            if (isPicking) {
              endPickSession();
            } else {
              beginPickSession(AppControlSelectionSection.DropoffPoints);
            }
          } else {
            selectItem(item.key as string);
          }
        }
      }
    />
  );
};

const mapStateToProps = (state: State) => ({
  selection: getCurrentSelection(state),
  isPicking: isPickingSection(state, AppControlSelectionSection.DropoffPoints),
  coordinates: getDropoffCoordinates(state),
});

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators({
  beginPickSession: actions.beginPickSession,
  endPickSession: actions.endPickSession,
  selectItem: actions.selectItem,
  deselect: actions.deselect,
  removeCoordinates: actions.removeCoordinates,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(DropoffLocationsPicker);
