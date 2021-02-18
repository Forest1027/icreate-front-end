import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Pagination from '@material-ui/lab/Pagination';
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: theme.spacing(5),
        marginBottom: theme.spacing(5),
        margin: 'auto',
    },
    pagination: {
        justifyContent: 'center',
        margin: 'auto',
        display: 'block'
    }
}));

const PaginationOutlined = (props) => {
    const classes = useStyles('');

    return (
        <Grid container className={classes.root}>
                <div className={classes.pagination}>
                    <Pagination count={props.count} variant="outlined" onChange={(event, page) => props.changed(page)} />
                </div>
        </Grid>
    );
}

export default PaginationOutlined;