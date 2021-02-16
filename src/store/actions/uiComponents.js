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