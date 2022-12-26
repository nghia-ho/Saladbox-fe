import { createSlice } from "@reduxjs/toolkit";
import apiService from "../../app/apiService";
import { cloudinaryUpload } from "../../utils/cloudinary";

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
      state.type = action.payload.type;
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
        state.ingredientsCustom.unshift({ ...action.payload, amount: 1 });
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

    editIngredientSuccess: (state, action) => {
      state.isLoading = false;
      // console.log(action.payload);
      const index = state.ingredients.findIndex(
        (i) => i._id === action.payload._id
      );
      // console.log(index);
      state.ingredients[index] = action.payload;
    },
    deleteIngredientSuccess: (state, action) => {
      state.isLoading = false;
      const index = state.ingredients.findIndex(
        (i) => i._id === action.payload._id
      );
      state.ingredients[index] = action.payload;
    },
    createIngredientSuccess: (state, action) => {
      state.isLoading = false;
      state.ingredients.unshift(action.payload);
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
    try {
      const data = { name, image, price, calo, type };
      // console.log(type);
      if (image instanceof File) {
        const imageUrl = await cloudinaryUpload(image);
        data.image = imageUrl;
      }
      const response = await apiService.post(`/ingredient`, data);

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
    try {
      const data = { name, image, price, calo, type };
      if (image instanceof File) {
        const imageUrl = await cloudinaryUpload(image);
        data.image = imageUrl;
      }
      const response = await apiService.put(`/ingredient/${id}`, data);
      dispatch(
        ingredientSlice.actions.editIngredientSuccess(response.data.data)
      );
    } catch (error) {
      dispatch(ingredientSlice.actions.hasError(error));
    }
  };
export const deleteIngredient =
  ({ id }) =>
  async (dispatch) => {
    dispatch(ingredientSlice.actions.startLoading());
    try {
      const response = await apiService.delete(`/ingredient/${id}`);
      dispatch(
        ingredientSlice.actions.deleteIngredientSuccess(response.data.data)
      );
    } catch (error) {
      dispatch(ingredientSlice.actions.hasError(error));
    }
  };

export default ingredientSlice.reducer;
