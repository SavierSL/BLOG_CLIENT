import * as types from "./types";

interface alertActionType {
  type: string;
}
export const removeAlertAction = (): alertActionType => {
  return { type: types.ALERT_SAGA };
};
