import React from "react";
import { createContext, useReducer, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import apiService from "../app/apiService";
import { getCart, clearCart } from "../features/cart/cartSlice";
import { isValidToken } from "../utils/jwt";

const initialState = {
  isAuthenticated: false,
  isInitialized: false,
  user: null,
  role: null,
};

const LOGIN_SUCCESS = "LOGIN_SUCCESS";
const LOGOUT = "LOGOUT";
const REGISTER_SUCCESS = "REGISTER_SUCCESS";
const INITIALIZE = "INITIALIZE";
const UPDATE_PROFILE = "AUTH.UPDATE_PROFILE";

const reducer = (state, action) => {
  switch (action.type) {
    case INITIALIZE:
      const { isAuthenticated, user, role } = action.payload;
      return {
        ...state,
        isAuthenticated,
        isInitialized: true,
        user,
        role,
      };

    case LOGIN_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
        role: action.payload.role,
      };
    case LOGOUT:
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        role: null,
      };
    case REGISTER_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        user,
        role,
      };
    case UPDATE_PROFILE:
      const { name, address, phone, avatarURL, bmi } = action.payload;
      return {
        ...state,
        user: {
          ...state.user,
          name,
          address,
          phone,
          avatarURL,
          bmi,
        },
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
  const updateProfile = useSelector((state) => state.user.updateProfile);
  const dispatcher = useDispatch();
  useEffect(() => {
    const initialize = async () => {
      try {
        const accessToken = window.localStorage.getItem("accessToken");
        dispatcher(getCart());

        if (accessToken && isValidToken(accessToken)) {
          setSession(accessToken);
          const response = await apiService.get("/users/me");
          const user = response.data.data;
          dispatch({
            type: INITIALIZE,
            payload: { isAuthenticated: true, user, role: user.role },
          });
        } else {
          setSession(null);
          dispatch({
            type: INITIALIZE,
            payload: { isAuthenticated: false, user: null, role: null },
          });
        }
      } catch (err) {
        setSession(null);
        dispatch({
          type: INITIALIZE,
          payload: {
            isAuthenticated: false,
            user: null,
            role: null,
          },
        });
      }
    };
    initialize();
  }, [dispatcher]);

  useEffect(() => {
    if (updateProfile)
      dispatch({ type: UPDATE_PROFILE, payload: updateProfile });
  }, [updateProfile]);

  const login = async ({ email, password }, callback) => {
    const response = await apiService.post("/auth/login", { email, password });
    const { user, accessToken } = response.data.data;
    window.localStorage.setItem("username", user);

    setSession(accessToken);
    dispatch({
      type: LOGIN_SUCCESS,
      payload: { user, role: user.role },
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
    window.localStorage.setItem("username", user);
    setSession(accessToken);
    dispatch({
      type: LOGIN_SUCCESS,
      payload: { user: user.name, role: user.role },
    });
    callback();
  };

  const logout = async (callback) => {
    window.localStorage.removeItem("username");
    window.localStorage.removeItem("cart");
    dispatcher(clearCart());
    setSession(null);
    dispatch({ type: LOGOUT });
    callback();
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        logout,
        login,
        register,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
