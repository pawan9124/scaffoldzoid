import axios from "../axios";

//This action for auth is called when an actons happen

//Profile  user
export const addRate = (userData, history) => (dispatch) => {
  try {
    axios
      .post("/api/rates/create", userData)
      .then((res) => {
        dispatch({
          type: "SET_CURRENT_RATE",
          payload: res.data,
        });
      })
      .catch((error) => {
        dispatch({
          type: "GET_ERRORS",
          payload: error,
        });
      });
  } catch (error) {
    dispatch({
      type: "GET_ERRORS",
      payload: error,
    });
  }
};

export const fetchRateChart = (user) => async (dispatch) => {
  console.log("IDDD_---------------", user);
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
  } catch (error) {
    dispatch({
      type: "GET_ERRORS",
      payload: error,
    });
  }
};

export const updateRate = (updateData) => async (dispatch) => {
  console.log("IDDD_---------------", updateData);
  try {
    const result = await axios.put("/api/rates/update", updateData);
    dispatch({
      type: "SET_CURRENT_RATE",
      payload: result.data,
    });
  } catch (error) {
    dispatch({
      type: "GET_ERRORS",
      payload: error,
    });
  }
};

export const deleteRate = (id) => async (dispatch) => {
  console.log("IDDD_---------------", id);
  try {
    const result = await axios.delete("/api/rates/delete", {
      params: {
        id,
      },
    });
    dispatch({
      type: "SET_CURRENT_RATE",
      payload: result.data,
    });
  } catch (error) {
    dispatch({
      type: "GET_ERRORS",
      payload: error,
    });
  }
};
