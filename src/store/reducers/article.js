import * as actionTypes from '../actions/actionTypes';

const initialState = {
    articleForm: {
        title: '',
        description: '',
        content: ''
    },
    readOnly: false,
    editor: null
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ENABLE_EDIT:
            state.editor.isReadOnly = false
            return {
                ...state,
                readOnly: false
            };
        case actionTypes.DISABLE_EDIT:
            state.editor.isReadOnly = true
            return {
                ...state,
                readOnly: true
            };
        case actionTypes.INIT_EDITOR:
            return {
                ...state,
                editor: action.editor
            }
        case actionTypes.CHANGE_ARTICLE_CONTENT:
            const articleForm = state.articleForm;
            articleForm[action.attrName] = action.attrValue;
            return {
                ...state,
                articleForm: articleForm
            }
        case actionTypes.CREATE_ARTICLE_START:
            return {...state};
        case actionTypes.CREATE_ARTICLE_SUCCESS:
            return {
                ...state
            };
        case actionTypes.CREATE_ARTICLE_FAIL:
            return {...state};
        case actionTypes.FETCH_ARTICLES_START:
            return {...state};
        case actionTypes.FETCH_ARTICLES_SUCCESS:
            return {...state};
        case actionTypes.FETCH_ARTICLES_FAIL:
            return {...state};
        default:
            return state;
    }
};

export default reducer;