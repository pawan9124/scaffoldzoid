import React, { useEffect } from "react";
import Button from "@material-ui/core/Button";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
}));

export default function AlertBar() {
  const classes = useStyles();
  const dispatchProps = useDispatch();

  let alertStatus = useSelector((state) => {
    return state.alert.alert;
  });

  let severity = alertStatus?.isAlertSuccess ? "success" : "error";
  const message = alertStatus?.message;
  const openAlert = alertStatus?.opentAlertBox;

  const handleClose = (event, reason) => {
    if (event || reason === "timeout") {
      if (reason === "clickaway") {
        return;
      }
      dispatchProps({
        type: "CLEAR_ALERT_SUCCESS",
        payload: {
          isAlertSuccess: false,
          message: "",
          opentAlertBox: false,
        },
      });
    }
  };
  return (
    <div className={classes.root} data-test="AlertBarComponent">
      <Snackbar open={openAlert} autoHideDuration={3000} onClose={handleClose}>
        <Alert
          onClose={(e, reason) => handleClose(e, reason)}
          severity={severity}
        >
          {message}
        </Alert>
      </Snackbar>
    </div>
  );
}
