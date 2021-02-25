import * as actionTypes from './actionTypes';

export const enableEdit = () => {
    return {
        type: actionTypes.ENABLE_EDIT
    }
}

export const disableEdit = () => {
    return {
        type: actionTypes.DISABLE_EDIT
    }
}

export const initEditor = (editor) => {
    return {
        type: actionTypes.INIT_EDITOR,
        editor: editor
    };
};

export const openSnackbar = () => {
    return {
        type: actionTypes.OPEN_SNACKBAR
    }
}

export const closeSnackbar = () => {
    return {
        type: actionTypes.CLOSE_SNACKBAR
    }
}

export const openDialog = (articleId) => {
    return {
        type: actionTypes.OPEN_DIALOG,
        articleId: articleId
    }
}

export const closeDialog = () => {
    return {
        type: actionTypes.CLOSE_DIALOG
    }
}