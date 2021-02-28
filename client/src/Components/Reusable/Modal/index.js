import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Button from "../Button";
import "./style.css";

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

export default function SimpleModal(props) {
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [open, setOpen] = React.useState(false);

  useEffect(() => {
    setOpen(props.isOpen);
  }, [props.isOpen]);

  const handleClose = () => {
    setOpen(false);
    props.setIsOpen(false);
  };

  const body = (
    <div className={`${classes.paper} modal_body_position`}>
      <h2 id="simple-modal-title">
        {props.eventType === "add" ? "Add" : "Edit"} Orange Types
      </h2>
      <p id="simple-modal-description">
        {props.eventType === "add" ? "Add" : "Edit"} orange types to your
        inventory and provide various flavors to the user.
      </p>
      <div>{props.children}</div>
      <div className="modal_body">
        <Button
          type="submit"
          onClick={(e) => handleClose()}
          buttonClass="default__button profile_button"
          buttonLabel="Close"
        />
        <Button
          type="submit"
          onClick={(e) => props.handleOrangeEvent()}
          buttonClass="default__button profile_button"
          buttonLabel="Save"
        />
      </div>
    </div>
  );

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        className="modal_position"
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
    </div>
  );
}
