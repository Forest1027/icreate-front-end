import * as actionTypes from './actionTypes';
import axios from "../../axios-url";

export const changeArticleContent = (name, value) => {
    return {
        type: actionTypes.CHANGE_ARTICLE_CONTENT,
        attrName: name,
        attrValue: value
    }
}

export const createArticleSuccess = (redirectPath) => {
    return {
        type: actionTypes.CREATE_ARTICLE_SUCCESS,
        redirectPath: redirectPath
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
        axios.post('/articles.json', articleData)
            .then(response => {
                dispatch(createArticleSuccess("/articles"));
            }).catch(error => {
                dispatch(createArticleFail(error));
        });
    }
}

export const fetchArticlesSuccess = () => {

};

export const fetchArticlesFail = () => {

};

export const fetchArticlesStart = () => {

};

export const fetchArticles = () => {

};