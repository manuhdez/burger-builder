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

    const updatedIngredients = updateObject(oldState.ingredients, updatedIngredient);
    const toUpdateState = {
    ingredients: updatedIngredients,
    totalPrice: oldState.totalPrice + prices[ingredient]
    }
    return updateObject(oldState, toUpdateState);
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
        error: false
      }
      return updateObject(state, updatedValues);
}