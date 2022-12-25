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

export const getfavoriteProduct = createAsyncThunk(
  "favorite/favorites",
  async ({ page, limit = 5 }) => {
    const params = { page, limit };
    try {
      const response = await apiService.get(`/favorite`, { params });
      console.log(response);
      return response.data.data;
    } catch (error) {
      console.log(error);
    }
  }
);
export const createfavoriteProduct = createAsyncThunk(
  "favorite/createFavorites",
  async ({ id, type }) => {
    try {
      let url = `/favorite`;
      const response = await apiService.post(url, { productId: id, type });
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
export const customProduct = createAsyncThunk(
  "product/custom",
  async ({
    name = "Salad Custom",
    ingredients,
    price,
    calo,
    type = "custom",
    image = "/custom/custom.png",
  }) => {
    try {
      const data = { name, ingredients, price, calo, type, image };
      let url = `/product/custom`;
      const response = await apiService.post(url, data);
      return response.data.data;
    } catch (error) {
      console.log(error);
    }
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
    try {
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

      let url = `/product/${id}`;
      await apiService.put(url, data);
      const response = await apiService.get(`/product?page=1`);
      return response.data.data;
    } catch (error) {
      console.log(error);
    }
  }
);
export const createProduct = createAsyncThunk(
  "product/create",
  async ({ name, decription, image, category, type, ingredients }) => {
    try {
      const data = { name, decription, image, category, type, ingredients };
      if (image instanceof File) {
        const imageUrl = await cloudinaryUpload(image);
        data.image = imageUrl;
      }
      const response = await apiService.post(`/product`, data);
      return response.data.data;
    } catch (error) {
      console.log(error);
    }
  }
);
export const deleteProduct = createAsyncThunk(
  "product/delete",
  async ({ id, page, limit, name, sort }) => {
    try {
      await apiService.delete(`/product/${id}`);

      const params = { page, limit };

      if (name) params.name = name;
      if (sort) params.sort = sort;

      const response = await apiService.get(`/product`, { params });
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
      // state.product = action.payload;
      state.products = action.payload.product;
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
      state.product = action.payload;
      state.products.unshift(action.payload);
    },
    [createProduct.rejected]: (state, action) => {
      state.isLoading = false;
      if (action.payload) {
        state.errorMessage = action.payload.message;
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
      state.products = action.payload.product;
      state.totalPage = action.payload.totalPage;
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
