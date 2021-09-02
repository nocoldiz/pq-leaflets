import { combineReducers } from "redux";
import leafletsReducer from "./leafletsReducer";

const RootReducer = combineReducers({
    leafletsReducer: leafletsReducer
});

export default RootReducer;

export type RootState = ReturnType<typeof RootReducer>;