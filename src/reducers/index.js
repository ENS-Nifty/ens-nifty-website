import { combineReducers } from "redux";
import account from "./_account";
import notification from "./_notification";
import tokenize from "./_tokenize";
import warning from "./_warning";

export default combineReducers({
  account,
  notification,
  tokenize,
  warning
});
