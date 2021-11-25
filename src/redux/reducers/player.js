import { RESET_SCORE, SAVE_LOGIN, UPDATE_SCORE } from '../actions';

const INITIAL_STATE = {
  name: '',
  email: '',
  score: 0,
};

const player = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SAVE_LOGIN:
    return { ...state, ...action.payload };
  case UPDATE_SCORE:
    return { ...state, score: state.score + action.payload };
  case RESET_SCORE:
    return { ...state, score: 0 };
  default:
    return state;
  }
};

export default player;
