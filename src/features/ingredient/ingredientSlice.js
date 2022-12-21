import { createSlice } from "@reduxjs/toolkit";
import apiService from "../../app/apiService";

const initialState = {
  isLoading: false,
  error: null,
  ingredients: [],
  ingredientsCustom: [],
  ingredient: [],
};

const ingredientSlice = createSlice({
  name: "ingredients",
  initialState,
  reducers: {
    startLoading: (state) => {
      state.isLoading = true;
    },
    hasError: (state, action) => {
      state.isLoading = true;
      state.error = action.payload;
    },
    getIngredientsSuccess: (state, action) => {
      state.isLoading = false;
      state.ingredients = action.payload.ingredient;
      state.count = action.payload.count;
      state.totalPage = action.payload.totalPage;
    },
    addIngredientsCustomSuccess: (state, action) => {
      state.isLoading = false;
      const duplicate = state.ingredientsCustom.find(
        (ingredient) => ingredient._id === action.payload._id
      );

      if (duplicate) {
        state.ingredientsCustom.map((ingredient) =>
          ingredient._id === action.payload._id
            ? { ...ingredient, amount: ingredient.amount++ }
            : ingredient
        );
      } else {
        state.ingredientsCustom.push({ ...action.payload, amount: 1 });
      }
    },
    subtractIngredientsCustomSuccess: (state, action) => {
      state.isLoading = false;
      state.ingredientsCustom.map((ingredient) =>
        ingredient._id === action.payload._id
          ? { ...ingredient, amount: ingredient.amount-- }
          : ingredient
      );
      state.ingredientsCustom = state.ingredientsCustom.filter(
        (ingredient) => ingredient.amount !== 0
      );
    },
    removeFromCustomBoardSuccess: (state, action) => {
      state.isLoading = false;
      state.ingredientsCustom = state.ingredientsCustom.filter(
        (ingredient) => ingredient._id !== action.payload._id
      );
    },
    createIngredientSuccess: (state, action) => {
      state.isLoading = false;
      state.ingredients.ingredient.push(action.payload);
    },
    editIngredientSuccess: (state, action) => {
      state.isLoading = false;
      state.ingredients = action.payload;
    },
  },
});

export const getIngredients =
  ({ sort, name, limit, page }) =>
  async (dispatch) => {
    dispatch(ingredientSlice.actions.startLoading());
    try {
      const params = { limit, page };
      if (name) params.name = name;
      if (sort) params.sort = sort;
      const response = await apiService.get(`/ingredient`, { params });
      dispatch(
        ingredientSlice.actions.getIngredientsSuccess(response.data.data)
      );
    } catch (error) {
      dispatch(ingredientSlice.actions.hasError(error));
    }
  };

export const addIngredientsCustom = (ingredient) => async (dispatch) => {
  dispatch(ingredientSlice.actions.startLoading());
  try {
    // console.log(ingredient);
    dispatch(ingredientSlice.actions.addIngredientsCustomSuccess(ingredient));
  } catch (error) {
    dispatch(ingredientSlice.actions.hasError(error));
  }
};
export const subtractIngredientsCustom = (ingredient) => async (dispatch) => {
  dispatch(ingredientSlice.actions.startLoading());
  try {
    // console.log(ingredient);
    dispatch(
      ingredientSlice.actions.subtractIngredientsCustomSuccess(ingredient)
    );
  } catch (error) {
    dispatch(ingredientSlice.actions.hasError(error));
  }
};
export const removeFromCustomBoard = (ingredient) => async (dispatch) => {
  dispatch(ingredientSlice.actions.startLoading());
  try {
    // console.log(ingredient);
    dispatch(ingredientSlice.actions.removeFromCustomBoardSuccess(ingredient));
  } catch (error) {
    dispatch(ingredientSlice.actions.hasError(error));
  }
};
export const createIngredient =
  ({ name, image, price, calo, type }) =>
  async (dispatch) => {
    dispatch(ingredientSlice.actions.startLoading());
    const data = { name, image, price, calo, type };
    try {
      console.log(data);
      const response = await apiService.post(`/ingredient`, data);
      console.log(response);

      dispatch(
        ingredientSlice.actions.createIngredientSuccess(response.data.data)
      );
    } catch (error) {
      dispatch(ingredientSlice.actions.hasError(error));
    }
  };
export const editIngredient =
  ({ id, name, image, price, calo, type }) =>
  async (dispatch) => {
    dispatch(ingredientSlice.actions.startLoading());
    const data = { name, image, price, calo, type };
    try {
      await apiService.put(`/ingredient/${id}`, data);
      const response = await apiService.get(`/ingredient`);
      dispatch(
        ingredientSlice.actions.getIngredientsSuccess(response.data.data)
      );
    } catch (error) {
      dispatch(ingredientSlice.actions.hasError(error));
    }
  };
export const deleteIngredient = (id) => async (dispatch) => {
  dispatch(ingredientSlice.actions.startLoading());
  try {
    await apiService.delete(`/ingredient/${id}`);
    const response = await apiService.get(`/ingredient`);
    dispatch(ingredientSlice.actions.getIngredientsSuccess(response.data.data));
  } catch (error) {
    dispatch(ingredientSlice.actions.hasError(error));
  }
};

export default ingredientSlice.reducer;
