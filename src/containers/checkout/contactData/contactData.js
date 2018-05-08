import React, { Component } from 'react';
import axios from '../../../axios-orders';
import Button from '../../../components/UI/button/button';
import Spinner from '../../../components/UI/spinner/spinner';
import Input from '../../../components/UI/input/input';
import classes from './contactData.css';

class ContactData extends Component {

state = {
  orderForm: {
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
      validation: {
        required: true
      }
    }
    },
    loading: false
  }

orderHandler = (event) => {
  event.preventDefault();

  this.setState({loading: true});
  const formData = {};
  for (let formEl in this.state.orderForm) {
    formData[formEl] = this.state.orderForm[formEl].value;
  }

  const order = {
    ingredients: this.props.ingredients,
    price: this.props.price,
    orderData: formData
  };

  axios.post('/orders.json', order)
    .then( response => {
      this.setState({loading: false});
      this.props.history.push('/');
    })
    .catch( error => this.setState({loading: false}));
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

  return isValid;
}

inputChangedHandler = (event, inputIdentifier) => {
  const newOrderForm = {...this.state.orderForm};
  const newInputValue = {...newOrderForm[inputIdentifier]};

  newInputValue.value = event.target.value;
  newInputValue.valid = this.checkValidation(newInputValue.value, newInputValue.validation);
  newInputValue.touched = true;
  newOrderForm[inputIdentifier] = newInputValue;

  this.setState({
    orderForm: newOrderForm
  });
}

render() {

  let formElements = [];
  for (let key in this.state.orderForm) {
    formElements.push({
      id: key,
      config: this.state.orderForm[key]
    });
  }

  let form = (
    <form onSubmit={this.orderHandler}>
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
              changed={(event) => this.inputChangedHandler(event, formElement.id)}
            />
          );
        })
      }
      <Button btnType="Success">ORDER</Button>
    </form>
  );

  if (this.state.loading) {
    form = <Spinner />;
  }

  return (
    <div className={classes.ContactData}>
      <h4>Enter your contact data</h4>
      { form }
    </div>
  );
}
}

export default ContactData;