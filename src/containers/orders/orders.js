import React, { useEffect } from 'react';
import axios from '../../axios-orders';
import Order from '../../components/order/order';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import Spinner from '../../components/UI/spinner/spinner';
import { connect } from 'react-redux';
import { fetchOrders } from '../../store/actions'

export const Orders = props => {

  useEffect(
    () => {
      props.onFetchOrders(props.token, props.userId);
    }, []
  );

  return (
    <div>
      {
        props.loading
          ? <Spinner />
          : props.orders.map( order => <Order key={order.id} ingredients={order.ingredients} price={+order.price} />)
      }
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    orders: state.order.orders,
    loading: state.order.loading,
    token: state.auth.idToken,
    userId: state.auth.userId
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onFetchOrders: (token, userId) => dispatch(fetchOrders(token, userId))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));