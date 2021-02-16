import * as actionTypes from './actionTypes';
import {databaseRef} from "../../database";
import {openSnackbar} from "./uiComponents";


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
        dispatch(createArticleStart());
        let newarticleRef = databaseRef.ref('articles/').push();
        console.log('push')
        console.log(newarticleRef.key)
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

};

export const fetchArticles = () => {
    return dispatch => {
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

};

export const fetchArticle = (articleId) => {
    return dispatch => {
        dispatch(enableEdit());
        console.log('fetch article')
        console.log(articleId)
        databaseRef.ref('articles/' + articleId).on('value', snapshot => {
            dispatch(fetchArticleSuccess(snapshot.val(), articleId));
        })
    }
}

export const goToCreateArticle = () => {
    return dispatch => {
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
    return {
        type: actionTypes.DELETE_ARTICLE_START
    }
}

export const deleteArticleSuccess = () => {
    return {
        type: actionTypes.DELETE_ARTICLE_SUCCESS
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
        databaseRef.ref("articles/"+articleId).set(null, error => {
            if(error) {
                dispatch(deleteArticleFail(error));
            }else {
                dispatch(deleteArticleSuccess());
            }
        });
    };
}

