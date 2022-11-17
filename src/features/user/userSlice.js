import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import apiService from "../../app/apiService";

const initialState = {
  isLoading: false,
  error: null,
  user: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    startLoading: (state) => {
      state.isLoading = true;
    },
    hasError: (state, action) => {
      state.isLoading = true;
      state.error = action.payload;
    },
    getUserSuccess: (state, action) => {
      state.isLoading = false;
      state.user = action.payload;
    },
  },
});

export const getUser = () => async (dispatch) => {
  dispatch(userSlice.actions.startLoading());

  try {
    const response = await apiService.get("users/me");
    dispatch(userSlice.actions.getUserSuccess(response.data.data));
  } catch (error) {
    dispatch(userSlice.actions.hasError(error.message));
  }
};

export default userSlice.reducer;
