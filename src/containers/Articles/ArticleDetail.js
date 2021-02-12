import React, {Component} from "react";
import {withStyles} from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

import Editor from "../../components/Editor/Editor";

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
    render() {
        const {classes} = this.props;
        return (
            <Box justifyContent="center" display="flex" flexWrap='wrap'>
                <Box justifyContent="flex-start" width='80%'>
                    <form className={classes.root} noValidate autoComplete="off">
                        <Box className={classes.buttonBox}>
                            <Button className={classes.editButton} variant="contained">Create</Button>
                            <Button className={classes.cancelButton} variant="outlined">Cancel</Button>
                        </Box>
                        <Box className={classes.title}>
                            <TextField id="standard-basic" label="Title" fullWidth/>
                        </Box>
                        <Box>
                            <TextField id="standard-basic" label="One line description" fullWidth/>
                        </Box>
                        <Box className={classes.editor}>
                            <Editor/>
                        </Box>
                    </form>
                </Box>
            </Box>);
    };
}

export default withStyles(styles, {withTheme: true})(ArticleDetail);