import React, { Component } from 'react';
import axios from '../../axios-orders';
import Order from '../../components/order/order';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
// import classes from './orders.css';

class Orders extends Component {

  state = {
    orders: [],
    loading: true
  }

  componentDidMount() {
    axios.get('/orders.json')
      .then( res => {
        const fetchedOrders = [];
        for (let key in res.data) {
          fetchedOrders.unshift({
            ...res.data[key],
            id: key
          });
        }

        this.setState({loading: false, orders: fetchedOrders});
      })
      .catch( err => this.setState({ loading: false}))
  }

  render() {
    return (
      <div>
        { this.state.orders.map( order => <Order key={order.id} ingredients={order.ingredients} price={+order.price} />)}
      </div>
    )
  }
}

export default withErrorHandler(Orders, axios);