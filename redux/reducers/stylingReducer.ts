import { AnyAction } from "redux";

export interface StylingState {}

const INITIAL_STATE: StylingState = {};

export const stylingReducer = (
  state = INITIAL_STATE,
  action: AnyAction
): StylingState => {
  return state;
};
