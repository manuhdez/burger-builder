import React, { Component } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';

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
        <Switch>
          <Route path="/" exact component={BurgerBuilder}/>
          <Route path="/checkout" component={Checkout} />
          <Route path="/orders" component={Orders} />
          <Route path="/logout" component={Logout} />
        </Switch>
      );
    } else {
      appRoutes = (
        <Switch>
          <Route path="/" exact component={BurgerBuilder}/>
          <Route path="/auth" component={Auth} />
        </Switch>
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
