import actionTypes from '../actions/actionTypes';
import { updateObject, updateIngredientState, setIngredients } from '../utility';

const { ADD_INGREDIENT, REMOVE_INGREDIENT, SET_INGREDIENTS, FETCH_INGREDIENTS_FAIL } = actionTypes;

const initialState = {
  ingredients: {
    salad: 0,
    bacon: 0,
    cheese: 0,
    meat: 0
  },
  error: false,
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
      return updateIngredientState(state, INGREDIENT_PRICES, action.ingredient, true);
    case REMOVE_INGREDIENT:
      return updateIngredientState(state, INGREDIENT_PRICES, action.ingredient, false);
    case SET_INGREDIENTS:
      return setIngredients(state, action);
    case FETCH_INGREDIENTS_FAIL:
      return updateObject(state, { error: true });
    default:
      return state;
  }
};

export default reducer;
