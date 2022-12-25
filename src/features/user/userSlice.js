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
    deleteMeSuccess: (state, action) => {
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
export const getUsers =
  ({ limit, page }) =>
  async (dispatch) => {
    dispatch(userSlice.actions.startLoading());

    try {
      const params = { page, limit };
      const response = await apiService.get("users", { params });
      dispatch(userSlice.actions.getUsersSuccess(response.data.data));
    } catch (error) {
      dispatch(userSlice.actions.hasError(error.message));
    }
  };
export const updateUser =
  ({
    userId,
    name,
    address,
    phone,
    bmi,
    aboutme,
    avatarURL,
    newPassword,
    passwordConfirmation,
  }) =>
  async (dispatch) => {
    dispatch(userSlice.actions.startLoading());
    try {
      const data = {
        name,
        bmi,
        address,
        aboutme,
        phone,
        avatarURL,
        newPassword,
        passwordConfirmation,
      };
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
export const deleteMe = () => async (dispatch) => {
  dispatch(userSlice.actions.startLoading());
  try {
    const response = await apiService.delete("users/me/delete");
    dispatch(userSlice.actions.deleteMeSuccess(response.data.data));
  } catch (error) {
    dispatch(userSlice.actions.hasError(error.message));
  }
};

export default userSlice.reducer;
