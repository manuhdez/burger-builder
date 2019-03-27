export const updateObject = (oldObject, updatedProperties) => {
    return {
        ...oldObject,
        ...updatedProperties
    }
}

export const updateIngredientState = (oldState, prices, ingredient, operation) => {
    const updatedIngredient = operation
        ? {[ingredient]: oldState.ingredients[ingredient] + 1}
        : {[ingredient]: oldState.ingredients[ingredient] - 1};
    const updatedPrice = operation
        ? oldState.totalPrice + prices[ingredient]
        : oldState.totalPrice - prices[ingredient];

    const updatedIngredients = updateObject(oldState.ingredients, updatedIngredient);
    const updatedState = {
        ingredients: updatedIngredients,
        totalPrice: updatedPrice,
        building: true
    }
    return updateObject(oldState, updatedState);
}

export const setIngredients = (state, action) => {
    const { ingredients } = action;
    const updatedValues = {
        ingredients: {
          salad: ingredients.salad,
          bacon: ingredients.bacon,
          cheese: ingredients.cheese,
          meat: ingredients.meat
        },
        totalPrice: 4,
        error: false,
        building: false
      }
      return updateObject(state, updatedValues);
}