import { SETUSERLOGININFO } from "src/constants/userReducer";

const INITIAL_STATE = {
  loginInfo: {
    openId: "",
    uninId: ""
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
