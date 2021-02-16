import React, {Component} from 'react';
import {Box} from "@material-ui/core";
import {connect} from "react-redux";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import {withStyles} from "@material-ui/core/styles";

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
                <ArticleItems articles={this.props.articles}/>
                <Pagination/>
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
        deleteArticleId: state.ui.dialog.articleId
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onFetchArticles: () => dispatch(actions.fetchArticles()),
        onCloseDialog: () => dispatch(actions.closeDialog()),
        onDeleteArticle: (id) => dispatch(actions.deleteArticle(id))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles, {withTheme: true})(ArticleScreen));