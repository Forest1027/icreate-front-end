import * as actionTypes from '../actions/actionTypes';

const initialState = {
    snackbar: {
        open: false,
    },
    dialog: {
        open: false,
        articleId: null
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
            };
        case actionTypes.CLOSE_SNACKBAR:
            const snackbarCfg = state.snackbar;
            snackbarCfg.open = false;
            return {
                ...state,
                snackbar: snackbarCfg
            };
        case actionTypes.OPEN_DIALOG:
            const dialogConfig = state.dialog;
            dialogConfig.open = true;
            dialogConfig.articleId = action.articleId
            return {
                ...state,
                dialog: dialogConfig
            };
        case actionTypes.CLOSE_DIALOG:
            const dialogCfg = state.dialog;
            dialogCfg.open = false;
            return {
                ...state,
                dialog: dialogCfg
            };
        default:
            return state;
    }
}

export default reducer;
