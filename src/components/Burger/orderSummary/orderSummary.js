import React, { Component } from 'react';
import Aux from '../../../hoc/aux/aux';
import Button from '../../UI/button/button';

class orderSummary extends Component {
  render () {
    const ingredientSummary = Object.keys(this.props.ingredients)
    .map( (igKey, index) => <li key={igKey + index}><span style={{textTransform: 'capitalize'}}>{igKey}:</span> {this.props.ingredients[igKey]}</li> );

    return (
      <Aux>
        <h3>Your order</h3>
        <p>A delicious burger with the following ingredients:</p>
        <ul>
          {ingredientSummary}
        </ul>
        <p><strong>Total Price: {this.props.price.toFixed(2)}</strong></p>
        <p>Continue to checkout?</p>
        <Button btnType="Danger" clicked={this.props.purchaseCanceled}>CANCEL</Button>
        <Button btnType="Success" clicked={this.props.purchaseContinued}>CONTINUE</Button>
      </Aux>
    );
  };
};

export default orderSummary;