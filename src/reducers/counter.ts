import { ADD, MINUS } from "../constants/counter";

const INITIAL_STATE = {
  accessToken: "",
  num: 0,
};

export default function reducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case ADD:
      return {
        ...state,
        num: state.num + 1,
      };
    case MINUS:
      return {
        ...state,
        num: state.num - 1,
      };
    default:
      return state;
  }
}
