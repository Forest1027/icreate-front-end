import React, {Component} from "react";
import IToolbar from "../../components/UI/Toolbar/IToolbar";
import IDrawer from "../../components/UI/Drawer/IDrawer";

class Layout extends Component{
    state = {
        showDrawer : false
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
                <IToolbar open={this.drawerOpenHandler}/>
                <IDrawer status={this.state.showDrawer} close={this.drawerCloseHandler}/>
                <main>
                    {this.props.children}
                </main>
            </div>
        );
    };

}

export default Layout;