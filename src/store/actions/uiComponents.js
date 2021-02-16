import * as actionTypes from './actionTypes';

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