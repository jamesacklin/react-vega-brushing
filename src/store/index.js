import React from "react";
import Immer from "immer";
import useGlobalHook from "use-global-hook";
import * as actions from "../actions";
import { initialState } from "./initialState";

const options = {
  Immer,
};

const useGlobal = useGlobalHook(React, initialState, actions, options);

export default useGlobal;
