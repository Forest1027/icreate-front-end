import React, {Component} from 'react';
import {Route, Switch} from 'react-router-dom';
import './App.css';
import Introduction from "./components/Introduction/Introduction";
import Layout from "./containers/Layout/Layout";
import ArticleScreen from "./containers/Articles/ArticleScreen";
import ArticleDetail from "./components/Article/ArticleDetail/ArticleDetail";

class App extends Component{
    render() {
        return (
            <div className="App">
                <Layout>
                    <Switch>
                        <Route path="/" exact component={Introduction}/>
                        <Route path="/articles" exact component={ArticleScreen}/>
                        <Route path="/articleDetail" exact component={ArticleDetail}/>
                    </Switch>
                </Layout>
            </div>
        );
    };
}

export default App;
