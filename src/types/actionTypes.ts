
import { Response } from "./dataTypes";
export enum ActionType {
    FETCH_LEAFLETS_PENDING = "fetch_leaflets_pending",
    FETCH_LEAFLETS_SUCCESS = "fetch_leaflets_success",
    FETCH_LEAFLETS_ERROR = "fetch_leaflets_error",
}

export interface StateType {
    loading: boolean,
    response: Response,
    error: string
}
interface FetchLeafletsPendingAction {
    type: ActionType.FETCH_LEAFLETS_PENDING,
    loading: boolean
}

interface FetchLeafletsSuccessAction {
    type: ActionType.FETCH_LEAFLETS_SUCCESS,
    payload: Response,
    loading: boolean
}

interface FetchLeafletsErrorAction {
    type: ActionType.FETCH_LEAFLETS_ERROR,
    error: string,
    loading: boolean
}

export type LeafletsDispatchTypes = FetchLeafletsPendingAction | FetchLeafletsSuccessAction | FetchLeafletsErrorAction;