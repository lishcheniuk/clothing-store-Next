import {
  ADD_TO_CART,
  CHANGE_AMOUNT,
  CLEAR_CART,
  LOAD_CART,
  REMOVE_FROM_CART,
} from "../types";

export const Reducer = (state, action) => {
  let cart = state.cart.concat();

  switch (action.type) {
    case LOAD_CART:
      return { ...state, cart: action.payload };
    case ADD_TO_CART:
      const index = cart.findIndex(
        (c) => c.clothingId === action.payload.clothingId
      );

      if (index > -1) {
        cart[index] = { ...cart[index], count: cart[index].count + 1 };
      } else cart.push(action.payload);

      return { ...state, cart };
    case CHANGE_AMOUNT:
      const cartItem = cart.find((c) => c.clothingId === action.id);
      cartItem.count = cartItem.count + action.amount;

      if (cartItem.count < 1) {
        cart = cart.filter((c) => c.clothingId !== cartItem.clothingId);
      }

      return {
        ...state,
        cart,
      };
    case REMOVE_FROM_CART:
      return {
        ...state,
        cart: cart.filter((item) => item.clothingId !== action.id),
      };
    case CLEAR_CART:
      return { ...state, cart: [] };
    default:
      return state;
  }
};
