import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import CheckoutSummary from '../../components/order/checkoutSummary/checkoutSummary';
import ContactData from '../checkout/contactData/contactData';

class Checkout extends Component {

  checkoutCancelHandler = () => {
    this.props.history.goBack();
  }

  checkoutContinueHandler = () => {
    this.props.history.replace('/checkout/contact-data');
  }

  render() {
    let summary = <Redirect to="/" />;
    if (this.props.ings) {
      summary = (
        <div>
          {this.props.purchased ? <Redirect to="/" /> : null}
          <CheckoutSummary
            ingredients={this.props.ings}
            checkoutCancel={this.checkoutCancelHandler}
            checkoutContinue={this.checkoutContinueHandler} />
          <Route
            path={`${this.props.match.url}/contact-data`}
            component={ContactData}
          />
      </div>
      );
    }
    return summary;
  }
}

const mapStateToProps = state => {
  return {
    ings: state.burguer.ingredients,
    purchased: state.order.purchased
  }
}

export default connect(mapStateToProps)(Checkout);