import React, {Component} from "react";
import IToolbar from "../../components/UI/Toolbar/IToolbar";
import IDrawer from "../../components/UI/Drawer/IDrawer";

class Layout extends Component{
    state = {
        showDrawer : false,
        navItems:{
            "My Articles" : {
                "isAuth":true,
                "url":"/articles",
                "icon":"DescriptionIcon"
            },
            "My Profile" : {
                "isAuth":true,
                "url":"/profile",
                "icon":"AccountBoxIcon"
            },
            "Login" : {
                "isAuth":true,
                "url":"/login",
                "icon":"VpnKeyIcon"
            },
            "Signup" : {
                "isAuth":true,
                "url":"/signup",
                "icon":"LockIcon"
            },
            "Logout" : {
                "isAuth":true,
                "url":"/logout",
                "icon":"ExitToAppIcon"
            }
        }
    }

    drawerCloseHandler = () => {
        this.setState({showDrawer : false});
    }

    drawerOpenHandler = () => {
        this.setState({showDrawer : true});
    }

    render() {
        return (
            <div>
                <IToolbar open={this.drawerOpenHandler} navItems={this.state.navItems}/>
                <IDrawer status={this.state.showDrawer} close={this.drawerCloseHandler}/>
                <main>
                    {this.props.children}
                </main>
            </div>
        );
    };

}

export default Layout;