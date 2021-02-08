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

const useStyles = makeStyles({
    list: {
        width: 250,
    },
    link: {
        textDecoration: 'none',
        color: '#660033'
    }
});

const IDrawer = (props) => {
    const classes = useStyles();

    return (
        <Drawer className={classes.drawer} anchor='left' open={props.status} onClose={props.close}>
            <div
                className={classes.list}
                role="presentation"
                onClick={props.close}
            >
                <List>
                    <ListItem button>
                        <ListItemIcon><DescriptionIcon/></ListItemIcon>
                        <NavLink className={classes.link} to='/articles'><ListItemText primary="My Articles"/></NavLink>
                    </ListItem>
                    <ListItem button>
                        <ListItemIcon><AccountBoxIcon/></ListItemIcon>
                        <NavLink className={classes.link} to='/profile'><ListItemText primary="My Profile"/></NavLink>
                    </ListItem>
                    <ListItem button>
                        <ListItemIcon><VpnKeyIcon/></ListItemIcon>
                        <NavLink className={classes.link} to='/login'><ListItemText primary="Login"/></NavLink>
                    </ListItem>
                    <ListItem button>
                        <ListItemIcon><LockIcon/></ListItemIcon>
                        <NavLink className={classes.link} to='/signup'><ListItemText primary="Signup"/></NavLink>
                    </ListItem>
                    <ListItem button>
                        <ListItemIcon><ExitToAppIcon/></ListItemIcon>
                        <NavLink className={classes.link} to='/logout'><ListItemText primary="Logout"/></NavLink>
                    </ListItem>
                </List>
            </div>
        </Drawer>
    );
};

export default IDrawer;