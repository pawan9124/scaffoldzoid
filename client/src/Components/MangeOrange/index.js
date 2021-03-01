import React, { useEffect, useState } from "react";
import InputBox from "../Reusable/InputBox";
import Modal from "../Reusable/Modal";
import { addRate, updateRate } from "../../actions/rateChartActions";
import validator from "validator";
import { useSelector, useDispatch } from "react-redux";
import PropTypes from "prop-types";

const ModalBody = (props) => {
  const [orangeType, setOrangeType] = useState("");
  const [orangeRate, setOrangeRate] = useState(0);
  const [errors, setErrors] = useState({});

  const dispatchProps = useDispatch();
  const userDetail = useSelector((state) => state.auth.user);

  /* Set the current data for the modal */
  useEffect(() => {
    if (props.eventType === "edit") {
      setOrangeRate(props?.editData?.rate);
      setOrangeType(props?.editData?.type);
    }
  }, [props.editData]);

  const handleOrangeEvent = () => {
    const tempErrors = {};
    if (orangeType === undefined || validator.isEmpty(orangeType)) {
      tempErrors.orangeType = "Please enter orange type";
    }
    if (orangeRate === undefined || validator.isEmpty(orangeRate)) {
      tempErrors.orangeRate = "Please enter orange rate";
    }
    if (Object.keys(tempErrors).length === 0) {
      /* Process for the add type */
      if (props.eventType === "add") {
        const addData = {
          user: userDetail.id,
          type: orangeType,
          rate: orangeRate,
        };
        dispatchProps(addRate(addData));
      } else {
        /* process for the edit type */
        const updateData = {
          id: props.editData._id,
          user: userDetail.id,
          type: orangeType,
          rate: orangeRate,
        };
        dispatchProps(updateRate(updateData));
      }
      props.setIsOpen(false);
    } else {
      setErrors(tempErrors);
    }
  };
  return (
    <Modal
      isOpen={props.isOpen}
      setIsOpen={props.setIsOpen}
      handleOrangeEvent={handleOrangeEvent}
      eventType={props.eventType}
    >
      <div data-test="ManageOrangeComponent">
        <InputBox
          type="text"
          value={orangeType}
          handleChange={setOrangeType}
          placeholder="Please an orange type"
          name="orangetype"
          label="Orange Type"
          errors={errors.orangeType}
        />

        <br></br>
        <InputBox
          type="number"
          value={orangeRate}
          handleChange={setOrangeRate}
          placeholder="Please enter rate per kg"
          name="orangerate"
          label="Orange Rate"
          errors={errors.orangeRate}
        />
      </div>
    </Modal>
  );
};

ModalBody.propTypes = {
  eventType: PropTypes.string.isRequired,
  isOpen: PropTypes.bool.isRequired,
  setIsOpen: PropTypes.func.isRequired,
};

export default ModalBody;
