import React, {Component} from "react";
import {withStyles} from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import {connect} from "react-redux";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import {CKEditor} from "@ckeditor/ckeditor5-react";

import * as actions from '../../store/actions/index';
import Aux from '../../hoc/Auxiliary';


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
    componentDidMount() {
        console.log('track')
        console.log(this.props.readOnly)

    }

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
        console.log('input change 1')
        console.log(this.props.readOnly)
        this.props.onInputChange(event.target.name, event.target.value)
    }

    editorInputChangeHanndler = (event, editor) => {
        const data = editor.getData();
        this.props.onInputChange('content', data);
    }

    editHandler = () => {
        this.props.onEditClicked();
    }

    render() {
        const {classes} = this.props;
        return (
            <Box justifyContent="center" display="flex" flexWrap='wrap'>
                <Box justifyContent="flex-start" width='80%'>
                    <form className={classes.root} noValidate autoComplete="off" onSubmit={this.createArticleHandler}>
                        <Box className={classes.buttonBox}>
                            {this.props.readOnly ?
                                <Button className={classes.editButton} variant="contained"
                                        onClick={this.editHandler}>Edit</Button>
                                : (
                                    <Aux>
                                        <Button className={classes.editButton} variant="contained"
                                                onClick={this.createArticleHandler}>Create</Button>
                                        <Button className={classes.cancelButton}
                                                variant="outlined">Cancel</Button>
                                    </Aux>)
                            }

                        </Box>
                        <Box className={classes.title}>
                            <TextField id="standard-basic" label="Title" fullWidth name="title"
                                       onChange={this.inputChangeHandler} defaultValue={this.props.articleForm.title}
                                       inputProps={{readOnly: this.props.readOnly}}/>
                        </Box>
                        <Box>
                            <TextField id="standard-basic" label="One line description" fullWidth name="description"
                                       onChange={this.inputChangeHandler}
                                       defaultValue={this.props.articleForm.description}
                                       inputProps={{readOnly: this.props.readOnly}}/>
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
                                onChange={this.editorInputChangeHanndler}
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
    };
}

const mapStateToProps = state => {
    return {
        articleForm: state.article.articleForm,
        readOnly: state.article.readOnly,
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onCreateArticle: (articleData) => dispatch(actions.createArticle(articleData)),
        onInputChange: (name, value) => dispatch(actions.changeArticleContent(name, value)),
        onInitEditor: (editor) => dispatch(actions.initEditor(editor)),
        onEditClicked: () => dispatch(actions.enableEdit())
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles, {withTheme: true})(ArticleDetail));