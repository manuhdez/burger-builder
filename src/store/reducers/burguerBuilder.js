import actionTypes from '../actions/actionTypes';

const { ADD_INGREDIENT, REMOVE_INGREDIENT } = actionTypes;

const initialState = {
  ingredients: {
    bacon: 0,
    cheese: 0,
    salad: 0,
    meat: 0
  },
  totalPrice: 4
};

const INGREDIENT_PRICES = {
  salad: 0.4,
  cheese: 0.3,
  bacon: 0.7,
  meat: 1.3
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_INGREDIENT:
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.ingredient]: state.ingredients[action.ingredient] + 1
        },
        totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredient]
      }
    case REMOVE_INGREDIENT:
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.ingredient]: state.ingredients[action.ingredient] - 1
        },
        totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredient]
      }
    default:
      return state;
  }
};

export default reducer;
