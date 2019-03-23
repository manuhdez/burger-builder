import actionTypes from './actionTypes';

const { ADD_INGREDIENT, REMOVE_INGREDIENT } = actionTypes;

// Action creators
export const addIngredient = (ingredient) => {
    return {
        type: ADD_INGREDIENT,
        ingredient
    };
}

export const removeIngredient = (ingredient) => {
    return {
        type: REMOVE_INGREDIENT,
        ingredient
    }
}