import React from "react";
import {makeStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import {NavLink} from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
        },
        width: '100%'
    },
    button: {
        backgroundColor: '#660033',
        color: 'white',
        width: 80,
        height: '100%'
    },
    link: {
        textDecoration: 'none'
    }
}));

const NavigationItems = () => {
    const classes = useStyles();

    return (
        <Box className={classes.root} display="flex" justifyContent="flex-end">
            <NavLink className={classes.link} to='/articles'><Button className={classes.button} variant="contained">My Articles</Button></NavLink>
            <NavLink className={classes.link} to='/profile'><Button className={classes.button} variant="contained">My Profile</Button></NavLink>
            <NavLink className={classes.link} to='/login'><Button className={classes.button} variant="contained">Login</Button></NavLink>
            <NavLink className={classes.link} to='/signup'> <Button className={classes.button} variant="contained">Signup</Button></NavLink>
            <NavLink className={classes.link} to='/logout'><Button className={classes.button} variant="contained">Logout</Button></NavLink>
        </Box>
    )
};

export default NavigationItems;