import React, {Component} from "react";
import Snackbar from "@material-ui/core/Snackbar";
import Aux from './Auxiliary';

const withErrorHandler = (WrappedComponent, axios) => {
    return class extends Component {
        state = {
            error: null
        }

        componentDidMount() {
            this.reqInterceptor = axios.interceptors.request.use(req => {
                this.setState({error: null})
                return req
            })
            this.resInterceptor = axios.interceptors.response.use(res=>res, error => {
                this.setState({error: error})
            })
        }

        componentWillUnmount() {
            axios.interceptors.request.eject(this.reqInterceptor);
            axios.interceptors.response.eject(this.resInterceptor);
        }

        errorConfirmedHandler = () => {
            this.setState({error: null});
        }

        render() {
            return (
                <Aux>
                    <Snackbar
                        anchorOrigin={{vertical: 'top', horizontal: 'center'}}
                        open={this.state.error}
                        onClose={this.errorConfirmedHandler}
                        message={this.state.error ? this.state.error.message : null}
                    />
                    <WrappedComponent {...this.props}/>
                </Aux>
            )
        }
    };
};

export default withErrorHandler;

