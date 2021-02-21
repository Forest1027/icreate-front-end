import React, {Component} from 'react';
import {Route, Switch} from 'react-router-dom';
import './App.css';
import Introduction from "./components/Introduction/Introduction";
import Layout from "./containers/Layout/Layout";
import ArticleScreen from "./containers/Articles/ArticleScreen";
import ArticleDetail from "./containers/Articles/ArticleDetail";
import Signup from './containers/Auth/Signup';
// import Login from './containers/Auth/Login';


class App extends Component {
    render() {
        return (
            <div className="App">
                <Layout>
                    <Switch>
                        <Route path="/" exact component={Introduction}/>
                        <Route path="/articles" exact component={ArticleScreen}/>
                        <Route path="/articleDetail" exact component={ArticleDetail}/>
                        <Route path="/signup" exact component={Signup}/>
                        {/*<Route path="/login" exact component={Login}/>*/}
                    </Switch>
                </Layout>
            </div>
        );
    };
}

export default App;
