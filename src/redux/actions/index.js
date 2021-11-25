export const SAVE_LOGIN = 'SAVE_LOGIN';
export const RESET_TIMER = 'RESET_TIMER';
export const TIMER_ENDED = 'TIMER_ENDED';
export const TIMER_RESETED = 'TIMER_RESETED';
export const SAVE_TIME = 'SAVE_TIME';
export const UPDATE_SCORE = 'UPDATE_SCORE';

export const saveLogin = (payload) => ({
  type: SAVE_LOGIN,
  payload,
});

export const resetTimer = () => ({
  type: RESET_TIMER,
});

export const timerEnded = () => ({
  type: TIMER_ENDED,
});

export const timerReseted = () => ({
  type: TIMER_RESETED,
});

export const saveTime = (time) => ({
  type: SAVE_TIME,
  payload: time,
});

export const updateScore = (payload) => ({
  type: UPDATE_SCORE,
  payload,
});
