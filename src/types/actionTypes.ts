
import { LeafletsResponse, LeafletsRequest, LeafletItem } from "./dataTypes";
export enum ActionType {
    FETCH_LEAFLETS_PENDING = "fetch_leaflets_pending",
    FETCH_LEAFLETS_SUCCESS = "fetch_leaflets_success",
    FETCH_LEAFLETS_ERROR = "fetch_leaflets_error",
}

export interface InitialState {
    loading: boolean,
    leaflets: Array<LeafletItem>,
    response?: LeafletsResponse,
    error?: string,
    filters: LeafletsRequest
}
interface FetchLeafletsPendingAction {
    type: ActionType.FETCH_LEAFLETS_PENDING,
    loading: boolean
}

interface FetchLeafletsSuccessAction {
    type: ActionType.FETCH_LEAFLETS_SUCCESS,
    payload: LeafletsResponse,
    loading: boolean
}

interface FetchLeafletsErrorAction {
    type: ActionType.FETCH_LEAFLETS_ERROR,
    error: string,
    loading: boolean
}

export type ApiDispatchTypes = FetchLeafletsPendingAction | FetchLeafletsSuccessAction | FetchLeafletsErrorAction;