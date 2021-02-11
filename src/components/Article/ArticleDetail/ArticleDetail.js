import React from "react";
import {makeStyles} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Box from "@material-ui/core/Box";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),

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
}));
const ArticleDetail = () => {
    const classes = useStyles();

    return (
        <Box justifyContent="center" display="flex" flexWrap='wrap'>
            <Box justifyContent="flex-start" width='80%'>
                <form className={classes.root} noValidate autoComplete="off">
                    <Box className={classes.title}>
                        <TextField id="standard-basic" label="Title" fullWidth/>
                    </Box>
                    <Box >
                        <TextField id="standard-basic" label="One line description" fullWidth/>
                    </Box>
                    <Box className={classes.editor}>
                        <CKEditor
                            editor={ ClassicEditor }
                            config={ {
                                removePlugins: ["ImageUpload"],
                            } }
                            data="<p>Hello from CKEditor 5!</p>"
                            onReady={ editor => {
                                // You can store the "editor" and use when it is needed.
                                console.log( 'Editor is ready to use!', editor );
                            } }
                            onChange={ ( event, editor ) => {
                                const data = editor.getData();
                                console.log( { event, editor, data } );
                            } }
                            onBlur={ ( event, editor ) => {
                                console.log( 'Blur.', editor );
                            } }
                            onFocus={ ( event, editor ) => {
                                console.log( 'Focus.', editor );
                            } }
                        />
                    </Box>
                </form>
            </Box>
        </Box>
    );
}

export default ArticleDetail;