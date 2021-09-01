import { combineReducers } from "redux";
import leafletsReducer from "./leaftletsReducer"


const reducers = combineReducers({
    leafletsReducer: leafletsReducer
})

export default reducers

export type RootState = ReturnType<typeof reducers>