import React, { useState } from 'react';
import { connect } from 'react-redux';

import axios from '../../../axios-orders';
import Button from '../../../components/UI/button/button';
import Spinner from '../../../components/UI/spinner/spinner';
import Input from '../../../components/UI/input/input';
import classes from './contactData.css';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
// Redux actions
import { purchaseBurguer } from '../../../store/actions';
// Utilities
import { updateObject, checkValidation } from '../../../shared/utility';

export const contactData = props => {

  const [orderForm, setOrderForm] = useState({
    name: {
      elementType: 'input',
      elementConfig: {
        type: 'text',
        placeholder: 'Your name'
      },
      value: '',
      validation: {
        required: true
      },
      valid: false,
      touched: false
    },
    street: {
      elementType: 'input',
      elementConfig: {
        type: 'text',
        placeholder: 'Street'
      },
      value: '',
      validation: {
        required: true
      },
      valid: false,
      touched: false
    },
    zipCode: {
      elementType: 'input',
      elementConfig: {
        type: 'text',
        placeholder: 'ZIP Code'
      },
      value: '',
      validation: {
        required: true,
        minLength: 5,
        maxLength: 5
      },
      valid: false,
      touched: false
    },
    country: {
      elementType: 'input',
      elementConfig: {
        type: 'text',
        placeholder: 'Country'
      },
      value: '',
      validation: {
        required: true
      },
      valid: false,
      touched: false
    },
    email: {
      elementType: 'input',
      elementConfig: {
        type: 'email',
        placeholder: 'Your Email'
      },
      value: '',
      validation: {
        required: true
      },
      valid: false,
      touched: false
    },
    deliveryMethod: {
      elementType: 'select',
      elementConfig: {
        options: [
          {value: 'fastest', displayValue: 'Fastest'},
          {value: 'cheapest', displayValue: 'Cheapest'}
        ]
      },
      value: 'fastest',
      validation: {},
      valid: true
    },
  });
  const [formIsValid, setFormIsValid] = useState(false);

  const orderHandler = (event) => {
    event.preventDefault();

    const formData = {};
    for (let formEl in orderForm) {
      formData[formEl] = orderForm[formEl].value;
    }

    const order = {
      ingredients: props.ings,
      price: props.tPrice,
      orderData: formData,
      userId: props.userId
    };

    props.onBurguerPurchase(order, props.token);
  }

  const inputChangedHandler = (event, inputIdentifier) => {
    const newInputValue = updateObject(orderForm[inputIdentifier], {
      value: event.target.value,
      valid: checkValidation(event.target.value, orderForm[inputIdentifier].validation),
      touched: true,
    });

    const newOrderForm = updateObject(orderForm, {
      [inputIdentifier]: newInputValue,
    });

    let formIsValid = true;
    for (let inputField in newOrderForm) {
      formIsValid = newOrderForm[inputField].valid && formIsValid;
    }

    setOrderForm(newOrderForm);
    setFormIsValid(formIsValid);
  }

  let formElements = [];
  for (let key in orderForm) {
    formElements.push({
      id: key,
      config: orderForm[key]
    });
  }

  let form = (
    <form onSubmit={orderHandler}>
      {
        formElements.map( formElement => {
          return (
            <Input
              key={formElement.id}
              elementType={formElement.config.elementType}
              elementConfig={formElement.config.elementConfig}
              value={formElement.config.value}
              invalid={!formElement.config.valid}
              shouldValidate={formElement.config.validation}
              touched={formElement.config.touched}
              changed={(event) => inputChangedHandler(event, formElement.id)}
            />
          );
        })
      }
      <Button btnType="Success" disabled={!formIsValid}>ORDER</Button>
    </form>
  );

  if (props.loading) {
    form = <Spinner />;
  }

  return (
    <div className={classes.ContactData}>
      <h4>Enter your contact data</h4>
      { form }
    </div>
  );
}

const mapStateToProps = state => {
  return {
    ings: state.burguer.ingredients,
    tPrice: state.burguer.totalPrice,
    loading: state.order.loading,
    token: state.auth.idToken,
    userId: state.auth.userId
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onBurguerPurchase: (orderData, token) => dispatch(purchaseBurguer(orderData, token)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(contactData, axios));