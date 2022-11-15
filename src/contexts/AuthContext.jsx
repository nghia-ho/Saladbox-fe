import React from "react";
import { createContext, useReducer, useEffect } from "react";
import apiService from "../app/apiService";
import { isValidToken } from "../utils/jwt";

const initialState = {
  isAuthenticated: false,
  isInitialized: false,
  user: null,
};

const LOGIN_SUCCESS = "LOGIN_SUCCESS";
const LOGOUT = "LOGOUT";
const REGISTER_SUCCESS = "REGISTER_SUCCESS";
const INITIALIZE = "INITIALIZE";

const reducer = (state, action) => {
  switch (action.type) {
    case INITIALIZE:
      const { isAuthenticated, user } = action.payload;
      return {
        ...state,
        isAuthenticated,
        isInitialized: true,
        user,
      };

    case LOGIN_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user.name,
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
        if (accessToken && isValidToken(accessToken)) {
          setSession(accessToken);
          dispatch({
            type: INITIALIZE,
            payload: { isAuthenticated: true, user: { user } },
          });
        } else {
          setSession(null);
          dispatch({
            type: INITIALIZE,
            payload: { isAuthenticated: false, user: null },
          });
        }
      } catch (err) {
        setSession(null);
        dispatch({
          type: INITIALIZE,
          payload: {
            isAuthenticated: false,
            user: null,
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
      payload: { user: { name: user.name } },
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
    setSession(null);
    dispatch({ type: LOGOUT });
    callback();
  };

  return (
    <AuthContext.Provider value={{ ...state, logout, login, register }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
