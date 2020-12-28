import { ActionTypes } from "../types/types";
export interface SetToggleNavbar {
  type: ActionTypes.toggleNavbar;
  payload: boolean;
}

export const setToggleNavbar = (toggle: boolean): SetToggleNavbar => {
  return {
    type: ActionTypes.toggleNavbar,
    payload: toggle
  };
};
