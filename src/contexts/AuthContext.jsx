import React from "react";
import { createContext, useReducer, useEffect } from "react";
import apiService from "../app/apiService";
import { isValidToken } from "../utils/jwt";

const initialState = {
  isAuthenticated: false,
  isInitialized: false,
  user: null,
  cart: [],
  shippingAdress: {},
  payment: "",
};

const LOGIN_SUCCESS = "LOGIN_SUCCESS";
const LOGOUT = "LOGOUT";
const REGISTER_SUCCESS = "REGISTER_SUCCESS";
const INITIALIZE = "INITIALIZE";
const ADDTOCART = "ADDTOCART";
const DELETE_FROM_CART = "DELETE_FROM_CART";
const SAVE_SHIPPING_ADDRESS = "SAVE_SHIPPING_ADDRESS";
const SAVE_PAYMENT_METHOD = "SAVE_PAYMENT_METHOD";
const CLEAR_CART = "CLEAR_CART";

const reducer = (state, action) => {
  switch (action.type) {
    case INITIALIZE:
      const { isAuthenticated, user, cart } = action.payload;
      return {
        ...state,
        isAuthenticated,
        isInitialized: true,
        user,
        cart,
      };

    case LOGIN_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
      };
    case LOGOUT:
      return {
        ...state,
        isAuthenticated: false,
        user: null,
      };
    case REGISTER_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        user,
      };
    case ADDTOCART:
      return {
        ...state,
        cart: action.payload.cart,
      };
    case DELETE_FROM_CART:
      return {
        ...state,
        cart: action.payload.updateCart,
      };
    case CLEAR_CART:
      return {
        ...state,
        cart: action.payload,
      };
    case SAVE_SHIPPING_ADDRESS:
      return {
        ...state,
        shippingAdress: action.payload,
      };
    case SAVE_PAYMENT_METHOD:
      return {
        ...state,
        payment: action.payload,
      };

    default:
      return state;
  }
};

const AuthContext = createContext({ ...initialState });

const setSession = (accessToken) => {
  if (accessToken) {
    window.localStorage.setItem("accessToken", accessToken);
    apiService.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
  } else {
    window.localStorage.removeItem("accessToken", accessToken);
    delete apiService.defaults.headers.common.Authorization;
  }
};

const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const initialize = async () => {
      try {
        const accessToken = window.localStorage.getItem("accessToken");
        const user = window.localStorage.getItem("username");
        let cart = window.localStorage.getItem("cart");
        cart = JSON.parse(localStorage.getItem("cart")) || [];

        if (accessToken && isValidToken(accessToken)) {
          setSession(accessToken);
          dispatch({
            type: INITIALIZE,
            payload: { isAuthenticated: true, user, cart },
          });
        } else {
          setSession(null);
          dispatch({
            type: INITIALIZE,
            payload: { isAuthenticated: false, user: null, cart: [] },
          });
        }
      } catch (err) {
        setSession(null);
        dispatch({
          type: INITIALIZE,
          payload: {
            isAuthenticated: false,
            user: null,
            cart: [],
          },
        });
      }
    };
    initialize();
  }, []);

  const login = async ({ email, password }, callback) => {
    const response = await apiService.post("/auth/login", { email, password });
    const { user, accessToken } = response.data.data;
    window.localStorage.setItem("username", user.name);

    setSession(accessToken);
    dispatch({
      type: LOGIN_SUCCESS,
      payload: { user: user.name },
    });
    callback();
  };

  const register = async ({ name, email, password }, callback) => {
    const response = await apiService.post("/users", {
      name,
      email,
      password,
    });

    const { user, accessToken } = response.data.data;
    window.localStorage.setItem("username", user.name);
    setSession(accessToken);
    dispatch({
      type: LOGIN_SUCCESS,
      payload: { user: { name: user.name } },
    });
    callback();
  };

  const logout = async (callback) => {
    window.localStorage.removeItem("username");
    window.localStorage.removeItem("cart");
    setSession(null);
    dispatch({ type: LOGOUT });

    const updateCart = [];
    dispatch({ type: DELETE_FROM_CART, payload: { updateCart } });
    callback();
  };

  const addToCard = async (product) => {
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
    dispatch({ type: ADDTOCART, payload: { cart } });
  };
  const subtractToCart = async (product) => {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    cart = cart.map((cartItem) =>
      cartItem._id === product._id
        ? { ...cartItem, quantity: cartItem.quantity - 1 }
        : cartItem
    );
    localStorage.setItem("cart", JSON.stringify(cart));

    dispatch({ type: ADDTOCART, payload: { cart } });
  };
  const deleteFromCart = async (product) => {
    let cart = localStorage.getItem("cart")
      ? JSON.parse(localStorage.getItem("cart"))
      : [];

    const updateCart = cart.filter((item) => item._id !== product._id);
    localStorage.setItem("cart", JSON.stringify(updateCart));

    dispatch({ type: DELETE_FROM_CART, payload: { updateCart } });
  };

  const saveShippingAddress = async (data, callback) => {
    dispatch({ type: SAVE_SHIPPING_ADDRESS, payload: data });
    localStorage.setItem("shippingAddress", JSON.stringify(data));
    callback();
  };

  const savePaymentMethod = async (data, callback) => {
    dispatch({ type: SAVE_PAYMENT_METHOD, payload: data });
    localStorage.setItem("payment", JSON.stringify(data));
    callback();
  };
  const clearCart = async (callback) => {
    window.localStorage.removeItem("cart");
    dispatch({ type: CLEAR_CART, payload: [] });
    callback();
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        logout,
        login,
        register,
        addToCard,
        subtractToCart,
        deleteFromCart,
        saveShippingAddress,
        savePaymentMethod,
        clearCart,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
