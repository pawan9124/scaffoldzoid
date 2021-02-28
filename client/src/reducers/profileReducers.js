const initialState = {
  profiles: {},
  allProfiles: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case "SET_CURRENT_PROFILE":
      return {
        ...state,
        profiles: action.payload,
      };
    case "SET_ALL_PROFILES":
      return {
        ...state,
        allProfiles: action.payload,
      };
    default:
      return state;
  }
}
