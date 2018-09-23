import { UI_START_LOADING, UI_STOP_LOADING } from './actionsTypes'

export const uiStartLoading = () => {
    return {
        type: UI_START_LOADING
    }
}

export const uiSStopLoading = () => {
    return {
        type: UI_STOP_LOADING
    }
}