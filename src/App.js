import React, { Component } from 'react';
import Layout from './hoc/layout/layout';
import BurgerBuilder from './containers/burgerBuilder/burgerBuilder';
import Checkout from './containers/checkout/checkout';

class App extends Component {

  render() {
    return (
      <div>
        <Layout>
          <BurgerBuilder />
          <Checkout />
        </Layout>
      </div>
    );
  }
}

export default App;
