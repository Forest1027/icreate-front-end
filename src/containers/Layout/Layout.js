import React, {Component} from "react";
import {connect} from 'react-redux';
import IToolbar from "../../components/UI/Toolbar/IToolbar";
import IDrawer from "../../components/UI/Drawer/IDrawer";
import * as layoutConstants from "../../constants/LayoutConstants";

class Layout extends Component{
    state = {
        showDrawer : false,
        navItems:{
            "My Articles" : {
                "isAuth":true,
                "url":layoutConstants.MY_ARTICLE_URL,
                "icon":layoutConstants.MY_ARTICLE_ICON
            },
            "My Profile" : {
                "isAuth":true,
                "url":layoutConstants.MY_PROFILE_URL,
                "icon":layoutConstants.MY_PROFILE_ICON
            },
            "Login" : {
                "isAuth":false,
                "url":layoutConstants.LOGIN_URL,
                "icon":layoutConstants.LOGIN_ICON
            },
            "Signup" : {
                "isAuth":false,
                "url":layoutConstants.SIGNUP_URL,
                "icon":layoutConstants.SIGNUP_ICON
            },
            "Logout": {
                "isAuth":true,
                "url":layoutConstants.LOGOUT_URL,
                "icon":layoutConstants.LOGOUT_ICON
            }
        }
    }

    isAuthenticated = !localStorage.getItem('token');

    componentDidMount() {
        console.log('layout')
        console.log(this.props.isAuthenticated)
        console.log(this.state)
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
                <IToolbar open={this.drawerOpenHandler} navItems={this.state.navItems} isAuth={this.props.isAuthenticated}/>
                <IDrawer status={this.state.showDrawer} close={this.drawerCloseHandler} navItems={this.state.navItems}/>
                <main>
                    {this.props.children}
                </main>
            </div>
        );
    };

}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token != null
    }
}

export default connect(mapStateToProps)(Layout);