import { combineReducers } from "redux";
import apiReducer from "./apiReducer";

const RootReducer = combineReducers({
    api: apiReducer
});

export default RootReducer;

export type RootState = ReturnType<typeof RootReducer>;