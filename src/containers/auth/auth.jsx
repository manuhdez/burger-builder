import React, { useState, useEffect } from 'react';
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

export const authContainer = props => {
    const initialFormState = {
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
        },
    }

    const [authForm, setAuthForm] = useState(initialFormState);
    const [ isFormValid, setIsFormValid ] = useState(false);
    const [ signupMode, setSignupMode ] = useState(true);

    useEffect(
        () => {
            if (!props.building && props.authRedirectPath !== '/') {
                props.onSetAuthRedirectPath('/');
            }
        }, []
    )

    const inputChangedHandler = (event, name) => {
        const updatedInputValue = updateObject(authForm[name], {
            value: event.target.value,
            valid: checkValidation(event.target.value, authForm[name].validation),
            touched: true,
        });
        const newAuthForm = updateObject(authForm, {
            [name]: updatedInputValue,
        });

        setAuthForm(newAuthForm);
        setIsFormValid(checkIfFormIsValid(newAuthForm));
    }

    const checkIfFormIsValid = (formData) => {
        const validInfo = [];
        for (let element in formData) {
            validInfo.push(formData[element].valid);
        }
        return validInfo.every(val => val);
    }

    const submitHandler = (e) => {
        e.preventDefault();
        props.onAuth({
            email: authForm.email.value,
            password: authForm.password.value,
            returnSecureToken: true
        }, signupMode);
    }

    const switchAuthMode = () => {
        setSignupMode(!signupMode);
    }

    if (props.isUserAuth) {
        return <Redirect to={props.authRedirectPath} />;
    }

    let formElementsArray = [];
    for (let key in authForm) {
        formElementsArray.push({
            id: key,
            config: authForm[key]
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
            changed={(event) => inputChangedHandler(event, element.id)}
        />
    ));

    if (props.loading) {
        formElements = <Spinner />;
    }

    let errorMessage = null;
    if (props.error) {
        errorMessage = <p>{props.error.message}</p>;
    }
    return (
        <div className={classes.Auth}>
            {errorMessage}
            <form onSubmit={submitHandler}>
                {formElements}
                <Button btnType="Success" disabled={!isFormValid}>
                    {signupMode ? 'Sign up' : 'Log in'}
                </Button>
            </form>
            <Button btnType="Danger" clicked={switchAuthMode}>
                {signupMode ? 'Log in' : 'Sign up'}
            </Button>
        </div>
    );
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

export default connect(mapStateToProps, mapDispatchToProps)(authContainer);
