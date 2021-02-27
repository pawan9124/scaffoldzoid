/* eslint-disable import/no-anonymous-default-export */
const initialState = {
  currentRate: {},
  allRates: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case "SET_CURRENT_RATE":
      return {
        ...state,
        currentRate: action.payload,
      };
    case "SET_ALL_RATES":
      return {
        ...state,
        allRates: action.payload,
      };
    default:
      return state;
  }
}
