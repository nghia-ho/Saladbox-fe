import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import apiService from "../../app/apiService";

export const getProducts = createAsyncThunk(
  "product/getProducts",
  async ({ page = 1, name, calo, price }) => {
    let url = `/product?page=${page}&limit=${10}`;
    if (name) url += `&name=${name}`;
    if (calo) url += `&calo=${calo}`;
    if (price) url += `&price=${price}`;
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

const initialState = {
  products: [],
  product: [],
  isLoading: false,
  name: "",
  calo: "",
  price: "",
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
    nameQuery: (state, action) => {
      state.name = action.payload;
    },
    caloQuey: (state, action) => {
      state.calo = action.payload;
    },
    priceQuery: (state, action) => {
      state.price = action.payload;
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
  },
});

const { actions, reducer } = productSlice;
export const { changePage, nameQuery, caloQuery, priceQuery, reset } = actions;
export default reducer;
