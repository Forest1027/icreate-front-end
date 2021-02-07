import React from "react";
import {makeStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
        },
        width: '100%'
    },
    button: {
        backgroundColor: '#660033',
        color:'white'
    }
}));

const NavigationItems = props => {
    const classes = useStyles();

    return (
        <Box className={classes.root} display="flex" justifyContent="flex-end">
            <Button className={classes.button} variant="contained">My Articles</Button>
            <Button className={classes.button} variant="contained">My Profile</Button>
            <Button className={classes.button} variant="contained">Login</Button>
            <Button className={classes.button} variant="contained">Signup</Button>
            <Button className={classes.button} variant="contained">Logout</Button>
        </Box>
    )
};

export default NavigationItems;