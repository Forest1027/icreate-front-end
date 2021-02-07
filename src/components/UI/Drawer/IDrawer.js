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

const useStyles = makeStyles({
    list: {
        width: 250,
    },
    fullList: {
        width: 'auto',
    },
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
                        <ListItemText primary="My Articles"/>
                    </ListItem>
                    <ListItem button>
                        <ListItemIcon><AccountBoxIcon/></ListItemIcon>
                        <ListItemText primary="My Profile"/>
                    </ListItem>
                    <ListItem button>
                        <ListItemIcon><VpnKeyIcon/></ListItemIcon>
                        <ListItemText primary="Login"/>
                    </ListItem>
                    <ListItem button>
                        <ListItemIcon><LockIcon/></ListItemIcon>
                        <ListItemText primary="Signup"/>
                    </ListItem>
                    <ListItem button>
                        <ListItemIcon><ExitToAppIcon/></ListItemIcon>
                        <ListItemText primary="Logout"/>
                    </ListItem>
                </List>
            </div>
        </Drawer>
    );
};

export default IDrawer;