import { AnyAction } from "redux";
import { SetToggleNavbar } from "../actions";
import { ActionTypes } from "../types/types";

export interface StylingState {
  toggleNavbar: boolean;
}

const INITIAL_STATE: StylingState = {
  toggleNavbar: false
};

type Action = SetToggleNavbar;

export const stylingReducer = (
  state = INITIAL_STATE,
  action: Action
): StylingState => {
  switch (action.type) {
    case ActionTypes.toggleNavbar:
      return { ...state, toggleNavbar: action.payload };
    default:
      return state;
  }
};
