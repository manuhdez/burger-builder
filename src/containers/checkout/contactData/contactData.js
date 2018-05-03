import React, { Component } from 'react';
import axios from '../../../axios-orders';
import Button from '../../../components/UI/button/button';
import classes from './contactData.css';

class ContactData extends Component {
state = {
  name: '',
  email: '',
  address: {
    street: '',
    postalCode: ''
  },
  loading: false
}

orderHandler = (event) => {
  event.preventDefault();

  this.setState({loading: true});

  const order = {
    ingredients: this.props.ingredients,
    price: this.props.price,
    customer: {
      name: 'Manu Hdez',
      address: {
        street: 'Paseo del Prado, 23',
        zipCode: '35210',
        country: 'Spain'
      },
      email: 'test@test.com',
    },
    deliveryMethod: 'fastest'
  };

  axios.post('/orders.json', order)
    .then( response => this.setState({loading: false}))
    .catch( error => this.setState({loading: false}));
}

render() {
  return (
    <div className={classes.ContactData}>
      <h4>Enter your contact data</h4>
      <form action="">
        <input className={classes.Input} type="text" name="name" placeholder="Your name" />
        <input className={classes.Input} type="email" name="email" placeholder="Your email" />
        <input className={classes.Input} type="text" name="street" placeholder="Street" />
        <input className={classes.Input} type="text" name="postal" placeholder="Postal code" />
        <Button btnType="Success" clicked={this.orderHandler}>ORDER</Button>
      </form>
    </div>
  );
}
}

export default ContactData;