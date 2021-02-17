import * as actionTypes from './actionTypes';
import {databaseRef} from "../../database";
import {openSnackbar, closeDialog, closeSnackbar} from "./uiComponents";


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
    return {
        type: actionTypes.CHANGE_ARTICLE_CONTENT,
        attrName: name,
        attrValue: value
    }
}

export const createArticleSuccess = (name) => {
    return {
        type: actionTypes.CREATE_ARTICLE_SUCCESS,
        articleId: name
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

export const createArticle = (articleData) => {
    return dispatch => {
        dispatch(closeSnackbar());
        dispatch(createArticleStart());
        let newarticleRef = databaseRef.ref('articles/').push();
        console.log('push')
        console.log(newarticleRef.key)
        articleData.articleId = newarticleRef.key
        newarticleRef.set(articleData, error => {
            if (error) {
                dispatch(createArticleFail(error));
            } else {
                console.log('res');
                console.log(newarticleRef)
                dispatch(createArticleSuccess(newarticleRef.key));
                dispatch(openSnackbar());
                dispatch(disableEdit());
            }
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

export const fetchArticles = () => {
    return dispatch => {
        console.log(actionTypes.FETCH_ARTICLES)
        dispatch(fetchArticlesStart());
        const ref = databaseRef.ref('articles');
        ref.on('value', (snapshot) => {
            const res = snapshot.val();
            const fetchedArticles = [];
            for (let key in res) {
                fetchedArticles.push({
                    ...res[key],
                    articleId: key
                });
            }
            console.log('action')
            console.log(fetchedArticles)
            dispatch(fetchArticlesSuccess(fetchedArticles));
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

export const fetchArticle = (articleId) => {
    return dispatch => {
        console.log(actionTypes.FETCH_ARTICLE)
        dispatch(closeSnackbar());
        dispatch(enableEdit());
        dispatch(fetchArticleStart());
        console.log('fetch article')
        console.log(articleId)
        databaseRef.ref('articles/' + articleId).on('value', snapshot => {
            console.log('action '+actionTypes.FETCH_ARTICLE_SUCCESS)
            dispatch(fetchArticleSuccess(snapshot.val(), articleId));
        })
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
    console.log('clear action')
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
        console.log('update')
        console.log(articleData.articleId)
        databaseRef.ref('articles/' + articleData.articleId).set(articleData, error => {
            if (error) {
                dispatch(updateArticleFail(error));
            } else {
                dispatch(updateArticleSuccess(articleData));
                dispatch(openSnackbar());
                dispatch(disableEdit());
            }
        });
    }
}

export const deleteArticleStart = () => {
    console.log(actionTypes.DELETE_ARTICLE_START)
    return {
        type: actionTypes.DELETE_ARTICLE_START
    }
}

export const deleteArticleSuccess = () => {
    console.log(actionTypes.DELETE_ARTICLE_SUCCESS)
    return {
        type: actionTypes.DELETE_ARTICLE_SUCCESS
    }
}

export const deleteArticleFail = (error) => {
    console.log(actionTypes.DELETE_ARTICLE_FAIL)
    return {
        type: actionTypes.DELETE_ARTICLE_FAIL,
        error: error
    }
}

export const deleteArticle = (articleId) => {
    return dispatch => {
        console.log(actionTypes.DELETE_ARTICLE)
        deleteArticleStart();
        databaseRef.ref("articles/"+articleId).set(null, error => {
            if(error) {
                dispatch(deleteArticleFail(error));
            }else {
                dispatch(deleteArticleSuccess());
                dispatch(closeDialog());
            }
        });
    };
}

