import { LeafletsDispatchTypes, ActionType, } from "../types/actionTypes"
const initialState = {
    loading: false,
    response: {},
    error: "null"
};

const reducer = (state: Object = initialState, action: LeafletsDispatchTypes): Object => {
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
                response: action.payload
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
