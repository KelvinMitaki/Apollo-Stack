import { FormStateMap } from "redux-form";
import { StylingState } from "../redux/reducers/stylingReducer";

export interface Redux {
  form: FormStateMap;
  styling: StylingState;
}
