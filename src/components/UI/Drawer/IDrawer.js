import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DescriptionIcon from '@material-ui/icons/Description';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import LockIcon from '@material-ui/icons/Lock';
import {NavLink} from "react-router-dom";
import Aux from '../../../hoc/Auxiliary';
import * as layoutConstants from "../../../constants/LayoutConstants";

const useStyles = makeStyles({
    list: {
        width: 250,
    },
    link: {
        textDecoration: 'none',
        color: '#660033'
    }
});

const listIcon = (icon) => {
    switch (icon) {
        case layoutConstants.MY_ARTICLE_ICON:
            return (<DescriptionIcon/>);
        case layoutConstants.MY_PROFILE_ICON:
            return (<AccountBoxIcon/>);
        case layoutConstants.LOGIN_ICON:
            return (<VpnKeyIcon/>);
        case layoutConstants.SIGNUP_ICON:
            return (<LockIcon/>);
        case layoutConstants.LOGOUT_ICON:
            return (<ExitToAppIcon/>);
        default:
            return (<Aux/>);
    }
};

const IDrawer = (props) => {
    const classes = useStyles();
    const navListItems = (
        <Aux>
            {
                Object.keys(props.navItems).map(btnName => (
                    <ListItem button key={btnName}>
                        <ListItemIcon>{listIcon(props.navItems[btnName].icon)}</ListItemIcon>
                        <NavLink className={classes.link} to={props.navItems[btnName].url}><ListItemText primary={btnName}/></NavLink>
                    </ListItem>
                ))
            }
        </Aux>
    );

    return (
        <Drawer className={classes.drawer} anchor='left' open={props.status} onClose={props.close}>
            <div
                className={classes.list}
                role="presentation"
                onClick={props.close}
            >
                <List>
                    {navListItems}
                </List>
            </div>
        </Drawer>
    );
};

export default IDrawer;