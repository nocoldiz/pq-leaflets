
import { LeafletsResponse, LeafletsRequest, LeafletItem, Retailer } from "./dataTypes";
export enum ActionType {
    FETCH_LEAFLETS_PENDING = "fetch_leaflets_pending",
    FETCH_LEAFLETS_SUCCESS = "fetch_leaflets_success",
    FETCH_LEAFLETS_ERROR = "fetch_leaflets_error",
    FILTER_LEAFLETS = "filter_Leaflets",
    FILTER_LEAFLETS_BY_NAME = "filter_leaflets_by_name",
    FILTER_LEAFLETS_BY_EXPIRED = "filter_leaflets_by_expired",
    FILTER_LEAFLETS_BY_RETAILER_ID = "filter_leaflets_by_retailer_id",
    FILTER_LEAFLETS_BY_OFFSET_AND_LIMIT = "filter_leaflets_by_offset_and_limit",
    FILTER_LEAFLETS_BY_DISTANCE = "filter_leaflets_by_distance",
    SORT_LEAFLETS = "sort_leaflets"

}

export interface InitialState {
    loading: boolean,
    leaflets: Array<LeafletItem>,
    filteredLeaflets: Array<LeafletItem>,
    retailers: Array<Retailer>,
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
    retailers: Array<Retailer>,
    loading: boolean,
    refresh: boolean,
}

interface FetchLeafletsErrorAction {
    type: ActionType.FETCH_LEAFLETS_ERROR,
    error: string,
    loading: boolean
}
interface FilterLeafletsAction {
    type: ActionType.FILTER_LEAFLETS,
    filters: LeafletsRequest,
    payload: Array<LeafletItem>
}

interface SortLeaflets {
    type: ActionType.SORT_LEAFLETS,
    filters: LeafletsRequest,
    payload: Array<LeafletItem>
}


export type ApiDispatchTypes = FetchLeafletsPendingAction | FetchLeafletsSuccessAction | FetchLeafletsErrorAction | FilterLeafletsAction | SortLeaflets;