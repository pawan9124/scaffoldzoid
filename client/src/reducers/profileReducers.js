const initialState = {
  profiles: {},
};

export default function (state = initialState, action) {
  switch (action.type) {
    case "SET_CURRENT_PROFILE":
      return {
        ...state,
        profiles: action.payload,
      };
    default:
      return state;
  }
}
