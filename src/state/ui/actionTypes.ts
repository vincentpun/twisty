import { AppControlUIActionTypes } from './AppControl/actionTypes';

export enum AppUIActionTypes {
  SwitchMode = 'APP_UI_SWITCH_MODE',
}

export type UIActionTypes = AppUIActionTypes | AppControlUIActionTypes;
