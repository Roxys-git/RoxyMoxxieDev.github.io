import {
  START_TIMER,
  STOP_TIMER,
  RESET_TIMER,
  INCREMENT_SESSION,
  DECREMENT_SESSION,
  INCREMENT_BREAK,
  DECREMENT_BREAK,
  SET_TIME_LEFT
} from './actions';

const initialState = {
  breakLength: 5, // minutes
  sessionLength: 25, // minutes
  timeLeft: 25 * 60, // in seconds
  isRunning: false,
  isSession: true,
  timerInterval: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case START_TIMER:
      return { ...state, isRunning: true };
    case STOP_TIMER:
      clearInterval(state.timerInterval);
      return { ...state, isRunning: false, timerInterval: null };
    case RESET_TIMER:
      clearInterval(state.timerInterval);
      return {
        ...initialState,
        timeLeft: initialState.sessionLength * 60,
        isRunning: false,
        timerInterval: null,
      };
    case INCREMENT_SESSION:
      return {
        ...state,
        sessionLength: state.sessionLength + 1,
        timeLeft: state.isSession ? (state.sessionLength + 1) * 60 : state.timeLeft,
      };
    case DECREMENT_SESSION:
      return {
        ...state,
        sessionLength: Math.max(state.sessionLength - 1, 1),
        timeLeft: state.isSession ? (state.sessionLength - 1) * 60 : state.timeLeft,
      };
    case INCREMENT_BREAK:
      return {
        ...state,
        breakLength: state.breakLength + 1,
        timeLeft: !state.isSession ? (state.breakLength + 1) * 60 : state.timeLeft,
      };
    case DECREMENT_BREAK:
      return {
        ...state,
        breakLength: Math.max(state.breakLength - 1, 1),
        timeLeft: !state.isSession ? (state.breakLength - 1) * 60 : state.timeLeft,
      };
    case SET_TIME_LEFT:
      return { ...state, timeLeft: action.payload };
    default:
      return state;
  }
};

export default reducer;
