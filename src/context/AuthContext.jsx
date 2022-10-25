import React from "react";
import { createContext, useState, useReducer } from "react";

const initialState = {
  isAuthenticated: false,
  user: null,
};

const LOGIN_SUCCESS = "LOGIN_SUCCESS";
const LOGOUT = "LOGOUT";
const REGISTER_SUCCESS = "REGISTER_SUCCESS";

const reducer = (state, action) => {
  switch (action.type) {
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
      return state;

    default:
      return state;
  }
};

const AuthContext = createContext({ ...initialState });

const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const login = (user, password, redirect) => {
    dispatch({
      type: LOGIN_SUCCESS,
      payload: { user },
    });
    redirect();
  };

  const logout = () => {
    dispatch({
      type: LOGOUT,
    });
  };

  return (
    <AuthContext.Provider value={{ ...state, logout, login }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
