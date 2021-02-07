import React from "react";
import AcUnitIcon from "@material-ui/icons/AcUnit";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    logo: {
        marginRight: theme.spacing(2),
        color: '#660033'
    },
}));

const Logo = () => {
    const classes = useStyles();
    return (
        <IconButton edge="start" className={classes.logo} aria-label="menu">
            <AcUnitIcon/>
            <Typography>ICreate</Typography>
        </IconButton>
    );
};

export default Logo;