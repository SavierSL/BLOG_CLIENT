import * as types from "../actions/types";

interface logInActionType {
  type: string;
  payload: object;
}

export const logInAction = (
  email: string,
  password: string
): logInActionType => {
  return {
    type: types.LOG_IN_SAGA,
    payload: { email, password },
  };
};
