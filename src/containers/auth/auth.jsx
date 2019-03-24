import React, { Component } from 'react';
import Input from '../../components/UI/input/input';
import Button from '../../components/UI/button/button';
import classes from './auth.css';
// Redux imports
import { connect } from 'react-redux';
import { auth } from '../../store/actions';

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

    checkValidation(value, rules) {
        let isValid = true;
    
        if (rules.required) {
          isValid = value.trim() !== '' && isValid;
        }
    
        if (rules.minLength) {
          isValid = value.length >= rules.minLength && isValid;
        }
    
        if (rules.maxLength) {
          isValid = value.length <= rules.maxLength && isValid;
        }

        if (rules.isEmail) {
            // eslint-disable-next-line no-useless-escape
            const emailRegex = /(.+)@(\w+)\.(.+)/;
            isValid = emailRegex.test(value) ? true : false;
        }
    
        return isValid;
    }

    inputChangedHandler = (event, name) => {
        const newAuthForm = {
            ...this.state.authForm,
            [name]: {
                ...this.state.authForm[name],
                value: event.target.value,
                valid: this.checkValidation(event.target.value, this.state.authForm[name].validation),
                touched: true,
            }
        };

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
        let formElementsArray = [];
        for (let key in this.state.authForm) {
            formElementsArray.push({
                id: key,
                config: this.state.authForm[key]
            });
        }

        const formElements = formElementsArray.map(element => (
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
        return (
            <div className={classes.Auth}>
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

const mapDispatchToProps = (dispatch) => {
    return {
        onAuth: (userData, signupMode) => dispatch(auth(userData, signupMode)),
    };
};

export default connect(null, mapDispatchToProps)(Auth);
