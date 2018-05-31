export type AppControlSelection = string | AppControlSelectionSection;

export enum AppControlSelectionSection {
  StartingLocation = 'startingLocation',
  DropoffPoints = 'dropoffPoints',
}

export interface MapCoordinates {
  latitude: number;
  longitude: number;
}
