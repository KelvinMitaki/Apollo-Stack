import { createWrapper, HYDRATE } from "next-redux-wrapper";
import { Reducer } from "react";
import { reducer as formReducer } from "redux-form";
import {
  AnyAction,
  applyMiddleware,
  CombinedState,
  combineReducers,
  createStore,
  Store,
  StoreEnhancer
} from "redux";
import { Redux } from "../../interfaces/Redux";
import { stylingReducer } from "./stylingReducer";
import thunk, { ThunkMiddleware } from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

const bindMiddleware = (middleware: ThunkMiddleware[]): StoreEnhancer => {
  if (process.env.NODE_ENV !== "production") {
    return composeWithDevTools(applyMiddleware(...middleware));
  }
  return applyMiddleware(...middleware);
};

const combinedReducer = combineReducers<
  Reducer<CombinedState<Redux>, AnyAction>
>({
  form: formReducer,
  styling: stylingReducer
});

const reducer = (state: any, action: AnyAction) => {
  if (action.type === HYDRATE) {
    const nextState = {
      ...state,
      ...action.payload
    };
    if (state.form) nextState.form = state.form;
    return nextState;
  } else {
    return combinedReducer(state, action);
  }
};

const initStore = (): Store => createStore(reducer, bindMiddleware([thunk]));

export const wrapper = createWrapper(initStore);
