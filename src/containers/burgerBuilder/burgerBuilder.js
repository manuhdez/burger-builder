import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import Aux from '../../hoc/aux/aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/buildControls/buildControls';
import Modal from '../../components/UI/modal/modal';
import OrderSummary from '../../components/Burger/orderSummary/orderSummary';
import Spinner from '../../components/UI/spinner/spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../axios-orders';
import { addIngredient, removeIngredient, fetchIngredients, purchaseInit, setRedirectPath } from '../../store/actions/index';

export const burgerBuilder = props => {

  const [ purchasing, setPurchasing ] = useState(false);

  useEffect(
    () => {
      if (!props.ings) {
        props.fetchIngredients();
      }
    }, []
  );

  const updatePurchaseState = (ingredients) => {
    const sum = Object.keys(ingredients)
      .map( igKey => ingredients[igKey] )
      .reduce((sum, el) => sum + el , 0);

    return sum > 0;
  }

  const purchaseHandler = () => {
    if (props.isUserAuth) {
      setPurchasing(true);
    } else {
      props.onSetAuthRedirectPath('/checkout');
      props.history.push('/auth');
    }
  }

  const purchaseCancelHandler = () => {
    setPurchasing(false);
  };

  const purchaseContinueHandler = () => {
    props.onInitPurchase();
    props.history.push('/checkout');
  };

  const disabledInfo = { ...props.ings };
  for (let key in disabledInfo) {
    disabledInfo[key] = disabledInfo[key] <= 0;
  }


  let orderSummary = null;
  let burger = props.error ? <p style={{textAlign: 'center'}}>Ingredients can't be loaded</p> : <Spinner />;

  if (props.ings){
    burger = (
      <Aux>
        <Burger ingredients={props.ings} />
        <BuildControls
        isUserAuth={props.isUserAuth}
        ingredientAdded={props.onIngredientAdded}
        ingredientRemoved={props.onIngredientRemoved}
        disabled={disabledInfo}
        purchasable={updatePurchaseState(props.ings)}
        ordered={purchaseHandler}
        price={props.tPrice} />
      </Aux>
    );

    orderSummary = <OrderSummary
      ingredients={props.ings}
      price={props.tPrice}
      purchaseCanceled={purchaseCancelHandler}
      purchaseContinued={purchaseContinueHandler} />;
  }

  return (
    <Aux>
      <Modal show={purchasing} modalClosed={purchaseCancelHandler}>
        {orderSummary}
      </Modal>
      {burger}
    </Aux>
  );
}

const mapStateToProps = state => {
  return {
    ings: state.burguer.ingredients,
    error: state.burguer.error,
    tPrice: state.burguer.totalPrice,
    isUserAuth: state.auth.idToken ? true : false
  }
};

const mapDispatchToProps = dispatch => {
  return {
    onIngredientAdded: (ingName) => dispatch(addIngredient(ingName)),
    onIngredientRemoved: (ingName) => dispatch(removeIngredient(ingName)),
    fetchIngredients: () => dispatch(fetchIngredients()),
    onInitPurchase: () => dispatch(purchaseInit()),
    onSetAuthRedirectPath: (path) => dispatch(setRedirectPath(path)),
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(burgerBuilder, axios));