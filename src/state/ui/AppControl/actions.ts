import { createAction, ActionUnion } from 'src/state/actions';
import { AppControlUIActionTypes } from './actionTypes';
import { AppControlSession } from './types';

export const beginSession = (session: AppControlSession) => createAction(
    AppControlUIActionTypes.PickSessionBegin,
    session,
  );
export const endSession = () => createAction(AppControlUIActionTypes.PickSessionEnd);

const Actions = {
  beginSession,
  endSession,
};

export type Actions = ActionUnion<typeof Actions>;
