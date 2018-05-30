import { ActionTypes } from './actionTypes';

export interface Action<T extends ActionTypes> {
  type: T;
}

export interface ActionWithPayload<T extends ActionTypes, P> {
  type: T;
  payload: P;
}

export function createAction<T extends ActionTypes>(type: T): Action<T>
export function createAction<T extends ActionTypes, P>(type: T, payload: P): ActionWithPayload<T, P>
export function createAction<T extends ActionTypes, P>(type: T, payload?: P) {
  return (payload === undefined) ? { type } : { type, payload };
}

type Function = (...args: any[]) => any;
type ActionCreatorsMap = { [key: string]: Function };

export type ActionUnion<A extends ActionCreatorsMap> = ReturnType<A[keyof A]>;
