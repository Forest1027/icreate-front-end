import * as actionTypes from '../actions/actionTypes';
import {updateObject} from "../../shared/utility";

const initialState = {
    snackbar: {
        open: false,
    },
    dialog: {
        open: false,
        articleId: null
    },
    editor: null,
    readOnly: false
}

const enableEdit = (state, action) => {
    if (state.editor !== null) {
        state.editor.isReadOnly = false
    }
    return updateObject(state, {
        readOnly: false
    })
}

const disableEdit = (state, action) => {
    console.log('disable edit')
    state.editor.isReadOnly = true
    console.log(state.editor.isReadOnly)
    return updateObject(state, {
        readOnly: true
    })
}

const initEditor = (state, action) => {
    console.log('init editor')
    return updateObject(state, {
        editor: action.editor
    })
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ENABLE_EDIT:
            return enableEdit(state, action);
        case actionTypes.DISABLE_EDIT:
            return disableEdit(state, action);
        case actionTypes.INIT_EDITOR:
            return initEditor(state, action);
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
