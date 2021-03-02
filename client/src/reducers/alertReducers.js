const initialState = {
  alert: {
    isAlertSuccess: false,
    message: "",
    opentAlertBox: false,
  },
};

export default function (state = initialState, action) {
  switch (action.type) {
    case "SET_ALERT_SUCCESS":
      return {
        ...state,
        alert: action.payload,
      };
    case "CLEAR_ALERT_SUCCESS":
      return {
        ...state,
        alert: action.payload,
      };
    default:
      return state;
  }
}
