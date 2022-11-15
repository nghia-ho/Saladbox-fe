import { configureStore } from "@reduxjs/toolkit";
import productReducers from "../features/product/productSlice";
const store = configureStore({
  reducer: {
    products: productReducers,
  },
});

export default store;
