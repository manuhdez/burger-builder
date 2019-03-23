import actionTypes from './actionTypes';
import axios from '../../axios-orders';

const { ADD_INGREDIENT, REMOVE_INGREDIENT, SET_INGREDIENTS, FETCH_INGREDIENTS_FAIL } = actionTypes;

// Action creators
export const addIngredient = (ingredient) => {
    return {
        type: ADD_INGREDIENT,
        ingredient
    };
};

export const removeIngredient = (ingredient) => {
    return {
        type: REMOVE_INGREDIENT,
        ingredient
    }
};

const setIngredients = (ingredients) => {
    return {
        type: SET_INGREDIENTS,
        ingredients,
    }
};

const fetchIngredientsFail = () => {
    return {
        type: FETCH_INGREDIENTS_FAIL,
    }
};

// Async actions
export const fetchIngredients = () => {
    return async (dispatch) => {
        try {
            const response = await axios.get('https://react-burger-5b183.firebaseio.com/ingredients.json');
            return dispatch(setIngredients(response.data));
        } catch(err) {
            dispatch(fetchIngredientsFail());
        }
    }
};
