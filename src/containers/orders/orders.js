import React, { Component } from 'react';
import axios from '../../axios-orders';
import Order from '../../components/order/order';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import Spinner from '../../components/UI/spinner/spinner';
import { connect } from 'react-redux';
import { fetchOrders } from '../../store/actions'

class Orders extends Component {

  componentDidMount() {
    this.props.onFetchOrders();
  }

  render() {
    return (
      <div>
        {
          this.props.loading
            ? <Spinner />
            : this.props.orders.map( order => <Order key={order.id} ingredients={order.ingredients} price={+order.price} />)
        }
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    orders: state.order.orders,
    loading: state.order.loading
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onFetchOrders: () => dispatch(fetchOrders())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));