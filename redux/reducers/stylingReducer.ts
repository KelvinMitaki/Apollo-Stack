import {
  SetToggleLogin,
  SetToggleNavbar
} from "../../components/Layout/Layout";
import { ActionTypes } from "../types/types";

export interface StylingState {
  toggleNavbar: boolean;
  toggleLogin: boolean;
}

const INITIAL_STATE: StylingState = {
  toggleNavbar: false,
  toggleLogin: false
};

type Action = SetToggleNavbar | SetToggleLogin;

export const stylingReducer = (
  state = INITIAL_STATE,
  action: Action
): StylingState => {
  switch (action.type) {
    case ActionTypes.toggleNavbar:
      return { ...state, toggleNavbar: action.payload };
    case ActionTypes.toggleLogin:
      return { ...state, toggleLogin: action.payload };
    default:
      return state;
  }
};
