import React, { Component } from 'react';
import axios from '../../../axios-orders';
import Button from '../../../components/UI/button/button';
import Spinner from '../../../components/UI/spinner/spinner';
import Input from '../../../components/UI/input/input';
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
    .then( response => {
      this.setState({loading: false});
      this.props.history.push('/');
    })
    .catch( error => this.setState({loading: false}));
}

render() {
  let form = (
    <form action="">
      <Input inputtype="input" type="text" name="name" placeholder="Your name" />
      <Input inputtype="input" type="email" name="email" placeholder="Your email" />
      <Input inputtype="input" type="text" name="street" placeholder="Street" />
      <Input inputtype="input" type="text" name="postal" placeholder="Postal code" />
      <Button btnType="Success" clicked={this.orderHandler}>ORDER</Button>
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