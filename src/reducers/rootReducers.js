import { combineReducers } from "redux";
import { uiReducer } from "./uiReducer";
import { calendarReducer } from "./CalendarReducer";
import { authReducers } from "./authReducers";

export const rootReducer = combineReducers({
  ui: uiReducer,
  calendario: calendarReducer,
  auth: authReducers
});
