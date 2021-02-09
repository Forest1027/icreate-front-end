import React, {Component} from 'react';
import {Box} from "@material-ui/core";
import Search from "../../components/UI/Search/Search";
import ArticleItem from "../../components/Article/ArticleItem/ArticleItem";

class Articles extends Component {
    render() {
        return (
            <Box>
                <Search/>
                <ArticleItem/>
            </Box>
        );
    };
}

export default Articles;