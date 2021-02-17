import React from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import Fade from "@material-ui/core/Fade";
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    progress: {
        color: '#660033',
    }
}));

const Progress = (props) => {
    const classes = useStyles();

    return (
        <Fade
            in={props.loading}
            unmountOnExit
        >
            <CircularProgress className={classes.progress}/>
        </Fade>
    );
};

export default Progress;