import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import MenuIcon from '@material-ui/icons/Menu';
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import {NavLink} from "react-router-dom";

import Logo from "../../Logo/Logo";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
        color: '#660033'
    },
    title: {
        flexGrow: 1,
    },
    buttonRoot: {
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

const IToolbar = (props) => {
    const matches = useMediaQuery('(min-width: 550px)')
    const classes = useStyles();
    const navButtons = (
        <Box className={classes.buttonRoot} display="flex" justifyContent="flex-end">
            {
                Object.keys(props.navItems).map(btnName => (
                    <NavLink className={classes.link} to={props.navItems[btnName].url} key={btnName}><Button className={classes.button} variant="contained">{btnName}</Button></NavLink>
                ))
            }
        </Box>
    );
    return (
        <div className={classes.root}>
            <AppBar position="static" color="default">
                <Toolbar>
                    {matches ? <Logo/> : <MenuIcon onClick={props.open}/>}
                    {matches ? navButtons : <Logo position="flex-end"/>}
                </Toolbar>
            </AppBar>
        </div>
    );
}

export default IToolbar;