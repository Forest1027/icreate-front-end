import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from "@material-ui/core/Button";
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import {useMediaQuery} from "@material-ui/core";
import {NavLink} from "react-router-dom";
import {connect} from "react-redux";

import Search from "./Search";
import * as actions from "../../../store/actions";

const useStyles = makeStyles((theme) => ({

    button: {
        marginTop: theme.spacing(5),
        marginBottom: theme.spacing(5),
        backgroundColor: '#660033',
        color: 'white',
    },
    buttonGrid: {
        textAlign: "left",
    },
    buttonIcon: {
        marginTop: theme.spacing(5),
        marginBottom: theme.spacing(5),
        backgroundColor: '#660033',
        color: 'white',
    },
    link: {
        textDecoration: 'none'
    },

}));

const SearchAddGrid = (props) => {
    const classes = useStyles();
    const matches = useMediaQuery('(min-width: 600px)')
    return (
        <Grid container direction="row" justify="flex-start" alignItems="center">
            <Search changed={props.changed}/>
            <Grid item sm={4} xs={3} className={classes.buttonGrid} onClick={props.onCreateClicked}>
                {matches? (
                    <NavLink className={classes.link} to='/articleDetail'><Button variant="contained" className={classes.button}>Create</Button></NavLink>
                ):(
                    <NavLink className={classes.link} to='/articleDetail'><IconButton  variant="contained" className={classes.button}><AddIcon/></IconButton></NavLink>

                )}

            </Grid>
        </Grid>
    );
};

const mapDispatchToProps = dispatch => {
    return {
        onCreateClicked: () => dispatch(actions.goToCreateArticle())
    }
};

export default connect(null, mapDispatchToProps)(SearchAddGrid);