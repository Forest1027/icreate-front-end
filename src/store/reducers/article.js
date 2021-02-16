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
    editor: null
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
            return {...state};
        case actionTypes.CREATE_ARTICLE_SUCCESS:
            const form = state.articleForm;
            form.articleId = action.articleId;
            return {
                ...state,
                articleForm: form
            };
        case actionTypes.CREATE_ARTICLE_FAIL:
            return {...state};
        case actionTypes.FETCH_ARTICLES_START:
            return {...state};
        case actionTypes.FETCH_ARTICLES_SUCCESS:
            console.log('fetch');
            console.log(action.articles)
            return {
                ...state,
                articles: action.articles
            }
        case actionTypes.FETCH_ARTICLES_FAIL:
            return {...state};
        case actionTypes.FETCH_ARTICLE_SUCCESS:
            action.article['articleId'] = action.articleId;
            return {
                ...state,
                articleForm: action.article
            }
        case actionTypes.UPDATE_ARTICLE_SUCCESS:
            return {
                ...state,
                articleForm: action.article
            }
        default:
            return state;
    }
};

export default reducer;