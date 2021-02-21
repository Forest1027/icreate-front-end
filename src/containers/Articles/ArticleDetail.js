import React, {Component} from "react";
import {withStyles} from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import {connect} from "react-redux";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import {CKEditor} from "@ckeditor/ckeditor5-react";
import Snackbar from '@material-ui/core/Snackbar';
import {NavLink} from "react-router-dom";

import * as actions from '../../store/actions/index';
import Aux from '../../hoc/Auxiliary';
import Progress from "../../components/UI/Progress/Progress";
import {checkValidity} from "../../shared/utility";


const styles = theme => ({
    root: {
        '& > *': {
            margin: theme.spacing(2),
        },
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
    },
    link: {
        textDecoration: 'none'
    },
    '@media (min-width:550px)' : {
        title: {
            width: '25ch',
        },
    }
});

class ArticleDetail extends Component {
    state = {
        validation: {
            title: {
                required: true,
                valid: false,
                touched: false
            },
            description: {
                required: true,
                valid: false,
                touched: false
            },
            content: {
                required: true,
                valid: false,
                touched: false
            }
        },
        formIsValid : false
    }

    componentDidMount() {
        for (let formIdentifier in this.props.articleForm) {
            console.log(formIdentifier+":"+this.props.articleForm[formIdentifier])
        }
    }

    componentWillMount() {
        this.props.onFetchArticle(this.props.articleForm.articleId);
    }

    createArticleHandler = () => {
        const formData = {};
        for (let formIdentifier in this.props.articleForm) {
            if (formIdentifier !== 'articleId') {
                formData[formIdentifier] = this.props.articleForm[formIdentifier];
            }
        }
        formData['userId'] = this.props.userId;
        this.props.onCreateArticle(formData, this.props.token);
    };

    updateArticleHandler = () => {
        const formData = {};
        for (let formIdentifier in this.props.articleForm) {
            formData[formIdentifier] = this.props.articleForm[formIdentifier];
        }
        this.props.onUpdateArticle(formData);
    }

    inputChangeHandler = (event) => {
        const targetName = event.target.name;
        const targetValue = event.target.value;
        const updatedValidationElement = {
            ...this.state.validation[targetName],
            valid: checkValidity(targetValue, this.state.validation[targetName]),
            touched: true
        }
        const updatedValidation = {
            ...this.state.validation,
            [targetName] : updatedValidationElement
        }
        this.setState({validation: updatedValidation});
        this.props.onInputChange(targetName, targetValue);
    }

    editorInputChangeHandler = (event, editor) => {
        const data = editor.getData();
        this.props.onInputChange('content', data);
    }

    render() {
        const {classes} = this.props;
        let articleDetail = <Progress loading/>;
        if(!this.props.loading) {
            articleDetail = (
                <Box justifyContent="flex-start" width='80%'>
                    <form className={classes.root} noValidate autoComplete="off" onSubmit={this.createArticleHandler}>
                        <Box className={classes.buttonBox}>
                            {this.props.readOnly ?
                                <Button className={classes.editButton} variant="contained"
                                        onClick={this.props.onEditClicked}>Edit</Button>
                                : (
                                    this.props.articleForm.articleId !== '' ?
                                        (<Aux>
                                            <Button className={classes.editButton} variant="contained"
                                                    onClick={this.updateArticleHandler} disabled={!this.props.formIsValid}>Update</Button>
                                            <Button className={classes.cancelButton}
                                                    variant="outlined"
                                                    onClick={this.props.onUpdateCancelClicked}>Cancel</Button>
                                        </Aux>)
                                        : (<Aux>
                                            <Button className={classes.editButton} variant="contained"
                                                    onClick={this.createArticleHandler} disabled={!this.props.formIsValid}>Create</Button>
                                            <NavLink className={classes.link} to='/articles'> <Button
                                                className={classes.cancelButton}
                                                variant="outlined">Cancel</Button></NavLink>
                                        </Aux>))
                            }

                        </Box>
                        <Box className={classes.title}>
                            <TextField id="standard-basic" label="Title" fullWidth name="title"
                                       onChange={this.inputChangeHandler} defaultValue={this.props.articleForm.title}
                                       inputProps={{readOnly: this.props.readOnly}} error={!this.state.validation.title.valid && this.state.validation.title.touched} helperText={(!this.state.validation.title.valid && this.state.validation.title.touched)?"Cannot be empty":""}/>
                        </Box>
                        <Box>
                            <TextField id="standard-basic" label="One line description" fullWidth name="description"
                                       onChange={this.inputChangeHandler}
                                       defaultValue={this.props.articleForm.description}
                                       inputProps={{readOnly: this.props.readOnly}} error={!this.state.validation.description.valid && this.state.validation.description.touched} helperText={(!this.state.validation.title.valid && this.state.validation.title.touched)?"Cannot be empty":""}/>
                        </Box>
                        <Box className={classes.editor}>
                            <CKEditor
                                data={this.props.articleForm.content}
                                editor={ClassicEditor}
                                config={{
                                    removePlugins: ["ImageUpload"],
                                }}
                                onReady={editor => {
                                    this.props.onInitEditor(editor);
                                }}
                                onChange={this.editorInputChangeHandler}
                                onBlur={(event, editor) => {
                                    console.log('Blur.', editor);
                                }}
                                onFocus={(event, editor) => {
                                    console.log('Focus.', editor);
                                }}
                            />
                        </Box>
                    </form>
                </Box>
            );
        }
        return (
            <Box justifyContent="center" display="flex" flexWrap='wrap'>
                <Snackbar
                    anchorOrigin={{vertical: 'top', horizontal: 'center'}}
                    open={this.props.open}
                    onClose={this.props.onCloseSnackbar}
                    message="Congratulations! Your changes have been saved."
                />
                {articleDetail}
            </Box>);
    }
    ;
}

const mapStateToProps = state => {
    return {
        articleForm: state.article.articleForm,
        readOnly: state.article.readOnly,
        open: state.ui.snackbar.open,
        horizontal: state.ui.snackbar.horizontal,
        vertical: state.ui.snackbar.vertical,
        loading: state.article.loading,
        formIsValid: state.article.formIsValid,
        token: state.auth.token,
        userId: state.auth.userId
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onCreateArticle: (articleData, token) => dispatch(actions.createArticle(articleData, token)),
        onInputChange: (name, value) => dispatch(actions.changeArticleContent(name, value)),
        onInitEditor: (editor) => dispatch(actions.initEditor(editor)),
        onEditClicked: () => dispatch(actions.enableEdit()),
        onUpdateCancelClicked: () => dispatch(actions.disableEdit()),
        onUpdateArticle: (articleData) => dispatch(actions.updateArticle(articleData)),
        onCloseSnackbar: () => dispatch(actions.closeSnackbar()),
        onFetchArticle: (articleId) => dispatch(actions.fetchArticle(articleId))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles, {withTheme: true})(ArticleDetail));