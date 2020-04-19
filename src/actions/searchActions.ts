import { SETSEARCHRESULT } from "../constants/counter";

export const setSearchResult = data => {
  return {
    type: SETSEARCHRESULT,
    data
  };
};
