import * as actionTypes from './actionTypes';
import {openSnackbar, closeDialog, closeSnackbar} from "./uiComponents";

import axios from "./../../axios-url";
import {isNotNull} from "../../shared/utility";

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

export const changeArticleContent = (name, value) => {
    console.log('change article content')
    console.log(name, value)
    return {
        type: actionTypes.CHANGE_ARTICLE_CONTENT,
        attrName: name,
        attrValue: value
    }
}

export const createArticleSuccess = () => {
    return {
        type: actionTypes.CREATE_ARTICLE_SUCCESS,
    }
};

export const createArticleFail = (error) => {
    return {
        type: actionTypes.CREATE_ARTICLE_FAIL,
        error: error
    }
};

export const createArticleStart = () => {
    return {
        type: actionTypes.CREATE_ARTICLE_START
    }
};

export const createArticle = (articleData, token) => {
    return dispatch => {
        dispatch(closeSnackbar());
        dispatch(createArticleStart());
        console.log('create article')
        console.log(articleData)
        axios.post('/articles.json?auth='+token, articleData)
            .then(response => {
                articleData['articleId'] = response.data.name;
                dispatch(createArticleSuccess());
                dispatch(disableEdit());
            }).catch(error => {
            dispatch(createArticleFail(error));
        });

    }
}

export const fetchArticlesSuccess = (articles) => {
    return {
        type: actionTypes.FETCH_ARTICLES_SUCCESS,
        articles: articles
    }
};

export const fetchArticlesFail = (error) => {
    return {
        type: actionTypes.FETCH_ARTICLES_FAIL,
        error: error
    }
};

export const fetchArticlesStart = () => {
    return {
        type: actionTypes.FETCH_ARTICLES_START
    }
};

export const fetchArticles = (token, userId) => {
    return dispatch => {
        dispatch(fetchArticlesStart());
        const queryParams = '?auth=' + token + '&orderBy="userId"&equalTo="' + userId+'"';
        axios.get('/articles.json'+queryParams).then(
            res => {
                const fetchedArticles = [];
                for (let key in res.data) {
                    fetchedArticles.push({
                        ...res.data[key],
                        articleId:key
                    });
                }
                dispatch(fetchArticlesSuccess(fetchedArticles));
                dispatch(paginationDisplayArticles(1));
            }
        ).catch(err => {
            dispatch(fetchArticlesFail(err));
        })
    }
};

export const fetchArticleSuccess = (article, articleId) => {
    return {
        type: actionTypes.FETCH_ARTICLE_SUCCESS,
        article: article,
        articleId: articleId
    }
};

export const fetchArticleFail = (error) => {
    return {
        type: actionTypes.FETCH_ARTICLE_FAIL,
        error: error
    }
};

export const fetchArticleStart = () => {
    return {
        type: actionTypes.FETCH_ARTICLE_START
    }
};

export const setArticleId = (articleId) => {
    return {
        type: actionTypes.SET_ARTICLE_ID,
        id: articleId
    }
}

export const fetchArticle = (articleId) => {
    return dispatch => {
        dispatch(closeSnackbar());
        dispatch(enableEdit());
        if(isNotNull(articleId)) {
            dispatch(fetchArticleStart());
            axios.get(`/articles/${articleId}.json`).then(
                res => {
                    dispatch(fetchArticleSuccess(res.data, articleId));
                }
            ).catch(err => {
                dispatch(fetchArticlesFail(err));
            })
        }
    }
}

export const goToCreateArticle = () => {
    return dispatch => {
        dispatch(closeSnackbar());
        dispatch(clearArticle());
        dispatch(enableEdit());
    }
}

export const clearArticle = () => {
    return {
        type: actionTypes.CLEAR_ARTICLE
    }
}

export const updateArticleSuccess = (articleData) => {
    return {
        type: actionTypes.UPDATE_ARTICLE_SUCCESS,
        article: articleData
    }
};

export const updateArticleFail = (error) => {
    return {
        type: actionTypes.UPDATE_ARTICLE_FAIL,
        error: error
    }
};

export const updateArticleStart = () => {
    return {
        type: actionTypes.UPDATE_ARTICLE_START
    }
};

export const updateArticle = (articleData) => {
    return dispatch => {
        dispatch(updateArticleStart());
        axios.patch(`/articles/${articleData.articleId}.json`, articleData).then(
            () => {
                dispatch(updateArticleSuccess(articleData));
                dispatch(openSnackbar());
                dispatch(disableEdit());
            }
        ).catch(err => {
            dispatch(updateArticleFail(err));
        })
    }
}

export const deleteArticleStart = () => {
    return {
        type: actionTypes.DELETE_ARTICLE_START
    }
}

export const deleteArticleSuccess = (articleId) => {
    return {
        type: actionTypes.DELETE_ARTICLE_SUCCESS,
        id: articleId
    }
}

export const deleteArticleFail = (error) => {
    return {
        type: actionTypes.DELETE_ARTICLE_FAIL,
        error: error
    }
}

export const deleteArticle = (articleId) => {
    return dispatch => {
        deleteArticleStart();
        axios.delete(`/articles/${articleId}.json`).then(
            () => {
                dispatch(deleteArticleSuccess(articleId));
                dispatch(closeDialog());
            }
        ).catch(err => {
            dispatch(deleteArticleFail(err));
        })
    };
}

export const paginationDisplayArticles = (pageNum) => {
    return {
        type : actionTypes.PAGINATION_DISPLAY_ARTICLES,
        page: pageNum
    }
}

