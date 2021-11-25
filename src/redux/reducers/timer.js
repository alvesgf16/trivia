import { RESET_TIMER, SAVE_TIME, TIMER_ENDED, TIMER_RESETED } from '../actions';

const INITIAL_STATE = {
  timerEnded: false,
  timerReset: false,
  time: 30,
};

const timer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case RESET_TIMER:
    return { ...state, timerEnded: false, timerReset: true };
  case TIMER_RESETED:
    return { ...state, timerReset: false };
  case TIMER_ENDED:
    return { ...state, timerEnded: true };
  case SAVE_TIME:
    return { ...state, time: action.payload };
  default:
    return state;
  }
};

export default timer;
