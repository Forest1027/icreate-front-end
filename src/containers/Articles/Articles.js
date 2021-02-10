import React, {Component} from 'react';
import {Box} from "@material-ui/core";

import SearchAddGrid from "../../components/UI/Search/SearchAddGrid";
import ArticleItem from "../../components/Article/ArticleItem/ArticleItem";
import Pagination from '../../components/UI/Pagination/Pagination';

class Articles extends Component {
    render() {
        return (
            <Box>
                <Box display="flex">
                    <Box width='100%'>
                        <SearchAddGrid/>
                    </Box>
                </Box>
                <ArticleItem/>
                <Pagination/>
            </Box>
        );
    };
}

export default Articles;