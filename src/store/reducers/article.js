import * as actionTypes from '../actions/actionTypes';

const initialState = {
    articleForm: {
        title: '',
        description: '',
        content: ''
    }
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
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
                ...state,
                redirectPath: action.redirectPath
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