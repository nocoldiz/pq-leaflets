import { ApiDispatchTypes, ActionType, InitialState } from "../types/actionTypes"
const initialState: InitialState = {
    loading: false,
    leaflets: [],
    filteredLeaflets: [],
    nameFilter: "",
    filters: {
        offset: 0,
        limit: 30,
        name: "",
        retailerId: "",
        excludeExpired: false,
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
            return {
                ...state,
                loading: false,
                response: action.payload,
                leaflets: action.payload.data.leaflets,
                filteredLeaflets: action.payload.data.leaflets,


            };
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
                nameFilter: action.nameFilter,
            };

        default:
            return state
    }
}

export default leafletsReducer
