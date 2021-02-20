import React, { useState } from "react";
import PropTypes from "prop-types";
import ImageUploading from "react-images-uploading";
import { Button, Checkbox, Form, Image, Message } from "semantic-ui-react";

const ImageUploader = (props) => {
  const [profile, setProfile] = useState(null);
  const maxNumber = 1;
  const onChange = (imageList, addUpdateIndex) => {
    // data for submit
    console.log(imageList, addUpdateIndex);
    setProfile(imageList);
  };

  return (
    <ImageUploading
      multiple
      value={profile}
      onChange={onChange}
      maxNumber={maxNumber}
      dataURLKey="data_url"
    >
      {({
        imageList,
        onImageUpload,
        onImageRemoveAll,
        onImageUpdate,
        onImageRemove,
        isDragging,
        dragProps,
      }) => (
        // write your building UI
        <div
          className="upload__image-wrapper"
          style={{ display: "flex", flexDirection: "column" }}
        >
          {profile === null && (
            <Button
              basic
              color="blue"
              style={isDragging ? { color: "red" } : { margin: "0 auto" }}
              onClick={onImageUpload}
              {...dragProps}
            >
              Select picture
            </Button>
          )}
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              margin: "0.5vh auto",
            }}
          >
            {imageList.map((image, index) => (
              <div style={{ position: "relative" }}>
                <div key={index} className="image-item">
                  <img src={image["data_url"]} alt="" width="100" />
                  <div
                    className="image-item__btn-wrapper"
                    style={{ display: "flex" }}
                  >
                    <Button
                      color="blue"
                      style={{ margin: "0.5vh auto" }}
                      basic
                      onClick={() => {
                        onImageRemove(index);
                        setProfile(null);
                      }}
                    >
                      Remove
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </ImageUploading>
  );
};

export default ImageUploader;
