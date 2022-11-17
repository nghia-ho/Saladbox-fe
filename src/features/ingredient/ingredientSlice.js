import { createSlice } from "@reduxjs/toolkit";
import apiService from "../../app/apiService";

const initialState = {
  isLoading: false,
  error: null,
};

const ingredientSlice = createSlice({
  name: "ingredient",
  initialState,
  reducers: {
    startLoading: (state) => {
      state.isLoading = true;
    },
    hasError: (state, action) => {
      state.isLoading = true;
      state.error = action.payload;
    },
  },
});

export default ingredientSlice.reducer;
