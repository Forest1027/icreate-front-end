import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import AcUnitIcon from '@material-ui/icons/AcUnit';

import NavigationItems from "../../NavigationItems/NavigationItems";

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

const IToolbar = props => {

    const classes = useStyles();

    return (
        <div className={classes.root}>
            <AppBar position="static" color="default">
                <Toolbar>
                    <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                        <AcUnitIcon/>
                        <Typography>ICreate</Typography>
                    </IconButton>

                    <NavigationItems/>
                </Toolbar>
            </AppBar>
        </div>
    );
}

export default IToolbar;