import React, {Component} from "react";
import {connect} from "react-redux";
import CredentialForm from "../../components/Auth/CredentialForm";
import {updateObject} from "../../shared/utility";
import * as actions from "../../store/actions";
import Progress from "../../components/UI/Progress/Progress";
import {Redirect} from "react-router-dom";
import Aux from "../../hoc/Auxiliary";

class Signup extends Component {
    state = {
        email: {
            value: '',
            type: 'email',
            name: 'email',
            display: 'Email',
            placeholder: 'Your Email',
            validation: {
                required: true,
                isEmail: true
            }
        },
        password: {
            value: '',
            type: 'password',
            name: 'password',
            display: 'Password',
            placeholder: 'Your Password',
            validation: {
                required: true,
            }
        },
        confirmPassword: {
            value: '',
            type: 'password',
            name: 'confirmPassword',
            display: 'Confirm Password',
            placeholder: 'Confirm Password',
            validation: {
                required: true,
            }
        }
    };

    onInputChangeHandler = (event) => {
        const type = event.target.name;
        const inputVal = event.target.value;
        const updatedObj = updateObject(this.state, {
            [type]: updateObject(this.state[type], {value: inputVal})
        });
        this.setState(updatedObj);
    };

    onSubmitHandler = () => {
        console.log(this.state)
        this.props.onSubmit(this.state.email.value, this.state.password.value);
    };

    render() {
        let form = (<CredentialForm changed={this.onInputChangeHandler} submitted={this.onSubmitHandler}
                                    formData={this.state}/>);
        if (this.props.loading) {
            form = <Progress loading/>;
        }
        let authRedirect = null;
        if (this.props.isAuthenticated) {
            authRedirect = <Redirect to={this.props.authRedirectPath}/>
        }
        return (
            <Aux>
                {authRedirect}
                {form}
            </Aux>
        );
    };
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null,
        authRedirectPath: state.auth.authRedirectPath,
        loading: state.auth.loading,
        error: state.auth.error,
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onSubmit: (email, password) => dispatch(actions.auth(email, password, true))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Signup);