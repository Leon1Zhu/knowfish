import { SETSEARCHRESULT } from "../constants/counter";

const INITIAL_STATE = {
  cameraSearchResult: []
};

export default function reducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case SETSEARCHRESULT:
      return {
        ...state
      };
    default:
      return state;
  }
}
