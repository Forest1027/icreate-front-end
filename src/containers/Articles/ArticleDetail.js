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
import {checkValidity, isNotNull} from "../../shared/utility";


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
    },
    link: {
        textDecoration: 'none'
    },

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
        console.log('componentdidmount')
        console.log(this.props.articleForm.articleId)
    }

    componentWillMount() {
        this.setState({formIsValid : isNotNull(this.props.articleForm.title) && isNotNull(this.props.articleForm.description) && isNotNull(this.props.articleForm.content)});
    }

    createArticleHandler = () => {
        const formData = {};
        for (let formIdentifier in this.props.articleForm) {
            if (formIdentifier !== 'articleId') {
                formData[formIdentifier] = this.props.articleForm[formIdentifier];
            }
        }
        this.props.onCreateArticle(formData);
    };

    updateArticleHandler = () => {
        const formData = {};
        for (let formIdentifier in this.props.articleForm) {
            formData[formIdentifier] = this.props.articleForm[formIdentifier];
        }
        console.log('update handler')
        console.log(formData)
        this.props.onUpdateArticle(formData);
    }

    inputChangeHandler = (event) => {
        const targetName = event.target.name;
        const targetValue = event.target.value;
        this.props.onInputChange(targetName, targetValue);
        const updatedValidationElement = {
            ...this.state.validation[targetName],
            valid: checkValidity(targetValue, this.state.validation[targetName]),
            touched: true
        }
        const updatedValidation = {
            ...this.state.validation,
            [targetName] : updatedValidationElement
        }
        console.log('input change')
        console.log(this.props.articleForm.content);
        console.log(isNotNull(this.props.articleForm.content));
        this.setState({validation: updatedValidation, formIsValid: (isNotNull(this.props.articleForm.title) && isNotNull(this.props.articleForm.description) && isNotNull(this.props.articleForm.content))});
    }

    editorInputChangeHandler = (event, editor) => {
        const data = editor.getData();
        this.props.onInputChange('content', data);
        this.setState({formIsValid: (isNotNull(this.props.articleForm.title) && isNotNull(this.props.articleForm.description) && isNotNull(this.props.articleForm.content))});
    }

    render() {
        const {classes} = this.props;
        return (
            <Box justifyContent="center" display="flex" flexWrap='wrap'>
                <Progress loading={this.props.loading}/>
                <Snackbar
                    anchorOrigin={{vertical: 'top', horizontal: 'center'}}
                    open={this.props.open}
                    onClose={this.props.onCloseSnackbar}
                    message="Congratulations! Your changes have been saved."
                />
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
                                                    onClick={this.updateArticleHandler} disabled={!this.state.formIsValid}>Update</Button>
                                            <Button className={classes.cancelButton}
                                                    variant="outlined"
                                                    onClick={this.props.onUpdateCancelClicked}>Cancel</Button>
                                        </Aux>)
                                        : (<Aux>
                                            <Button className={classes.editButton} variant="contained"
                                                    onClick={this.createArticleHandler} disabled={!this.state.formIsValid}>Create</Button>
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
        loading: state.article.loading
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onCreateArticle: (articleData) => dispatch(actions.createArticle(articleData)),
        onInputChange: (name, value) => dispatch(actions.changeArticleContent(name, value)),
        onInitEditor: (editor) => dispatch(actions.initEditor(editor)),
        onEditClicked: () => dispatch(actions.enableEdit()),
        onUpdateCancelClicked: () => dispatch(actions.disableEdit()),
        onUpdateArticle: (articleData) => dispatch(actions.updateArticle(articleData)),
        onCloseSnackbar: () => dispatch(actions.closeSnackbar()),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles, {withTheme: true})(ArticleDetail));