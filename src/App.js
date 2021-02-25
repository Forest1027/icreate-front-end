import React, {Component} from 'react';
import {Route, Switch, Redirect, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import './App.css';
import Introduction from "./components/Introduction/Introduction";
import Layout from "./containers/Layout/Layout";
import * as actions from './store/actions/index';
import axios from './axios-url';
import withErrorHandler from "./hoc/withErrorHandler";
import Login from "./containers/Auth/Login";
import Logout from "./containers/Auth/Logout";
import Signup from "./containers/Auth/Signup";
import ArticleScreen from "./containers/Articles/ArticleScreen";
import ArticleDetail from "./containers/Articles/ArticleDetail";

// const Login = React.lazy(() => {
//     import ('./containers/Auth/Login');
// });
//
// const Signup = React.lazy(() => {
//     import('./containers/Auth/Signup');
// });
//
// const ArticleScreen = React.lazy(() => {
//     import("./containers/Articles/ArticleScreen");
// })
//
// const ArticleDetail = React.lazy(() => {
//     import("./containers/Articles/ArticleDetail");
// })
//
// const Logout = React.lazy(() => {
//     import("./containers/Auth/Logout");
// })

class App extends Component {

    constructor(props) {
        super(props);
        this.props.onTryAutoSignup();
    }

    render() {
        let routes = (
            <Switch>
                <Route path="/" exact component={Introduction}/>
                <Route path="/login" exact component={Login}/>
                <Route path="/signup" exact component={Signup}/>
                <Redirect to='/'/>
            </Switch>
        );

        if (this.props.isAuthenticated) {
            routes = (
                <Switch>
                    <Route path="/" exact component={Introduction}/>
                    <Route path="/articles" exact component={ArticleScreen}/>
                    <Route path="/articleDetail" exact component={ArticleDetail}/>
                    <Route path="/logout" exact component={Logout}/>
                    <Redirect to='/'/>
                </Switch>
            );
        }
        return (
            <div className="App">
                <Layout>
                    {routes}
                </Layout>
            </div>
        );
    };
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token != null
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onTryAutoSignup : () => dispatch(actions.authCheckState())
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(App, axios)));
