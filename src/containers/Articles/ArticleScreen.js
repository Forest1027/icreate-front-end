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

const styles = () => ({
    button: {
        color: '#660033',
    },

});

class ArticleScreen extends Component {
    componentWillMount() {
        console.log('mount')
        console.log(this.props.loading)
    }

    componentDidMount() {
        this.props.onFetchArticles();
    }

    render() {
        const {classes} = this.props;
        return (
            <Box>
                <Box display="flex">
                    <Box width='100%'>
                        <SearchAddGrid/>
                    </Box>
                </Box>
                <Progress loading={this.props.loading}/>
                <ArticleItems articles={this.props.displayArticles}/>
                <Pagination count={this.props.count} changed={(pageNum) => this.props.onChangePage(pageNum)}/>
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
                        <Button className={classes.button} onClick={() => this.props.onDeleteArticle(this.props.deleteArticleId)} autoFocus>
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
        count: state.article.pagination.count
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onFetchArticles: () => dispatch(actions.fetchArticles()),
        onCloseDialog: () => dispatch(actions.closeDialog()),
        onDeleteArticle: (id) => dispatch(actions.deleteArticle(id)),
        onChangePage: (pageNum) => dispatch(actions.paginationDisplayArticles(pageNum)),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles, {withTheme: true})(ArticleScreen));