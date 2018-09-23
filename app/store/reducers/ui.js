import { UI_START_LOADING, UI_STOP_LOADING} from '../actions/actionsTypes'

const initialState = {
    isLoading: false
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case UI_START_LOADING:
            return {
                ...state,
                isLoading: true
            }
            break;
        case UI_STOP_LOADING:
            return {
                ...state,
                isLoading: false
            }
            break;
        default:
            return state
    }
}

export default reducer