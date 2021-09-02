import { ApiDispatchTypes, ActionType, InitialState } from "../types/actionTypes"
const initialState: InitialState = {
    loading: false,
    leaflets: []
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

export default leafletsReducer
