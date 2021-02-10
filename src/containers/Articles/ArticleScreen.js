import React, {Component} from 'react';
import {Box} from "@material-ui/core";

import SearchAddGrid from "../../components/UI/Search/SearchAddGrid";
import ArticleItems from "../../components/Article/ArticleItem/ArticleItems";
import Pagination from '../../components/UI/Pagination/Pagination';
import axios from '../../axios-url';

class ArticleScreen extends Component {
    state = {
        articles: []
    }

    componentDidMount() {
        axios.get('/articles.json').then(
            res => {
                const fetchedArticles = [];
                for (let key in res.data) {
                    console.log(res.data[key]);
                    fetchedArticles.push({
                        ...res.data[key],
                        id:key
                    });
                }
                this.setState({articles:fetchedArticles})
            }
        ).catch(err => {
            console.log(`There is err ${err}`);
        })
    }

    render() {
        return (
            <Box>
                <Box display="flex">
                    <Box width='100%'>
                        <SearchAddGrid/>
                    </Box>
                </Box>
                <ArticleItems articles={this.state.articles}/>
                <Pagination/>
            </Box>
        );
    };
}

export default ArticleScreen;