import { ApiDispatchTypes, ActionType, InitialState } from "../types/actionTypes"
const initialState: InitialState = {
    loading: false,
    leaflets: [],
    retailers: [],
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
                    retailers: action.retailers,
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
        case ActionType.FILTER_LEAFLETS:
            return {
                ...state,
                filteredLeaflets: action.payload,
                filters: action.filters
            }
        case ActionType.SORT_LEAFLETS:
            return {
                ...state,
                filteredLeaflets: action.payload,
                filters: action.filters

            }
        default:
            return state
    }
}

export default leafletsReducer
