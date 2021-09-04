import { ApiDispatchTypes, ActionType, InitialState } from "../types/actionTypes"
const initialState: InitialState = {
    loading: false,
    leaflets: [],
    filteredLeaflets: [],
    filters: {
        offset: 0,
        limit: 30,
        name: "",
        retailerId: "",
        excludeExpired: 0,
        maxDistance: 0,
        sort: "priority,expTimestamp,distance,retailerName,leafletName"
    }
};

const leafletsReducer = (state: InitialState = initialState, action: ApiDispatchTypes): InitialState => {
    switch (action.type) {
        case ActionType.FETCH_LEAFLETS_PENDING:
            return {
                ...state,
                loading: true
            };
        case ActionType.FETCH_LEAFLETS_SUCCESS:
            const retailers = "";
            console.log(retailers);

            if (action.refresh) {
                console.log("refreshing from API");
                return {
                    ...state,
                    loading: false,
                    response: action.payload,
                    filteredLeaflets: action.payload.data.leaflets,
                };
            } else {
                return {
                    ...state,
                    loading: false,
                    response: action.payload,
                    leaflets: action.payload.data.leaflets,
                    filteredLeaflets: action.payload.data.leaflets,
                };
            }

        case ActionType.FETCH_LEAFLETS_ERROR:
            return {
                ...state,
                loading: false,
                error: action.error
            };

        case ActionType.FILTER_LEAFLETS_BY_NAME:
            return {
                ...state,
                filteredLeaflets: action.payload,
                filters: {
                    ...state.filters,
                    name: action.name,
                }
            }
        case ActionType.FILTER_LEAFLETS_BY_EXPIRED:
            return {
                ...state,
                filteredLeaflets: action.payload,
                filters: {
                    ...state.filters,
                    excludeExpired: action.excludeExpired ? 1 : 0,
                }
            }
        case ActionType.FILTER_LEAFLETS_BY_DISTANCE:
            return {
                ...state,
                filteredLeaflets: action.payload,
                filters: {
                    ...state.filters,
                    maxDistance: action.maxDistance,
                }
            }
        case ActionType.FILTER_LEAFLETS_BY_OFFSET_AND_LIMIT:
            return {
                ...state,
                filteredLeaflets: action.payload,
                filters: {
                    ...state.filters,
                    offset: action.offset,
                }
            }
        case ActionType.SORT_LEAFLETS:
            return {
                ...state,
                filteredLeaflets: action.payload,
                filters: {
                    ...state.filters,
                    sort: action.sort,
                }
            }
        default:
            return state
    }
}

export default leafletsReducer
