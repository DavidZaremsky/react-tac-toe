import * as types from "./types";

export const setXIsNext = (value) => (dispatch) => {
  dispatch({
    type: types.SET_X_IS_NEXT,
    value,
  });
};

export const setStepNumber = (value) => (dispatch) => {
  dispatch({
    type: types.SET_STEP_NUMBER,
    value,
  });
};

export const setHistory = (history) => (dispatch) => {
  dispatch({
    type: types.SET_HISTORY,
    history,
  });
};

export const setStatus = (history) => (dispatch) => {
  dispatch({
    type: types.SET_HISTORY,
    history,
  });
};
