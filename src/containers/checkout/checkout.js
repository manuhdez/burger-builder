import React, { Component } from 'react';
import {Route} from 'react-router-dom';
import { connect } from 'react-redux';

import CheckoutSummary from '../../components/order/checkoutSummary/checkoutSummary';
import ContactData from '../checkout/contactData/contactData';

class Checkout extends Component {
  // state = {
  //   ingredients: null,
  //   price: 0
  // }
  // componentWillMount() {
  //   const query = new URLSearchParams(this.props.location.search);
  //   const ingredients = {};
  //   let price = 0;

  //   for (let param of query.entries()) {
  //     if (param[0] === 'price') {
  //       price = param[1];
  //     } else {
  //       ingredients[param[0]] = +param[1];
  //     }
  //   }
  //   this.setState({ ingredients: ingredients, price: price });
  // }

  checkoutCancelHandler = () => {
    this.props.history.goBack();
  }

  checkoutContinueHandler = () => {
    this.props.history.replace('/checkout/contact-data');
  }

  render() {
    return (
      <div>
        <CheckoutSummary
          ingredients={this.props.ings}
          checkoutCancel={this.checkoutCancelHandler}
          checkoutContinue={this.checkoutContinueHandler} />
        <Route
          path={`${this.props.match.url}/contact-data`}
          component={ContactData}
        />
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    ings: state.ingredients
  }
}

export default connect(mapStateToProps)(Checkout);