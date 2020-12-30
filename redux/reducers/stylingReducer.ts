import {
  SetToggleLogin,
  SetToggleNavbar
} from "../../components/Layout/Layout";
import { ToggleLoginHeader } from "../../components/RegisterLogin/RegisterLoginModal";
import { ActionTypes } from "../types/types";

export interface StylingState {
  toggleNavbar: boolean;
  toggleLogin: boolean;
  toggleLoginHeader: boolean;
}

const INITIAL_STATE: StylingState = {
  toggleNavbar: false,
  toggleLogin: false,
  toggleLoginHeader: false
};

type Action = SetToggleNavbar | SetToggleLogin | ToggleLoginHeader;

export const stylingReducer = (
  state = INITIAL_STATE,
  action: Action
): StylingState => {
  switch (action.type) {
    case ActionTypes.toggleNavbar:
      return { ...state, toggleNavbar: action.payload };
    case ActionTypes.toggleLogin:
      return { ...state, toggleLogin: action.payload };
    case ActionTypes.toggleLoginHeader:
      return { ...state, toggleLoginHeader: action.payload };
    default:
      return state;
  }
};
