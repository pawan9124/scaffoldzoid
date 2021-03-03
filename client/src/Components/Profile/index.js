import React, { useEffect, useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import TextField from "@material-ui/core/TextField";
import Button from "../Reusable/Button";
import { withRouter } from "react-router-dom";
import Chart from "../Chart";
import validator from "validator";
import ImageUploader from "../Reusable/ImageUploader";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { saveProfile, fetchProfileById } from "../../actions/profileActions";
import "./style.css";

function Profile(props) {
  const [sentImageFiles, setSentImageFiles] = useState([]);
  const [imageFiles, setImageFiles] = useState([]);
  const [description, setDescription] = useState("");
  const [errors, setErrors] = useState({});

  /* Get the user details from the redux store for seller usage*/
  const userDetails = useSelector((state) => {
    return state.auth.user;
  });
  /* Get the current profile details from the redux store  for both seller and customer (get name of seller)*/
  const currentProfile = useSelector((state) => state?.profile?.profiles[0]);
  const dispatchProps = useDispatch();
  const history = useHistory();

  /* use effect to fetch the user profile information in redux store*/
  useEffect(() => {
    dispatchProps(fetchProfileById(props.match.params.id));
  }, [props.match.params.id]);

  /* Use effect to set the current profile to the fields (image,description) */
  useEffect(() => {
    if (currentProfile && Object.keys(currentProfile).length > 0) {
      setImageFiles([{ imagePreviewUrl: currentProfile.avatar }]);
      setDescription(currentProfile.description);
    }
  }, [currentProfile]);

  /* Handle the submit button to save the profile and image */
  const handleSubmitButton = (e) => {
    const tempErrors = {};
    e.preventDefault();
    if (validator.isEmpty(description)) {
      tempErrors.description = "Please enter description";
    }
    /* Sending data in the form  data with the image */
    if (Object.keys(tempErrors).length === 0) {
      const fd = new FormData();
      fd.append("description", description);
      fd.append("user", userDetails.id);
      if (sentImageFiles[0] && sentImageFiles[0][0]) {
        fd.append("avatar", sentImageFiles[0][0]);
      }
      dispatchProps(saveProfile(fd, history));
    } else {
      setErrors(tempErrors);
    }
  };
  return (
    <div className="profile_section" data-test="ProfileComponent">
      {userDetails?.isSeller && <h5>Hello, {userDetails?.username}</h5>}
      {!userDetails?.isSeller && (
        <h4>Mr/Ms. {currentProfile?.user?.username}</h4>
      )}
      {/* Profile about section */}
      {userDetails?.isSeller && props.match.params.id === userDetails?.id && (
        <div className="profile_name_section">
          <Button
            type="submit"
            onClick={handleSubmitButton}
            buttonClass="default__button profile_button"
            buttonLabel="Save"
          />
        </div>
      )}
      <div className="profile_about">
        <div className="profile_image_section">
          <Avatar
            alt="C"
            src={imageFiles[0]?.imagePreviewUrl}
            className="profile_image"
          />
          {/* Seller to upload image */}
          {userDetails?.isSeller &&
            props.match.params.id === userDetails?.id && (
              <ImageUploader
                setSentImageFiles={setSentImageFiles}
                setImageFiles={setImageFiles}
              />
            )}
        </div>
        <div className="profile_description_section">
          <TextField
            id="outlined-basic"
            label={description ? "" : "Description"}
            variant="outlined"
            multiline
            rows={5}
            fullWidth={true}
            defaultValue={description}
            InputProps={{
              readOnly:
                !userDetails?.isSeller ||
                props.match.params.id !== userDetails?.id,
            }}
            onChange={(e) => setDescription(e.target.value)}
          />
          {errors.description && (
            <small className="register__validationErrors">
              {errors.description}
            </small>
          )}
        </div>
      </div>
      {/* Display chart area */}
      <div className="profile_chart">
        <h2>Chart Details</h2>
        <Chart />
      </div>
    </div>
  );
}

export default withRouter(Profile);
