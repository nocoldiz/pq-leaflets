import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk"
import Reducers from "./reducers";

const Store = createStore(
    Reducers,
    {},
    applyMiddleware(thunk)
)

export type RootStore = ReturnType<typeof Reducers>

export default Store