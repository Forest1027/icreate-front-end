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
    formIsValid: false,
}

const setSearchInput = (state, action) => {
    return updateObject(state, {
        searchStr: action.searchStr
    })
}

const paginationDisplayArticles = (state, action) => {
    const page = action.page;
    const size = state.pagination.size;
    const pagination = updateObject(state.pagination, {
        count: Math.ceil(state.articles.length / size),
        page: page
    });
    const displayArticles = state.articles.filter((value) => {
        return state.searchStr === '' ? true : value.title.includes(state.searchStr);
    }).filter((value, index) => {
        return index <= page * size - 1 && index >= (page - 1) * size;
    });
    return updateObject(state, {
        currentPage: page,
        pagination: pagination,
        displayArticles: displayArticles
    })
}

const clearArticle = (state, action) => {
    return updateObject(state, {
        articleForm: {
            articleId: '',
            title: '',
            description: '',
            content: ''
        }
    })
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

const changeArticleContent = (state, action) => {
    const articleForm = state.articleForm;
    articleForm[action.attrName] = action.attrValue;
    return updateObject(state, {
        articleForm: articleForm,
        formIsValid: (isNotNull(articleForm.title) && isNotNull(articleForm.description) && isNotNull(articleForm.content))
    })
}

const createArticleStart = (state, action) => {
    return updateObject(state, {
        loading: true
    });
}

const createArticleSuccess = (state, action) => {
    const form = state.articleForm;
    form.articleId = action.articleId;
    return updateObject(state, {
        articleForm: form,
        loading: false
    });
}

const createArticleFail = (state, action) => {
    return updateObject(state, {
        loading: false
    })
}

const fetchArticlesStart = (state, action) => {
    return updateObject(state, {
        loading: true
    })
}

const fetchArticlesSuccess = (state, action) => {
    return updateObject(state, {
        articles: action.articles,
        loading: false
    });
}

const fetchArticlesFail = (state, action) => {
    return updateObject(state, {
        loading: false
    })
}

const setArticleID = (state, action) => {
    return updateObject(state, {
        articleForm: {
            articleId: action.id
        }
    })
}

const fetchArticleStart = (state, action) => {
    return updateObject(state, {
        loading: true,
    })
}

const fetchArticleSuccess = (state, action) => {
    action.article['articleId'] = action.articleId;
    return updateObject(state, {
        articleForm: action.article,
        loading: false,
        formIsValid: isNotNull(action.article.title) && isNotNull(action.article.description) && isNotNull(action.article.content)
    })
}

const updateArticleSuccess = (state, action) => {
    return updateObject(state, {
        articleForm: action.article
    })
}

const deleteArticleStart = (state, action) => {
    return updateObject(state, {
        loading: true
    })
}

const deleteArticleSuccess = (state, action) => {
    return updateObject(state, {
        loading: false,
        articles: state.articles.filter((article) => article.articleId !== action.id),
        displayArticles: state.displayArticles.filter((article) => article.articleId !== action.id)
    })
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SET_SEARCH_INPUT:
            return setSearchInput(state, action);
        case actionTypes.PAGINATION_DISPLAY_ARTICLES:
            return paginationDisplayArticles(state, action);
        case actionTypes.CLEAR_ARTICLE:
            return clearArticle(state, action);
        case actionTypes.ENABLE_EDIT:
            return enableEdit(state, action);
        case actionTypes.DISABLE_EDIT:
            return disableEdit(state, action);
        case actionTypes.INIT_EDITOR:
            return initEditor(state, action);
        case actionTypes.CHANGE_ARTICLE_CONTENT:
            return changeArticleContent(state, action);
        case actionTypes.CREATE_ARTICLE_START:
            return createArticleStart(state, action);
        case actionTypes.CREATE_ARTICLE_SUCCESS:
            return createArticleSuccess(state, action);
        case actionTypes.CREATE_ARTICLE_FAIL:
            return createArticleFail(state, action);
        case actionTypes.FETCH_ARTICLES_START:
            return fetchArticlesStart(state, action);
        case actionTypes.FETCH_ARTICLES_SUCCESS:
            return fetchArticlesSuccess(state, action);
        case actionTypes.FETCH_ARTICLES_FAIL:
            return fetchArticlesFail(state, action);
        case actionTypes.SET_ARTICLE_ID:
            return setArticleID(state, action);
        case actionTypes.FETCH_ARTICLE_START:
            return fetchArticleStart(state, action);
        case actionTypes.FETCH_ARTICLE_SUCCESS:
            return fetchArticleSuccess(state, action);
        case actionTypes.UPDATE_ARTICLE_SUCCESS:
            return updateArticleSuccess(state, action);
        case actionTypes.DELETE_ARTICLE_START:
            return deleteArticleStart(state, action);
        case actionTypes.DELETE_ARTICLE_SUCCESS:
            return deleteArticleSuccess(state, action);
        default:
            return state;
    }
};

export default reducer;