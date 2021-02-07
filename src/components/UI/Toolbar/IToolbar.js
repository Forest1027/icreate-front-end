import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';

import NavigationItems from "../../NavigationItems/NavigationItems";
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
}));

const IToolbar = () => {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <AppBar position="static" color="default">
                <Toolbar>
                    <Logo/>
                    <NavigationItems/>
                </Toolbar>
            </AppBar>
        </div>
    );
}

export default IToolbar;