import { configureStore } from "@reduxjs/toolkit";
import productReducers from "../features/product/productSlice";
import userReducers from "../features/user/userSlice";
import orderReducers from "../features/order/orderSlice";
import ingredientReducers from "../features/ingredient/ingredientSlice";
import categoryReducers from "../features/category/categorySlice";
import cartReducers from "../features/cart/cartSlice";

const rootReducer = {
  products: productReducers,
  user: userReducers,
  order: orderReducers,
  ingredient: ingredientReducers,
  category: categoryReducers,
  cart: cartReducers,
};

const store = configureStore({
  reducer: rootReducer,
});

export default store;
