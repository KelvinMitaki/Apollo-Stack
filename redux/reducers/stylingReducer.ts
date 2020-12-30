import {
  SetToggleLogin,
  SetToggleNavbar
} from "../../components/Layout/Layout";
import { ToggleAgentRegister } from "../../components/RegisterLogin/Register";
import { ToggleLoginHeader } from "../../components/RegisterLogin/RegisterLoginModal";
import { ActionTypes } from "../types/types";

export interface StylingState {
  toggleNavbar: boolean;
  toggleLogin: boolean;
  toggleLoginHeader: "register" | "login" | "agent";
  toggleAgentRegister: boolean;
}

const INITIAL_STATE: StylingState = {
  toggleNavbar: false,
  toggleLogin: false,
  toggleLoginHeader: "login",
  toggleAgentRegister: false
};

type Action =
  | SetToggleNavbar
  | SetToggleLogin
  | ToggleLoginHeader
  | ToggleAgentRegister;

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
    case ActionTypes.toggleAgentRegister:
      return { ...state, toggleAgentRegister: action.payload };
    default:
      return state;
  }
};
