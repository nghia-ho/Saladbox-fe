import { createSlice } from "@reduxjs/toolkit";
import apiService from "../../app/apiService";

const initialState = {
  isLoading: false,
  error: null,
  categories: [],
  category: [],
};

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    startLoading: (state) => {
      state.isLoading = true;
    },
    hasError: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    getCategorySuccess: (state, action) => {
      state.isLoading = false;
      state.categories = action.payload;
    },
    createCategorySuccess: (state, action) => {
      state.isLoading = false;
      state.categories.push(action.payload);
    },
  },
});

export const getCategory = () => async (dispatch) => {
  dispatch(categorySlice.actions.startLoading());
  try {
    const response = await apiService.get("/category");
    dispatch(categorySlice.actions.getCategorySuccess(response.data.data));
  } catch (error) {
    dispatch(categorySlice.actions.hasError(error));
  }
};
export const createCategory = (name) => async (dispatch) => {
  dispatch(categorySlice.actions.startLoading());
  try {
    const response = await apiService.post("/category", { name });
    dispatch(categorySlice.actions.createCategorySuccess(response.data.data));
  } catch (error) {
    dispatch(categorySlice.actions.hasError(error));
  }
};

export default categorySlice.reducer;
