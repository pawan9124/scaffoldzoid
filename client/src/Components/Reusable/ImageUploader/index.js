import React, { useState } from "react";
import { IconButton } from "@material-ui/core";
import PhotoCamera from "@material-ui/icons/PhotoCamera";
import PropTypes from "prop-types";
import "./style.css";

const ImageUploader = (props) => {
  const [imageSatus, setImageStatus] = useState(false);
  //handle image changes
  const handleImageChange = (e) => {
    const dataFile = [];
    const rawFiles = [];
    const files = e.target.files;
    const length = files.length;
    rawFiles.push(files);
    return Promise.all(
      [].map.call(files, function (file) {
        return new Promise(function (resolve, reject) {
          var reader = new FileReader();
          reader.onloadend = function () {
            resolve({ result: reader.result, file: file });
          };
          reader.readAsDataURL(file);
        });
      })
    ).then((results) => {
      results.forEach((result) => {
        dataFile.push({ file: result.file, imagePreviewUrl: result.result });
        if (length === dataFile.length) {
          const newImages = [...dataFile];
          const newSentImages = [files];
          props.setSentImageFiles(newSentImages);
          props.setImageFiles(newImages);
          setImageStatus(true);
        }
      });
    });
  };
  return (
    <div className="image-upload">
      <label htmlFor="icon-button-file" title="Upload image">
        <IconButton color="primary" component="span">
          <PhotoCamera />
        </IconButton>
      </label>
      <input
        accept="image/*"
        id="icon-button-file"
        onChange={handleImageChange}
        type="file"
        style={{ display: "none" }}
      />
      {imageSatus && (
        <small className="register__validationErrors">
          Please click save button to save image
        </small>
      )}
    </div>
  );
};

ImageUploader.propTypes = {
  setSentImageFiles: PropTypes.func.isRequired,
  setImageFiles: PropTypes.func.isRequired,
};

export default ImageUploader;
