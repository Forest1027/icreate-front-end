import React, {Component} from 'react';
import {Box} from "@material-ui/core";
import {connect} from "react-redux";

import SearchAddGrid from "../../components/UI/Search/SearchAddGrid";
import ArticleItems from "../../components/Article/ArticleItem/ArticleItems";
import Pagination from '../../components/UI/Pagination/Pagination';
import * as actions from "../../store/actions";

class ArticleScreen extends Component {

    componentDidMount() {
        this.props.onFetchArticles();
    }

    render() {
        return (
            <Box>
                <Box display="flex">
                    <Box width='100%'>
                        <SearchAddGrid/>
                    </Box>
                </Box>
                <ArticleItems articles={this.props.articles}/>
                <Pagination/>
            </Box>
        );
    };
}

const mapStateToProps = state => {
    return {
        articles: state.article.articles,
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onFetchArticles: () => dispatch(actions.fetchArticles()),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(ArticleScreen);