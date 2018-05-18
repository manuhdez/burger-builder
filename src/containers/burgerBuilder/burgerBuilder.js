import React, { Component } from 'react';
import { connect } from 'react-redux';

import Aux from '../../hoc/aux/aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/buildControls/buildControls';
import Modal from '../../components/UI/modal/modal';
import OrderSummary from '../../components/Burger/orderSummary/orderSummary';
import Spinner from '../../components/UI/spinner/spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../axios-orders';
import * as actionTypes from '../../store/actions';

// const INGREDIENT_PRICES = {
//   salad: 0.4,
//   cheese: 0.3,
//   bacon: 0.7,
//   meat: 1.3
// }

class BurgerBuilder extends Component {

  state = {
    // ingredients: null,
    totalPrice: 4,
    purchasable: false,
    purchasing: false,
    loading: false,
    error: false
  }

  componentDidMount = () => {
    // axios.get('https://react-burger-5b183.firebaseio.com/ingredients.json')
    //   .then(response => this.setState({ingredients: response.data}))
    //   .catch(error => this.setState({error: true}));
  }

  updatePurchaseState(ingredients) {
    const sum = Object.keys(ingredients)
      .map( igKey => ingredients[igKey] )
      .reduce((sum, el) => sum + el , 0);

    this.setState({ purchasable: sum > 0 });
  }

  // addIngredientHandler = (type) => {
  //   const oldCount = this.state.ingredients[type];
  //   const newCount = oldCount + 1;
  //   const updateIngredients = { ...this.state.ingredients };
  //   updateIngredients[type] = newCount;

  //   const addPrice = INGREDIENT_PRICES[type];
  //   const oldPrice = this.state.totalPrice;
  //   const newPrice = oldPrice + addPrice;

  //   this.setState({ totalPrice: newPrice, ingredients:  updateIngredients});
  //   this.updatePurchaseState(updateIngredients);
  // };

  // removeIngredientHandler = (type) => {
  //   const oldCount = this.state.ingredients[type];
  //   if (oldCount <= 0) {
  //     return;
  //   }
  //   const newCount = oldCount - 1;
  //   const updateIngredients = { ...this.state.ingredients };
  //   updateIngredients[type] = newCount;

  //   const removePrice = INGREDIENT_PRICES[type];
  //   const oldPrice = this.state.totalPrice;
  //   const newPrice = oldPrice - removePrice;

  //   this.setState({ totalPrice: newPrice, ingredients:  updateIngredients});
  //   this.updatePurchaseState(updateIngredients);
  // };

  purchaseHandler = () => {
    this.setState({ purchasing: true });
  }

  purchaseCancelHandler = () => {
    this.setState({ purchasing: false });
  };

  purchaseContinueHandler = () => {
    const queryParams = [];

    for (let ingredient in this.props.ings) {
      queryParams.push(encodeURIComponent(ingredient) + '=' + encodeURIComponent(this.props.ings[ingredient]));
    }
    queryParams.push('price=' + this.state.totalPrice);

    this.props.history.push({
      pathname: '/checkout',
      search: '?' + queryParams.join('&')
    });
  };

  render() {
    const disabledInfo = { ...this.props.ings };
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }


    let orderSummary = null;
    let burger = this.state.error ? <p style={{textAlign: 'center'}}>Ingredients can't be loaded</p> : <Spinner />;

    if (this.props.ings){
      burger = (
        <Aux>
          <Burger ingredients={this.props.ings} />
          <BuildControls
          ingredientAdded={this.props.onIngredientAdded}
          ingredientRemoved={this.props.onIngredientRemoved}
          disabled={disabledInfo}
          purchasable={this.state.purchasable}
          ordered={this.purchaseHandler}
          price={this.state.totalPrice} />
        </Aux>
      );

      orderSummary = <OrderSummary
        ingredients={this.props.ings}
        price={this.state.totalPrice}
        purchaseCanceled={this.purchaseCancelHandler}
        purchaseContinued={this.purchaseContinueHandler} />;
    }

    if (this.state.loading) {
      orderSummary = <Spinner />;
    }

    return (
      <Aux>
        <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
          {orderSummary}
        </Modal>
        {burger}
      </Aux>
    );
  }
}

const mapStateToProps = state => {
  return {
    ings: state.ingredients
  }
};

const mapDispatchToProps = dispatch => {
  return {
    onIngredientAdded: (ingName) => dispatch({type: actionTypes.ADD_INGREDIENT, ingredientName: ingName}),
    onIngredientRemoved: (ingName) => dispatch({type: actionTypes.REMOVE_INGREDIENT, ingredientName: ingName})
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));