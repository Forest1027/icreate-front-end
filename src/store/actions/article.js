import * as actionTypes from './actionTypes';
import axios from "../../axios-url";

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
        axios.post('/articles.json', articleData)
            .then(response => {
                console.log(response.data)
                console.log(response.data.name)
                dispatch(createArticleSuccess(response.data.name));
                dispatch(disableEdit());
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