import { LeafletsDispatchTypes, ActionType, InitialState } from "../types/actionTypes"
const initialState: InitialState = {
    loading: false,
    response: undefined,
    error: "error"
};

const apiReducer = (state: InitialState = initialState, action: LeafletsDispatchTypes): InitialState => {
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

export default apiReducer
