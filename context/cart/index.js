import React, { useReducer } from "react";
import { Reducer } from "./reducer";
import {
  ADD_TO_CART,
  REMOVE_FROM_CART,
  CHANGE_AMOUNT,
  CLEAR_CART,
  LOAD_CART,
} from "../types";

export const CartContext = React.createContext();

export function CartState({ children }) {
  const initialState = {
    cart: [],
  };

  const [state, dispatch] = useReducer(Reducer, initialState);

  const totalPrice = () => {
    return state.cart.reduce((total, item) => {
      return total + parseInt(item.price) * parseInt(item.count);
    }, 0);
  };

  const loadCart = (payload) => {
    dispatch({ type: LOAD_CART, payload });
  };

  const addToCart = (payload) => {
    dispatch({ type: ADD_TO_CART, payload });
  };

  const removeFromCart = (id) => {
    dispatch({ type: REMOVE_FROM_CART, id });
  };

  const changeAmount = (id, amount) => {
    dispatch({ type: CHANGE_AMOUNT, amount, id });
  };

  const clearCart = () => {
    dispatch({ type: CLEAR_CART });
  };

  const sendOrder = (payload) => {
    clearCart();
  };

  return (
    <CartContext.Provider
      value={{
        cart: state.cart,
        addToCart,
        totalPrice,
        changeAmount,
        removeFromCart,
        sendOrder,
        loadCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
