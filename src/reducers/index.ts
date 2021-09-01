import { combineReducers } from "redux";
import leafletsReducer from "./leaftletsReducer";


const Reducers = combineReducers({
    leaflets: leafletsReducer
});

export default Reducers;

export type RootState = ReturnType<typeof Reducers>;