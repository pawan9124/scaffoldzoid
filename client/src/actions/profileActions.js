import axios from "../axios";

//This action for auth is called when an actons happen

//Profile  user
export const saveProfile = (userData, history) => (dispatch) => {
  console.log("UserData----->", userData);
  for (var pair of userData.entries()) {
    console.log(pair[0] + ", " + pair[1]);
  }
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
        console.log("error", error);
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

export const fetchProfileById = (id) => async (dispatch) => {
  console.log("IDDID", id);
  try {
    const result = await axios.get("/api/profiles/getSingleProfile", {
      params: {
        id,
      },
    });
    console.log("result", result);
    dispatch({
      type: "SET_CURRENT_PROFILE",
      payload: result.data,
    });
  } catch (error) {
    dispatch({
      type: "GET_ERRORS",
      payload: error,
    });
  }
};
