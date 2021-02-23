import React, {Component} from "react";
import {connect} from "react-redux";
import {Redirect} from 'react-router-dom';
import CredentialForm from "../../components/Auth/CredentialForm";
import {checkValidity, updateObject} from "../../shared/utility";
import * as actions from "../../store/actions";
import Aux from '../../hoc/Auxiliary';
import Progress from "../../components/UI/Progress/Progress";

class Login extends Component {
    state = {
        element: {
            email: {
                value: '',
                type: 'email',
                name: 'email',
                display: 'Email',
                placeholder: 'Your Email',
                touched: false,
                valid: false,
                helpText: '',
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
                touched: false,
                valid: false,
                helpText: '',
                validation: {
                    required: true,
                }
            },
        },
        formIsValid: false
    };

    onInputChangeHandler = (event) => {
        const name = event.target.name;
        const inputVal = event.target.value;
        const errorArr = checkValidity(inputVal, this.state.element[name].validation)
        const helpText = errorArr.join(', ');
        const updatedObj = updateObject(this.state.element, {
            [name]: updateObject(this.state.element[name], {
                value: inputVal,
                touched: true,
                valid: errorArr.length===0,
                helpText: helpText
            })
        });
        let formValid = false;
        for (let key in updatedObj) {
            formValid = updatedObj[key].valid
        }
        this.setState({
            element: updatedObj,
            formIsValid: formValid});
    };

    onSubmitHandler = () => {
        this.props.onSubmit(this.state.element.email.value, this.state.element.password.value);
    };

    render() {
        let form = (<CredentialForm changed={this.onInputChangeHandler} submitted={this.onSubmitHandler}
                                    formData={this.state.element} formValid={this.state.formIsValid}/>);
        if(this.props.loading) {
            form = <Progress loading/>;
        }
        let authRedirect = null;
        if(this.props.isAuthenticated) {
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
        onSubmit: (email, password) => dispatch(actions.auth(email, password, false))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);