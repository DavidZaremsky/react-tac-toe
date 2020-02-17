import * as types from './types';

const INITIAL_STATE = {
  history: [
    {
      squares: Array(9).fill(null)
    }
  ],
  stepNumber: 0,
  xIsNext: (Math.floor(Math.random() * 2) === 0)
}

export default (state = INITIAL_STATE, action = {}) => {
  switch (action.type) {
    case types.SET_X_IS_NEXT:
      return Object.assign({}, state, {
        xIsNext: action.value
      })
    case types.SET_STEP_NUMBER:
      return Object.assign({}, state, {
        stepNumber: action.value
      })
    case types.SET_HISTORY:
      console.log('setHistory');
      return Object.assign({}, state, {
        history: action.history
      });
    default:
      return state;
  }
}
