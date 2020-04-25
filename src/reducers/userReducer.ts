import { SETUSERLOGININFO } from "src/constants/userReducer";

const INITIAL_STATE = {
  loginInfo: {
    openId: 111,
    uninId: 111
  }
};

export default function reducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case SETUSERLOGININFO:
      return {
        ...state,
        loginInfo: action.data
      };
    default:
      return state;
  }
}
