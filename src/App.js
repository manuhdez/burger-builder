import React, { useEffect, Fragment, lazy } from 'react';
import { Route, withRouter } from 'react-router-dom';

import Layout from './hoc/layout/layout';
import asyncComponent from './hoc/async/asyncComponent';
import BurgerBuilder from './containers/burgerBuilder/burgerBuilder';
import Auth from './containers/auth/auth';
import Logout from './containers/auth/logout/logout';
import { connect } from 'react-redux';
import { checkAuthState } from './store/actions';
// utility

// Async components
const Checkout = lazy(() => import('./containers/checkout/checkout'));
const Orders = lazy(() => import('./containers/orders/orders'));

const app = props => {

  useEffect(() => props.onAutoSignup(), []);

  let appRoutes = null;
  if (props.isUserAuth) {
    appRoutes = (
      <Fragment>
        <Route path="/" exact component={BurgerBuilder}/>
        <Route path="/checkout" render={(props) => asyncComponent(Checkout, props)} />
        <Route path="/orders" render={(props) => asyncComponent(Orders, props)} />
        <Route path="/auth" component={Auth} />
        <Route path="/logout" component={Logout} />
      </Fragment>
    );
  } else {
    appRoutes = (
      <Fragment>
        <Route path="/" exact component={BurgerBuilder}/>
        <Route path="/auth" component={Auth} />
      </Fragment>
    );
  }

  return (
    <div>
      <Layout>
          { appRoutes }
      </Layout>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    isUserAuth: state.auth.idToken ? true : false,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAutoSignup: () => dispatch(checkAuthState()),
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(app));
