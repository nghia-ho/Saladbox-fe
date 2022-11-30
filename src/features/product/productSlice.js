import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import apiService from "../../app/apiService";

export const getProducts = createAsyncThunk(
  "product/getProducts",
  async ({ page = 1, name, sortBy }) => {
    let url = `/product?page=${page}&limit=${12}`;
    if (name) url += `&name=${name}`;
    if (sortBy) url += `&sortBy=${sortBy}`;
    const response = await apiService.get(url);
    return response.data.data;
  }
);
export const getProductById = createAsyncThunk(
  "product/getProductById",
  async (id) => {
    try {
      let url = `/product/${id}`;
      const response = await apiService.get(url);
      return response.data.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const categoryProduct = createAsyncThunk(
  "category/catories",
  async (id) => {
    try {
      let url = `/category/${id}`;
      const response = await apiService.get(url);
      return response.data.data.product;
    } catch (error) {
      console.log(error);
    }
  }
);
export const getfavoriteProduct = createAsyncThunk(
  "favorite/favorites",
  async () => {
    try {
      let url = `/favorite`;
      const response = await apiService.get(url);
      return response.data.data;
    } catch (error) {
      console.log(error);
    }
  }
);
export const createfavoriteProduct = createAsyncThunk(
  "favorite/createFavorites",
  async (id) => {
    try {
      let url = `/favorite`;
      const response = await apiService.post(url, { productId: id });
      return response.data.data;
    } catch (error) {
      console.log(error);
    }
  }
);
export const removefavoriteProduct = createAsyncThunk(
  "favorite/createFavorites",
  async (id) => {
    try {
      let url = `/favorite/${id}`;
      const response = await apiService.delete(url);
      return response.data.data;
    } catch (error) {
      console.log(error);
    }
  }
);

const initialState = {
  products: [],
  product: [],
  favorite: [],
  isLoading: false,

  page: 1,
  totalPage: 1,
};

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    changePage: (state, action) => {
      if (action.payload) {
        state.page = action.payload;
      } else state.page++;
    },
  },
  extraReducers: {
    [getProducts.pending]: (state, action) => {
      state.isLoading = true;
      state.errorMessage = "";
    },
    [getProducts.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.products = action.payload.product;
      state.totalPage = action.payload.totalPage;
    },
    [getProducts.rejected]: (state, action) => {
      state.isLoading = false;
      if (action.payload) {
        state.errorMessage = action.payload.message;
      } else {
        state.errorMessage = action.error.message;
      }
    },
    [getProductById.pending]: (state, action) => {
      state.isLoading = true;
      state.errorMessage = "";
    },
    [getProductById.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.product = action.payload;
    },
    [getProductById.rejected]: (state, action) => {
      state.isLoading = false;
      if (action.payload) {
        state.errorMessage = action.payload.message;
      } else {
        state.errorMessage = action.error.message;
      }
    },
    [categoryProduct.pending]: (state, action) => {
      state.isLoading = true;
      state.errorMessage = "";
    },
    [categoryProduct.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.products = action.payload;
    },
    [categoryProduct.rejected]: (state, action) => {
      state.isLoading = false;
      if (action.payload) {
        state.errorMessage = action.payload.message;
      } else {
        state.errorMessage = action.error.message;
      }
    },
    [getfavoriteProduct.pending]: (state, action) => {
      state.isLoading = true;
      state.errorMessage = "";
    },
    [getfavoriteProduct.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.favorite = action.payload;
    },
    [getfavoriteProduct.rejected]: (state, action) => {
      state.isLoading = false;
      if (action.payload) {
        state.errorMessage = action.payload.message;
      } else {
        state.errorMessage = action.error.message;
      }
    },
    [createfavoriteProduct.pending]: (state, action) => {
      state.isLoading = true;
      state.errorMessage = "";
    },
    [createfavoriteProduct.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.favorite = action.payload;
    },
    [createfavoriteProduct.rejected]: (state, action) => {
      state.isLoading = false;
      if (action.payload) {
        state.errorMessage = action.payload.message;
      } else {
        state.errorMessage = action.error.message;
      }
    },
    [removefavoriteProduct.pending]: (state, action) => {
      state.isLoading = true;
      state.errorMessage = "";
    },
    [removefavoriteProduct.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.favorite = action.payload;
    },
    [removefavoriteProduct.rejected]: (state, action) => {
      state.isLoading = false;
      if (action.payload) {
        state.errorMessage = action.payload.message;
      } else {
        state.errorMessage = action.error.message;
      }
    },
  },
});

const { actions, reducer } = productSlice;
export const { changePage, nameQuery, caloQuery, priceQuery, reset } = actions;
export default reducer;
