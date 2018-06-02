import { AppControlSelectionSection } from 'src/state/ui/AppControl/types';
import { MapMarkerColor } from '../MapMarker';

export const getMarkerColor = (currentSelection: string | AppControlSelectionSection) => {
  if (currentSelection === AppControlSelectionSection.StartingLocation) {
    return MapMarkerColor.Red;
  } else if (currentSelection === AppControlSelectionSection.DropoffPoints) {
    return MapMarkerColor.Blue;
  } else {
    return null;
  }
};
