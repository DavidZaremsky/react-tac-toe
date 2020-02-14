import * as types from './types';

export const setXIsNext = value => dispatch => {
  dispatch({
    type: types.SET_X_IS_NEXT,
    value
  });
}

export const setStepNumber = value => dispatch => {
  dispatch({
    type: types.SET_STEP_NUMBER,
    value
  });
}

export const setSquares = value => dispatch => {
  dispatch({
    types: types.SET_SQUARES,
    value
  });
}
