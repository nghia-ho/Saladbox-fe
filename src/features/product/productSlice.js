import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import apiService from "../../app/apiService";
import { cloudinaryUpload } from "../../utils/cloudinary";

export const getProducts = createAsyncThunk(
  "product/getProducts",
  async ({ page = 1, limit = 12, name, price, sortBy, category, sort }) => {
    const params = { page, limit };

    if (name) params.name = name;
    if (price) params.price = price;
    if (sortBy) params.sortBy = sortBy;
    if (category) params.category = category;
    if (sort) params.sort = sort;

    const response = await apiService.get(`/product`, { params });
    return response.data.data;
  }
);
export const getProductsByAdmin = createAsyncThunk(
  "product/getProducts",
  async ({ page = 1, limit = 12, name, price, sortBy, sort }) => {
    const params = { page, limit };

    if (name) params.name = name;
    if (price) params.price = price;
    if (sortBy) params.sortBy = sortBy;
    if (sort) params.sort = sort;

    const response = await apiService.get(`/product/admin`, { params });
    return response.data.data;
  }
);
export const getProductById = createAsyncThunk(
  "product/getProductById",
  async (id) => {
    let url = `/product/${id}`;
    const response = await apiService.get(url);
    return response.data.data;
  }
);

export const getfavoriteProduct = createAsyncThunk(
  "favorite/favorites",
  async ({ page, limit = 5 }) => {
    const params = { page, limit };

    const response = await apiService.get(`/favorite`, { params });
    return response.data.data;
  }
);
export const createfavoriteProduct = createAsyncThunk(
  "favorite/createFavorites",
  async ({ id, type }) => {
    let url = `/favorite`;
    const response = await apiService.post(url, { productId: id, type });
    return response.data.data;
  }
);
export const removefavoriteProduct = createAsyncThunk(
  "favorite/createFavorites",
  async (id) => {
    let url = `/favorite/${id}`;
    const response = await apiService.delete(url);
    return response.data.data;
  }
);
export const customProduct = createAsyncThunk(
  "product/custom",
  async ({
    name,
    ingredients,
    price,
    calo,
    type = "custom",
    image = "/custom/custom.png",
  }) => {
    const data = { name, ingredients, price, calo, type, image };
    let url = `/product/custom`;
    const response = await apiService.post(url, data);
    return response.data.data;
  }
);
export const editProduct = createAsyncThunk(
  "product/edit",
  async ({
    id,
    name,
    decription,
    image,
    category,
    price,
    calo,
    type,
    ingredients,
  }) => {
    const data = {
      name,
      decription,
      image,
      category,
      price,
      calo,
      type,
      ingredients,
    };
    if (image instanceof File) {
      const imageUrl = await cloudinaryUpload(image);
      data.image = imageUrl;
    }
    const response = await apiService.put(`/product/${id}`, data);
    return response.data.data;
  }
);
export const createProduct = createAsyncThunk(
  "product/create",
  async (
    { name, decription, image, category, type, ingredients },
    { rejectWithValue }
  ) => {
    try {
      const data = { name, decription, image, category, type, ingredients };
      if (image instanceof File) {
        const imageUrl = await cloudinaryUpload(image);
        data.image = imageUrl;
      }
      const response = await apiService.post(`/product`, data);
      return response.data;
    } catch (error) {
      rejectWithValue(error);
      return error;
    }
  }
);
export const deleteProduct = createAsyncThunk(
  "product/delete",
  async ({ id }) => {
    const response = await apiService.delete(`/product/${id}`);
    return response.data.data;
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
      state.count = action.payload.count;
    },
    [getProducts.rejected]: (state, action) => {
      state.isLoading = false;
      if (action.payload) {
        state.errorMessage = action.payload.message;
      } else {
        state.errorMessage = action.error.message;
      }
    },
    [getProductsByAdmin.pending]: (state, action) => {
      state.isLoading = true;
      state.errorMessage = "";
    },
    [getProductsByAdmin.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.products = action.payload.product;
      state.totalPage = action.payload.totalPage;
      state.count = action.payload.count;
    },
    [getProductsByAdmin.rejected]: (state, action) => {
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

    [getfavoriteProduct.pending]: (state, action) => {
      // state.isLoading = true;
      state.errorMessage = "";
    },
    [getfavoriteProduct.fulfilled]: (state, action) => {
      // state.isLoading = false;
      state.favorite = action.payload;
    },
    [getfavoriteProduct.rejected]: (state, action) => {
      // state.isLoading = false;
      if (action.payload) {
        state.errorMessage = action.payload.message;
      } else {
        state.errorMessage = action.error.message;
      }
    },
    [createfavoriteProduct.pending]: (state, action) => {
      // state.isLoading = true;
      state.errorMessage = "";
    },
    [createfavoriteProduct.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.favorite = action.payload;
    },
    [createfavoriteProduct.rejected]: (state, action) => {
      state.isLoading = false;

      if (action.payload) {
        state.errorMessage = action.payload;
      } else {
        state.errorMessage = action.error.message;
      }
    },
    [removefavoriteProduct.pending]: (state, action) => {
      // state.isLoading = true;
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
    [customProduct.pending]: (state, action) => {
      state.isLoading = true;
      state.errorMessage = "";
    },
    [customProduct.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.product = action.payload;
    },
    [customProduct.rejected]: (state, action) => {
      state.isLoading = false;
      if (action.payload) {
        state.errorMessage = action.payload.message;
      } else {
        state.errorMessage = action.error.message;
      }
    },
    [editProduct.pending]: (state, action) => {
      state.isLoading = true;
      state.errorMessage = "";
    },
    [editProduct.fulfilled]: (state, action) => {
      state.isLoading = false;
      const index = state.products.findIndex(
        (e) => e._id === action.payload._id
      );
      state.products[index] = action.payload;
    },
    [editProduct.rejected]: (state, action) => {
      state.isLoading = false;
      if (action.payload) {
        state.errorMessage = action.payload.message;
      } else {
        state.errorMessage = action.error.message;
      }
    },
    [createProduct.pending]: (state, action) => {
      state.isLoading = true;
      state.errorMessage = "";
    },
    [createProduct.fulfilled]: (state, action) => {
      state.isLoading = false;

      state.errorMessage = action.payload.messagge;

      state.product = action.payload.data;
      if (action.payload.data) {
        state.products.unshift(action.payload.data);
        state.errorMessage = null;
      }
    },
    [createProduct.rejected]: (state, action) => {
      state.isLoading = false;
      if (action.payload) {
        state.errorMessage = action.payload;
      } else {
        state.errorMessage = action.error.message;
      }
    },
    [deleteProduct.pending]: (state, action) => {
      state.isLoading = true;
      state.errorMessage = "";
    },
    [deleteProduct.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.totalPage = action.payload.totalPage;
      const index = state.products.findIndex(
        (e) => e._id === action.payload._id
      );
      state.products[index] = action.payload;
    },
    [deleteProduct.rejected]: (state, action) => {
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
