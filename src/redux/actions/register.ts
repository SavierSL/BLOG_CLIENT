import * as types from "../actions/types";

export const registerAction = (
  name: string,
  email: string,
  password: string
) => {
  return {
    type: types.REGISTER_SAGA,
    payload: { name, email, password },
  };
};
