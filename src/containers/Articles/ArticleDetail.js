import React, {Component} from "react";
import {withStyles} from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import {connect} from "react-redux";

import Editor from "../../components/Editor/Editor";
import * as actions from '../../store/actions/index';

const styles = theme => ({
    root: {
        '& > *': {
            margin: theme.spacing(2),
        },
    },
    title: {
        width: '25ch',
    },
    margin: {
        margin: theme.spacing(1),
    },
    editor: {
        marginTop: theme.spacing(5),
    },
    cancelButton: {
        borderColor: '#660033',
        color: '#660033',
        width: 80,
        height: '100%',
        textAlign: 'left',
        marginRight: theme.spacing(1),
    },
    editButton: {
        backgroundColor: '#660033',
        color: 'white',
        width: 80,
        height: '100%',
        textAlign: 'left',
        marginRight: theme.spacing(1),
    },
    buttonBox: {
        textAlign: 'left',
    }
});

class ArticleDetail extends Component {

    createArticleHandler = () => {
        const formData = {};
        console.log('create')
        console.log(this.props.articleForm)
        for (let formIdentifier in this.props.articleForm) {
            formData[formIdentifier] = this.props.articleForm[formIdentifier];
        }

        console.log(formData)
        this.props.onCreateArticle(formData)
    };

    inputChangeHandler = (event) => {
        this.props.onInputChange(event.target.name, event.target.value)
    }

    render() {
        const {classes} = this.props;
        return (
            <Box justifyContent="center" display="flex" flexWrap='wrap'>
                <Box justifyContent="flex-start" width='80%'>
                    <form className={classes.root} noValidate autoComplete="off" onSubmit={this.createArticleHandler}>
                        <Box className={classes.buttonBox}>
                            <Button className={classes.editButton} variant="contained"
                                    onClick={this.createArticleHandler}>Create</Button>
                            <Button className={classes.cancelButton} variant="outlined">Cancel</Button>
                        </Box>
                        <Box className={classes.title}>
                            <TextField id="standard-basic" label="Title" fullWidth name="title"
                                       onChange={this.inputChangeHandler}/>
                        </Box>
                        <Box>
                            <TextField id="standard-basic" label="One line description" fullWidth name="description"
                                       onChange={this.inputChangeHandler}/>
                        </Box>
                        <Box className={classes.editor}>
                            <Editor changed={this.inputChangeHandler}/>
                        </Box>
                    </form>
                </Box>
            </Box>);
    };
}

const mapStateToProps = state => {
    return {
        redirectPath: state.article.redirectPath,
        articleForm: state.article.articleForm
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onCreateArticle: (articleData) => dispatch(actions.createArticle(articleData)),
        onInputChange: (name, value) => dispatch(actions.changeArticleContent(name, value))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles, {withTheme: true})(ArticleDetail));