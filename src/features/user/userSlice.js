import { createSlice } from "@reduxjs/toolkit";
import apiService from "../../app/apiService";
import { cloudinaryUpload } from "../../utils/cloudinary";

const initialState = {
  isLoading: false,
  error: null,
  user: null,
  userList: null,
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
    getUsersSuccess: (state, action) => {
      state.isLoading = false;
      state.userList = action.payload;
    },
    updateUserSuccess: (state, action) => {
      state.isLoading = false;
      state.updateProfile = action.payload;
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
export const getUsers = () => async (dispatch) => {
  dispatch(userSlice.actions.startLoading());

  try {
    const response = await apiService.get("users");
    dispatch(userSlice.actions.getUsersSuccess(response.data.data));
  } catch (error) {
    dispatch(userSlice.actions.hasError(error.message));
  }
};
export const updateUser =
  ({ userId, name, address, phone, bmi, avatarURL }) =>
  async (dispatch) => {
    dispatch(userSlice.actions.startLoading());
    try {
      const data = { name, bmi, address, phone, avatarURL };
      if (avatarURL instanceof File) {
        const imageUrl = await cloudinaryUpload(avatarURL);
        data.avatarURL = imageUrl;
      }
      const response = await apiService.put(`users/${userId}`, data);
      dispatch(userSlice.actions.updateUserSuccess(response.data.data));
    } catch (error) {
      dispatch(userSlice.actions.hasError(error.message));
    }
  };

export default userSlice.reducer;
