import { createContext, RefObject } from "react";

export const StylingContext = createContext<{
  toggle: boolean;
  setToggle: ((toggle: boolean) => void) | null;
  toggleRef: RefObject<HTMLDivElement> | null;
}>({
  toggle: false,
  setToggle: null,
  toggleRef: null
});
