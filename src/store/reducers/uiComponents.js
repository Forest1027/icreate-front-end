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

const openSnackBar = (state, action) => {
    const snackbarConfig = state.snackbar;
    snackbarConfig.open = true;
    return updateObject(state, {
        snackbar: snackbarConfig
    });
}

const closeSnackBar = (state, action) => {
    const snackbarCfg = state.snackbar;
    snackbarCfg.open = false;
    return updateObject(state, {
        snackbar: snackbarCfg
    });
}

const openDialogReducer = (state, action) => {
    const dialogConfig = state.dialog;
    dialogConfig.open = true;
    dialogConfig.articleId = action.articleId
    return updateObject(state, {
        dialog: dialogConfig
    });
}

const closeDialogReducer = (state, action) => {
    const dialogCfg = state.dialog;
    dialogCfg.open = false;
    return updateObject(state, {
        dialog: dialogCfg
    });
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
            return openSnackBar(state, action);
        case actionTypes.CLOSE_SNACKBAR:
            return closeSnackBar(state, action);
        case actionTypes.OPEN_DIALOG:
            return openDialogReducer(state, action);
        case actionTypes.CLOSE_DIALOG:
            return closeDialogReducer(state, action);
        default:
            return state;
    }
}

export default reducer;
