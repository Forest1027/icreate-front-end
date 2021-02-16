import * as actionTypes from '../actions/actionTypes';

const initialState = {
    snackbar: {
        open: false,
    }
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.OPEN_SNACKBAR:
            const snackbarConfig = state.snackbar;
            snackbarConfig.open = true;
            return {
                ...state,
                snackbar: snackbarConfig
            }
        case actionTypes.CLOSE_SNACKBAR:
            const snackbarCfg = state.snackbar;
            snackbarCfg.open = false;
            return {
                ...state,
                snackbar: snackbarCfg
            }
        default:
            return state;
    }
}

export default reducer;
