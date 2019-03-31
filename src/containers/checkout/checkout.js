import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import CheckoutSummary from '../../components/order/checkoutSummary/checkoutSummary';
import ContactData from '../checkout/contactData/contactData';

export const Checkout = props => {

  const checkoutCancelHandler = () => {
    props.history.goBack();
  }

  const checkoutContinueHandler = () => {
    props.history.replace('/checkout/contact-data');
  }

  let summary = <Redirect to="/" />;
  if (props.ings) {
    summary = (
      <div>
        {props.purchased ? <Redirect to="/" /> : null}
        <CheckoutSummary
          ingredients={props.ings}
          checkoutCancel={checkoutCancelHandler}
          checkoutContinue={checkoutContinueHandler} />
        <Route
          path={`${props.match.url}/contact-data`}
          component={ContactData}
        />
    </div>
    );
  }
  return summary;
}

const mapStateToProps = state => {
  return {
    ings: state.burguer.ingredients,
    purchased: state.order.purchased
  }
}

export default connect(mapStateToProps)(Checkout);