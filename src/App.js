import React, {Component} from 'react';
import {Route, Switch, Redirect, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import './App.css';
import Introduction from "./components/Introduction/Introduction";
import Layout from "./containers/Layout/Layout";
import ArticleScreen from "./containers/Articles/ArticleScreen";
import ArticleDetail from "./containers/Articles/ArticleDetail";
import Signup from './containers/Auth/Signup';
import Login from './containers/Auth/Login';
import Logout from "./containers/Auth/Logout";
import * as actions from './store/actions/index';


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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
