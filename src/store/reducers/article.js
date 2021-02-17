import * as actionTypes from '../actions/actionTypes';

const initialState = {
    articleForm: {
        articleId:'',
        title: '',
        description: '',
        content: ''
    },
    articles: [],
    readOnly: false,
    editor: null,
    loading: false
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.CLEAR_ARTICLE:
            console.log('clear')
            return {
                ...state,
                articleForm: {
                    articleId:'',
                    title: '',
                    description: '',
                    content: ''
                }
            }
        case actionTypes.ENABLE_EDIT:
            console.log('edit')
            if(state.editor !== null) {
                state.editor.isReadOnly = false
            }
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
            return {
                ...state,
                loading: true
            };
        case actionTypes.CREATE_ARTICLE_SUCCESS:
            const form = state.articleForm;
            form.articleId = action.articleId;
            return {
                ...state,
                articleForm: form,
                loading: false
            };
        case actionTypes.CREATE_ARTICLE_FAIL:
            return {
                ...state,
                loading: false
            };
        case actionTypes.FETCH_ARTICLES_START:
            return {
                ...state,
                loading: true
            };
        case actionTypes.FETCH_ARTICLES_SUCCESS:
            console.log(actionTypes.FETCH_ARTICLES_SUCCESS);
            console.log(action.articles)
            return {
                ...state,
                articles: action.articles,
                loading: false
            }
        case actionTypes.FETCH_ARTICLES_FAIL:
            return {...state};
        case actionTypes.FETCH_ARTICLE_SUCCESS:
            console.log(actionTypes.FETCH_ARTICLE_SUCCESS)
            console.log(action.articleId)
            console.log(action.article)
            if(action.article !== null) {
                action.article['articleId'] = action.articleId;
            }
            return {
                ...state,
                articleForm: action.article,
                loading: false
            }
        case actionTypes.UPDATE_ARTICLE_SUCCESS:
            return {
                ...state,
                articleForm: action.article
            }
        case actionTypes.DELETE_ARTICLE_START:
            return {
                ...state,
                loading: true
            }
        case actionTypes.DELETE_ARTICLE_SUCCESS:
            return {
                ...state,
                loading: false
            }
        default:
            return state;
    }
};

export default reducer;