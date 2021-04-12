import { CLEAR_USER, SET_USER } from "../types";

const handlers = {
  [SET_USER]: (state, { payload }) => ({ ...state, user: payload }),
  [CLEAR_USER]: (state) => ({ ...state, user: null }),
  default: (state) => state,
};

export const AuthReducer = (state, action) => {
  const handle = handlers[action.type] || handlers.default;
  return handle(state, action);
};
