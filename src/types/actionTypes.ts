
import { LeafletsResponse, LeafletsRequest, LeafletItem } from "./dataTypes";
export enum ActionType {
    FETCH_LEAFLETS_PENDING = "fetch_leaflets_pending",
    FETCH_LEAFLETS_SUCCESS = "fetch_leaflets_success",
    FETCH_LEAFLETS_ERROR = "fetch_leaflets_error",
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
    loading: boolean,
    refresh: boolean,
}

interface FetchLeafletsErrorAction {
    type: ActionType.FETCH_LEAFLETS_ERROR,
    error: string,
    loading: boolean
}

interface FilterLeafletsByNameAction {
    type: ActionType.FILTER_LEAFLETS_BY_NAME,
    name: string,
    payload: Array<LeafletItem>
}
interface FilterLeafletsByOffsetAndLimit {
    type: ActionType.FILTER_LEAFLETS_BY_OFFSET_AND_LIMIT,
    offset: number,
    limit: number,
    payload: Array<LeafletItem>
}

interface FilterLeafletsByExpired {
    type: ActionType.FILTER_LEAFLETS_BY_EXPIRED,
    excludeExpired: boolean,
    payload: Array<LeafletItem>
}

interface FilterLeafletsByRetailerID {
    type: ActionType.FILTER_LEAFLETS_BY_RETAILER_ID,
    excludeExpired: boolean,
    payload: Array<LeafletItem>
}

interface FilterLeafletsByDistance {
    type: ActionType.FILTER_LEAFLETS_BY_DISTANCE,
    maxDistance: number,
    payload: Array<LeafletItem>
}

interface SortLeaflets {
    type: ActionType.SORT_LEAFLETS,
    sort: string,
    payload: Array<LeafletItem>
}


export type ApiDispatchTypes = FetchLeafletsPendingAction | FetchLeafletsSuccessAction | FetchLeafletsErrorAction | FilterLeafletsByNameAction | FilterLeafletsByExpired | FilterLeafletsByRetailerID | FilterLeafletsByDistance | FilterLeafletsByOffsetAndLimit | SortLeaflets;