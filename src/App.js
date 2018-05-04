import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import Layout from './hoc/layout/layout';
import BurgerBuilder from './containers/burgerBuilder/burgerBuilder';
import Checkout from './containers/checkout/checkout';
import Orders from './containers/orders/orders';

class App extends Component {

  render() {
    return (
      <div>
        <Layout>
          <Route path="/" exact component={BurgerBuilder}/>
          <Route path="/checkout" component={Checkout} />
          <Route path="/orders" component={Orders} />
        </Layout>
      </div>
    );
  }
}

export default App;
