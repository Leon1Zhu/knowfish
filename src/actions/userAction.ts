import { SETUSERLOGININFO } from "src/constants/userReducer";

export const setUserLoginInfo = data => {
  return {
    type: SETUSERLOGININFO,
    data
  };
};
