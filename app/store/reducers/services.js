import { SET_SERVICES } from "../actions/actionsTypes";

const initialState = {
  services: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_SERVICES:
      return {
        ...state,
        services: action.services
      };
    default:
      return state;
  }
};

export default reducer;
