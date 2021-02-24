import React, {Component} from 'react';
import {Box} from "@material-ui/core";
import {connect} from "react-redux";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import {withStyles} from "@material-ui/core/styles";
import Progress from "../../components/UI/Progress/Progress";

import SearchAddGrid from "../../components/UI/Search/SearchAddGrid";
import ArticleItems from "../../components/Article/ArticleItem/ArticleItems";
import Pagination from '../../components/UI/Pagination/Pagination';
import * as actions from "../../store/actions";
import Aux from '../../hoc/Auxiliary';

const styles = () => ({
    button: {
        color: '#660033',
    },

});

class ArticleScreen extends Component {

    componentDidMount() {
        this.props.onSearchInputChange('');
        this.props.onFetchArticles(this.props.token, this.props.userId);
    }

    searchInputChangeHandler = (event) => {
        const searchStr = event.target.value;
        this.props.onSearchInputChange(searchStr);
        setTimeout(() => {
            if (searchStr === this.props.search) {
                this.props.onChangePage(this.props.currentPage);
            }
        }, 500);
    }

    render() {
        const {classes} = this.props;
        let articles = <Progress loading={this.props.loading}/>
        if(!this.props.loading) {
            articles = (
                <Aux>
                    <ArticleItems articles={this.props.displayArticles}/>
                    <Pagination count={this.props.count} changed={(pageNum) => this.props.onChangePage(pageNum)}/>
                </Aux>
            )
        }
        return (
            <Box>
                <Box display="flex">
                    <Box width='100%'>
                        <SearchAddGrid changed={this.searchInputChangeHandler}/>
                    </Box>
                </Box>
                {articles}
                <Dialog
                    open={this.props.open}
                    onClose={this.props.onCloseDialog}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">{"Continue to delete this article?"}</DialogTitle>
                    <DialogActions>
                        <Button className={classes.button} onClick={this.props.onCloseDialog}>
                            Cancel
                        </Button>
                        <Button className={classes.button}
                                onClick={() => this.props.onDeleteArticle(this.props.deleteArticleId)} autoFocus>
                            Confirm
                        </Button>
                    </DialogActions>
                </Dialog>
            </Box>
        );
    };
}

const mapStateToProps = state => {
    return {
        articles: state.article.articles,
        open: state.ui.dialog.open,
        deleteArticleId: state.ui.dialog.articleId,
        loading: state.article.loading,
        displayArticles: state.article.displayArticles,
        count: state.article.pagination.count,
        token: state.auth.token,
        userId: state.auth.userId,
        search: state.article.searchStr,
        currentPage: state.article.currentPage,
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onFetchArticles: (token, userId) => dispatch(actions.fetchArticles(token, userId)),
        onCloseDialog: () => dispatch(actions.closeDialog()),
        onDeleteArticle: (id) => dispatch(actions.deleteArticle(id)),
        onChangePage: (pageNum) => dispatch(actions.paginationDisplayArticles(pageNum)),
        onSearchInputChange: (searchStr) => dispatch(actions.setSearchInput(searchStr)),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles, {withTheme: true})(ArticleScreen));