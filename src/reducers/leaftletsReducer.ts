import { LeafletsDispatchTypes, ActionType } from "../types/actionTypes"
const initialState = {
    loading: false,
    leaflets: [],
    error: null
};
//https://dev.to/markusclaus/fetching-data-from-an-api-using-reactredux-55ao

const reducer = (state: any = initialState, action: LeafletsDispatchTypes): any => {
    switch (action.type) {
        case ActionType.FETCH_LEAFLETS_PENDING:
            return {
                ...state,
                loading: true
            };
        case ActionType.FETCH_LEAFLETS_SUCCESS:
            return {
                ...state,
                loading: false,
                leaflets: action.payload
            };
        case ActionType.FETCH_LEAFLETS_ERROR:
            return {
                ...state,
                loading: false,
                error: action.error
            };
        default:
            return state
    }
}

export default reducer
