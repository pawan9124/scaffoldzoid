import axios from "../axios";

//This action for auth is called when an actons happen

//Profile  user
export const saveProfile = (userData, history) => (dispatch) => {
  try {
    axios
      .post("/api/profiles/create", userData)
      .then((res) => {
        dispatch({
          type: "SET_CURRENT_PROFILE",
          payload: res.data,
        });
      })
      .catch((error) => {
        dispatch({
          type: "GET_ERRORS",
          payload: error,
        });
      });
    dispatch({
      type: "SET_ALERT_SUCCESS",
      payload: {
        isAlertSuccess: true,
        opentAlertBox: true,
        message: "Profile Saved Successfully!",
      },
    });
  } catch (error) {
    dispatch({
      type: "GET_ERRORS",
      payload: error,
    });
    dispatch({
      type: "SET_ALERT_SUCCESS",
      payload: {
        isAlertSuccess: false,
        opentAlertBox: true,
        message: "Profile Saved Failed!",
      },
    });
  }
};

export const fetchProfileById = (id) => async (dispatch) => {
  try {
    const result = await axios.get("/api/profiles/getSingleProfile", {
      params: {
        id,
      },
    });
    dispatch({
      type: "SET_CURRENT_PROFILE",
      payload: result.data,
    });
    dispatch({
      type: "SET_ALERT_SUCCESS",
      payload: {
        isAlertSuccess: true,
        opentAlertBox: true,
        message: "Profile Fetched!",
      },
    });
  } catch (error) {
    dispatch({
      type: "GET_ERRORS",
      payload: error,
    });
    dispatch({
      type: "SET_ALERT_SUCCESS",
      payload: {
        isAlertSuccess: false,
        opentAlertBox: true,
        message: "Profile Fetched Failed!",
      },
    });
  }
};

export const fetchAllProfiles = () => async (dispatch) => {
  try {
    const result = await axios.get("/api/profiles/getAllProfiles");
    dispatch({
      type: "SET_ALL_PROFILES",
      payload: result.data,
    });
    dispatch({
      type: "SET_ALERT_SUCCESS",
      payload: {
        isAlertSuccess: true,
        opentAlertBox: true,
        message: "All Profile Fetched!",
      },
    });
  } catch (error) {
    dispatch({
      type: "GET_ERRORS",
      payload: error,
    });
    dispatch({
      type: "SET_ALERT_SUCCESS",
      payload: {
        isAlertSuccess: false,
        opentAlertBox: true,
        message: "Could not fetch profile!",
      },
    });
  }
};
