import React, { Component, Fragment } from 'react';
import { Route, withRouter } from 'react-router-dom';

import Layout from './hoc/layout/layout';
import BurgerBuilder from './containers/burgerBuilder/burgerBuilder';
import Checkout from './containers/checkout/checkout';
import Orders from './containers/orders/orders';
import Auth from './containers/auth/auth';
import Logout from './containers/auth/logout/logout';
import { connect } from 'react-redux';
import { checkAuthState } from './store/actions';

class App extends Component {

  componentDidMount() {
    this.props.onAutoSignup();
  }

  render() {
    let appRoutes = null;
    if (this.props.isUserAuth) {
      appRoutes = (
        <Fragment>
          <Route path="/" exact component={BurgerBuilder}/>
          <Route path="/checkout" component={Checkout} />
          <Route path="/orders" component={Orders} />
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
