import * as actionTypes from '../actions/actionTypes';
import {isNotNull, updateObject} from "../../shared/utility";

const initialState = {
    articleForm: {
        articleId: '',
        title: '',
        description: '',
        content: ''
    },
    articles: [],
    displayArticles: [],
    pagination: {
        count: 0,
        page: 1,
        size: 12
    },
    searchStr: '',
    currentPage: 1,
    readOnly: false,
    editor: null,
    loading: false,
    formIsValid: false
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SET_SEARCH_INPUT:
            return updateObject(state, {
                searchStr: action.searchStr
            })
        case actionTypes.PAGINATION_DISPLAY_ARTICLES:
            const page = action.page;
            const size = state.pagination.size
            return {
                ...state,
                currentPage: page,
                pagination: {
                    ...state.pagination,
                    count: Math.ceil(state.articles.length / size),
                    page: page
                },
                displayArticles: state.articles.filter((value, index) => {
                    return (index <= page * size - 1 && index >= (page - 1) * size) && (state.searchStr === '' ? true : value.title.includes(state.searchStr));
                }),
            };
        case actionTypes.CLEAR_ARTICLE:
            return {
                ...state,
                articleForm: {
                    articleId: '',
                    title: '',
                    description: '',
                    content: ''
                }
            }
        case actionTypes.ENABLE_EDIT:
            if (state.editor !== null) {
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
                articleForm: articleForm,
                formIsValid: (isNotNull(articleForm.title) && isNotNull(articleForm.description) && isNotNull(articleForm.content))
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
            return {
                ...state,
                articles: action.articles,
                loading: false
            }
        case actionTypes.FETCH_ARTICLES_FAIL:
            return {...state};
        case actionTypes.SET_ARTICLE_ID:
            return {
                ...state,
                articleForm: {
                    articleId: action.id
                }
            }
        case actionTypes.FETCH_ARTICLE_START:
            return {
                ...state,
                loading: true,

            }
        case actionTypes.FETCH_ARTICLE_SUCCESS:
            action.article['articleId'] = action.articleId;
            return {
                ...state,
                articleForm: action.article,
                loading: false,
                formIsValid: isNotNull(action.article.title) && isNotNull(action.article.description) && isNotNull(action.article.content)
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
                loading: false,
                articles: state.articles.filter((article) => article.articleId !== action.id),
                displayArticles: state.displayArticles.filter((article) => article.articleId !== action.id)
            }
        default:
            return state;
    }
};

export default reducer;