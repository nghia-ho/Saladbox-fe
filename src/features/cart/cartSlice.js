import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  error: null,
  cart: [],
  cartCustom: [],
  shippingAddress: {},
  paymentMethod: "",
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    startLoading: (state) => {
      state.isLoading = true;
    },
    hasError: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    addToCardSuccess: (state, action) => {
      state.isLoading = false;
      state.cart = action.payload;
    },
    addToCartCustomSuccess: (state, action) => {
      state.isLoading = false;
      state.cartCustom = action.payload;
    },
    getCartSuccess: (state, action) => {
      state.isLoading = false;
      state.cart = action.payload;
    },
    subtractToCartSuccess: (state, action) => {
      state.isLoading = false;
      state.cart = action.payload;
    },
    deleteFromCartSuccess: (state, action) => {
      state.isLoading = false;
      state.cart = action.payload;
    },
    saveShippingAddressSuccess: (state, action) => {
      state.isLoading = false;
      state.shippingAddress = action.payload;
    },
    savePaymentMethodSuccess: (state, action) => {
      state.isLoading = false;
      state.paymentMethod = action.payload;
    },
    clearCartSuccess: (state, action) => {
      state.isLoading = false;
      state.cart = [];
      state.shippingAddress = {};
      state.paymentMethod = "";
    },
    clearCartCustomSuccess: (state, action) => {
      state.isLoading = false;
      state.cartCustom = [];
      state.shippingAddress = {};
      state.paymentMethod = "";
    },
  },
});

export const addToCard = (product) => async (dispatch) => {
  dispatch(cartSlice.actions.startLoading());
  try {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    const duplicate = cart.filter((item) => item._id === product._id);
    if (duplicate.length === 0) {
      cart.push({ ...product, quantity: 1 });
      localStorage.setItem("cart", JSON.stringify(cart));
    } else {
      cart = cart.map((cartItem) =>
        cartItem._id === product._id
          ? { ...cartItem, quantity: cartItem.quantity + 1 }
          : cartItem
      );
      localStorage.setItem("cart", JSON.stringify(cart));
    }
    dispatch(cartSlice.actions.addToCardSuccess(cart));
  } catch (error) {
    dispatch(cartSlice.actions.hasError(error));
  }
};

export const addToCartCustom = (product) => async (dispatch) => {
  dispatch(cartSlice.actions.startLoading());
  try {
    const cart = product.map((e) => ({ ...e, quantity: 1 }));

    dispatch(cartSlice.actions.addToCartCustomSuccess(cart));
  } catch (error) {
    dispatch(cartSlice.actions.hasError(error));
  }
};

export const getCart = () => async (dispatch) => {
  dispatch(cartSlice.actions.startLoading());
  try {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    dispatch(cartSlice.actions.getCartSuccess(cart));
  } catch (error) {
    dispatch(cartSlice.actions.hasError(error));
  }
};

export const subtractToCart = (product) => async (dispatch) => {
  dispatch(cartSlice.actions.startLoading());
  console.log(product);
  try {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    cart = cart.map((cartItem) =>
      cartItem._id === product._id
        ? { ...cartItem, quantity: cartItem.quantity - 1 }
        : cartItem
    );
    cart = cart.filter((cartItem) => cartItem.quantity !== 0);

    localStorage.setItem("cart", JSON.stringify(cart));
    dispatch(cartSlice.actions.subtractToCartSuccess(cart));
  } catch (error) {
    dispatch(cartSlice.actions.hasError(error));
  }
};
export const deleteFromCart = (product) => async (dispatch) => {
  dispatch(cartSlice.actions.startLoading());
  try {
    let cart = localStorage.getItem("cart")
      ? JSON.parse(localStorage.getItem("cart"))
      : [];

    const updateCart = cart.filter((item) => item._id !== product._id);
    localStorage.setItem("cart", JSON.stringify(updateCart));
    dispatch(cartSlice.actions.deleteFromCartSuccess(updateCart));
  } catch (error) {
    dispatch(cartSlice.actions.hasError(error));
  }
};
export const saveShippingAddress = (data, callback) => async (dispatch) => {
  dispatch(cartSlice.actions.startLoading());
  try {
    localStorage.setItem("shippingAddress", JSON.stringify(data));
    callback();
    dispatch(cartSlice.actions.saveShippingAddressSuccess(data));
  } catch (error) {
    dispatch(cartSlice.actions.hasError(error));
  }
};
export const savePaymentMethod = (data, callback) => async (dispatch) => {
  dispatch(cartSlice.actions.startLoading());
  try {
    localStorage.setItem("payment", JSON.stringify(data));
    callback();
    dispatch(cartSlice.actions.savePaymentMethodSuccess(data));
  } catch (error) {
    dispatch(cartSlice.actions.hasError(error));
  }
};
export const clearCart = () => async (dispatch) => {
  dispatch(cartSlice.actions.startLoading());
  try {
    window.localStorage.removeItem("cart");
    window.localStorage.removeItem("payment");
    window.localStorage.removeItem("__paypal_storage__");
    window.localStorage.removeItem("shippingAddress");
    dispatch(cartSlice.actions.clearCartSuccess());
  } catch (error) {
    dispatch(cartSlice.actions.hasError(error));
  }
};
export const clearCartCustom = () => async (dispatch) => {
  dispatch(cartSlice.actions.startLoading());
  try {
    dispatch(cartSlice.actions.clearCartCustomSuccess());
  } catch (error) {
    dispatch(cartSlice.actions.hasError(error));
  }
};

export default cartSlice.reducer;
