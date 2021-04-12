import React, { useReducer } from "react";
import { CLEAR_USER, SET_USER } from "../types";
import { AuthReducer } from "./reducer";

export const AuthContext = React.createContext();

export const AuthState = ({ children }) => {
  const initialState = {
    user: null,
  };

  const [state, dispatch] = useReducer(AuthReducer, initialState);

  const setUser = (payload) => {
    dispatch({ type: SET_USER, payload });
  };

  const clearUser = () => {
    dispatch({ type: CLEAR_USER });
  };

  return (
    <AuthContext.Provider value={{ user: state.user, setUser, clearUser }}>
      {children}
    </AuthContext.Provider>
  );
};
