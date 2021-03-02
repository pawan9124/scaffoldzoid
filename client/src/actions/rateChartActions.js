import axios from "../axios";

/* 
  Add rate chart for the seller from chart component
*/
export const addRate = (userData, history) => (dispatch) => {
  try {
    axios
      .post("/api/rates/create", userData)
      .then((res) => {
        dispatch({
          type: "SET_ALL_RATES",
          payload: res.data,
        });
        dispatch({
          type: "SET_ALERT_SUCCESS",
          payload: {
            isAlertSuccess: true,
            opentAlertBox: true,
            message: "Rate Added successfully",
          },
        });
      })
      .catch((error) => {
        dispatch({
          type: "GET_ERRORS",
          payload: error.response.data,
        });
        dispatch({
          type: "SET_ALERT_SUCCESS",
          payload: {
            isAlertSuccess: false,
            opentAlertBox: true,
            message: "Rate Add Request Failed!",
          },
        });
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
        message: "Rate Add Request Failed!",
      },
    });
  }
};

/* 
  Fetch rate chart for the seller from chart component
*/
export const fetchRateChart = (user) => async (dispatch) => {
  try {
    const result = await axios.get("/api/rates/get", {
      params: {
        user,
      },
    });
    dispatch({
      type: "SET_ALL_RATES",
      payload: result.data,
    });
    dispatch({
      type: "SET_ALERT_SUCCESS",
      payload: {
        isAlertSuccess: true,
        opentAlertBox: true,
        message: "Rate Fetched successfully!",
      },
    });
  } catch (error) {
    dispatch({
      type: "GET_ERRORS",
      payload: error.response.data,
    });
    dispatch({
      type: "SET_ALERT_SUCCESS",
      payload: {
        isAlertSuccess: false,
        opentAlertBox: true,
        message: "Rate Fetch Request Failed!",
      },
    });
  }
};

/* 
  Update rate chart for the seller from chart component
*/
export const updateRate = (updateData) => async (dispatch) => {
  try {
    const result = await axios.put("/api/rates/update", updateData);
    dispatch({
      type: "SET_ALL_RATES",
      payload: result.data,
    });
    dispatch({
      type: "SET_ALERT_SUCCESS",
      payload: {
        isAlertSuccess: true,
        opentAlertBox: true,
        message: "Rate Updated Successfully!",
      },
    });
  } catch (error) {
    dispatch({
      type: "GET_ERRORS",
      payload: error.response.data,
    });
    dispatch({
      type: "SET_ALERT_SUCCESS",
      payload: {
        isAlertSuccess: false,
        opentAlertBox: true,
        message: "Rate Update Request Failed!",
      },
    });
  }
};

/* 
  Delete chart for the seller from chart component
*/

export const deleteRate = (id, user) => async (dispatch) => {
  try {
    const result = await axios.delete("/api/rates/delete", {
      params: {
        id,
        user,
      },
    });
    dispatch({
      type: "SET_ALL_RATES",
      payload: result.data,
    });
    dispatch({
      type: "SET_ALERT_SUCCESS",
      payload: {
        isAlertSuccess: true,
        opentAlertBox: true,
        message: "Rate Deleted Successfully!",
      },
    });
  } catch (error) {
    dispatch({
      type: "GET_ERRORS",
      payload: error.response.data,
    });
    dispatch({
      type: "SET_ALERT_SUCCESS",
      payload: {
        isAlertSuccess: false,
        opentAlertBox: true,
        message: "Rate Delete Request Failed!",
      },
    });
  }
};
