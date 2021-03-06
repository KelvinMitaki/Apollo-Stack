import {
  SetToggleLogin,
  SetToggleNavbar
} from "../../components/Layout/Layout";
import { ExpiredListingsModal } from "../../components/modals/ExpiredListingsModal";
import { RequestModalI } from "../../components/modals/RequestModal";
import { ToggleLoginHeader } from "../../components/RegisterLogin/RegisterLoginModal";
import { FetchType } from "../../pages/properties/[property]";
import { ActionTypes } from "../types/types";

export interface StylingState {
  toggleNavbar: boolean;
  toggleLogin: boolean;
  toggleLoginHeader: "register" | "login" | "agent";
  fetchType: "header" | "sidebar";
  expiredListingsModal: "expiry" | "mark" | "withdraw" | null;
  requestModal: boolean;
}

const INITIAL_STATE: StylingState = {
  toggleNavbar: false,
  toggleLogin: false,
  toggleLoginHeader: "login",
  fetchType: "header",
  expiredListingsModal: null,
  requestModal: false
};

type Action =
  | SetToggleNavbar
  | SetToggleLogin
  | ToggleLoginHeader
  | FetchType
  | ExpiredListingsModal
  | RequestModalI;

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
    case ActionTypes.fetchType:
      return { ...state, fetchType: action.payload };
    case ActionTypes.expiredListingsModal:
      return { ...state, expiredListingsModal: action.payload };
    case ActionTypes.requestModal:
      return { ...state, requestModal: action.payload };
    default:
      return state;
  }
};
