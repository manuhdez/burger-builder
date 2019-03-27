import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Input from '../../components/UI/input/input';
import Button from '../../components/UI/button/button';
import Spinner from '../../components/UI/spinner/spinner';
import classes from './auth.css';
// Redux imports
import { connect } from 'react-redux';
import { auth, setRedirectPath } from '../../store/actions';
// utilities
import { updateObject, checkValidation } from '../../shared/utility';

class Auth extends Component {
    state = {
        authForm: {
            email: {
                elementType: 'input',
                elementConfig: {
                  type: 'email',
                  placeholder: 'Email address'
                },
                value: '',
                validation: {
                  required: true,
                  isEmail: true
                },
                valid: false,
                touched: false
              },
            password: {
                elementType: 'input',
                elementConfig: {
                  type: 'password',
                  placeholder: 'Password'
                },
                value: '',
                validation: {
                  required: true,
                  minLength: 6
                },
                valid: false,
                touched: false
              },
        },
        isFormValid: false,
        signupMode: true
    }

    componentDidMount() {
        if (!this.props.building && this.props.authRedirectPath !== '/') {
            this.props.onSetAuthRedirectPath('/');
        }
    }

    inputChangedHandler = (event, name) => {
        const updatedInputValue = updateObject(this.state.authForm[name], {
            value: event.target.value,
            valid: checkValidation(event.target.value, this.state.authForm[name].validation),
            touched: true,
        });
        const newAuthForm = updateObject(this.state.authForm, {
            [name]: updatedInputValue,
        });

        this.setState({
            authForm: newAuthForm,
            isFormValid: this.checkIfFormIsValid(newAuthForm)
        });
    }

    checkIfFormIsValid = (formData) => {
        const validInfo = [];
        for (let element in formData) {
            validInfo.push(formData[element].valid);
        }
        return validInfo.every(val => val);
    }

    submitHandler = (e) => {
        e.preventDefault();
        this.props.onAuth({
            email: this.state.authForm.email.value,
            password: this.state.authForm.password.value,
            returnSecureToken: true
        }, this.state.signupMode);
    }

    switchAuthMode = () => {
        this.setState((prevState) => {
            return { signupMode: !prevState.signupMode }
        });
    }

    render() {
        if (this.props.isUserAuth) {
            return <Redirect to={this.props.authRedirectPath} />;
        }

        let formElementsArray = [];
        for (let key in this.state.authForm) {
            formElementsArray.push({
                id: key,
                config: this.state.authForm[key]
            });
        }

        let formElements = formElementsArray.map(element => (
            <Input
                key={element.id}
                elementType={element.config.elementType}
                elementConfig={element.config.elementConfig}
                value={element.config.value}
                invalid={!element.config.valid}
                shouldValidate={element.config.validation}
                touched={element.config.touched}
                changed={(event) => this.inputChangedHandler(event, element.id)}
            />
        ));

        if (this.props.loading) {
            formElements = <Spinner />;
        }

        let errorMessage = null;
        if (this.props.error) {
            errorMessage = <p>{this.props.error.message}</p>;
        }
        return (
            <div className={classes.Auth}>
                {errorMessage}
                <form onSubmit={this.submitHandler}>
                    {formElements}
                    <Button btnType="Success" disabled={!this.state.isFormValid}>
                        {this.state.signupMode ? 'Sign up' : 'Log in'}
                    </Button>
                </form>
                <Button btnType="Danger" clicked={this.switchAuthMode}>
                    {this.state.signupMode ? 'Log in' : 'Sign up'}
                </Button>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        isUserAuth: state.auth.idToken ? true : false,
        building: state.burguer.building,
        authRedirectPath: state.auth.authRedirectPath
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onAuth: (userData, signupMode) => dispatch(auth(userData, signupMode)),
        onSetAuthRedirectPath: (path) => dispatch(setRedirectPath(path)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
