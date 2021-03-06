import React from "react";
import AcUnitIcon from "@material-ui/icons/AcUnit";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import {makeStyles} from "@material-ui/core/styles";
import {Box} from "@material-ui/core";
import {NavLink} from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    logo: {
        marginRight: theme.spacing(2),
        color: '#660033'
    },
    logoBox: {
        width: '100%'
    },
    link: {
        textDecoration: 'none',
    },
}));

const Logo = (props) => {
    const classes = useStyles();
    return (
        <Box display="flex" justifyContent={props.position} className={classes.logoBox}>
            <NavLink to="/" className = {classes.link}>
                <IconButton edge="start" className={classes.logo} aria-label="menu">
                    <AcUnitIcon/>
                    <Typography>ICreate</Typography>
                </IconButton>
            </NavLink>
        </Box>
    );
};

export default Logo;