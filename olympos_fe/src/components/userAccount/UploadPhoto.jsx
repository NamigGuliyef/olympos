// FileUploadComponent.js
import React, { useCallback, useEffect, useState } from "react";
import PersonIcon from "@mui/icons-material/Person";
import Person from "@mui/icons-material/Person";
import { Box, Typography } from "@mui/material";
import { editUserProfile, getUserDetails } from "../../services/apiAuth";
import { useDropzone } from "react-dropzone";

const UploadAndDisplayImage = ({ user }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [imgIsFileFormat, setImgIsFileFormat] = useState(true);

  const [selectedImages, setSelectedImages] = useState([]);

  const onDrop = useCallback((acceptedFiles, rejectedFiles) => {
    acceptedFiles.forEach((file) => {
      setSelectedImages((prevState) => [...prevState, file]);
    });
  }, []);

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
  } = useDropzone({ onDrop });

  useEffect(() => {
    const getUser = async () => {
      try {
        const user = await getUserDetails();
        console.log("user", user);

        if (user.profile_photo) {
          setSelectedFile(user.profile_photo);
          setImgIsFileFormat(false);
        }
      } catch (error) {
        console.log(error);
      }
    };

    getUser();
  }, []);

  const handleFileChange = (event) => {
    setImgIsFileFormat(true);
    setSelectedFile(event.target.files[0]);
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
  };
  const handleRemoveChoosenImg = () => {
    setSelectedImages([]);
  };

  const handleSendImg = () => {
    // console.log("uploadUser", user);
    // console.log("selectedFile", selectedFile);
    const obj = { profile_photo: selectedFile, ...user };
    delete obj.old_password;
    delete obj.new_password;
    console.log("upload obj", obj);

    editUserProfile(obj);
  };

  return (
    <>
      {!selectedImages.length && (
        <div>
          {selectedFile ? (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                flexDirection: "column",
                gap: "1rem",
              }}
            >
              <img
                src={
                  imgIsFileFormat
                    ? URL.createObjectURL(selectedFile)
                    : selectedFile
                }
                alt="Selected file preview"
                style={{
                  border: "1px solid",
                  borderRadius: "50%",
                  width: "200px",

                  objectFit: "cover",
                  height: "200px",
                }}
              />
              <button
                style={{
                  background: "transparent",
                  border: "none",
                  outline: "none",
                  fontSize: "18px",
                }}
                onClick={handleRemoveFile}
              >
                Şəkli sil
              </button>
              {selectedFile && imgIsFileFormat && (
                <button onClick={handleSendImg}>Təsdiq</button>
              )}
            </Box>
          ) : (
            <div>
              <label htmlFor="fileInput">
                <Box
                  sx={{
                    border: "1px solid  #ccc",
                    borderRadius: "50%",
                  }}
                >
                  <PersonIcon sx={{ width: "200px", height: "200px" }} />
                </Box>
              </label>
              <input
                type="file"
                id="fileInput"
                onChange={handleFileChange}
                style={{ display: "none" }}
              />
            </div>
          )}
          {!selectedFile && (
            <Typography
              sx={{ textAlign: "center", color: "black", fontSize: "18px" }}
            >
              Şəkil yüklə
            </Typography>
          )}
        </div>
      )}
      <div>
        <div>
          {/* {selectedImages.length > 0 &&
            selectedImages.map((image, index) => (
              <img src={`${URL.createObjectURL(image)}`} key={index} alt="" />
            ))} */}
          {selectedImages.length > 0 && (
            <img
              alt="Selected file preview"
              style={{
                border: "1px solid",
                borderRadius: "50%",
                width: "200px",

                objectFit: "cover",
                height: "200px",
              }}
              src={`${URL.createObjectURL(
                selectedImages[selectedImages.length - 1]
              )}`}
            />
          )}
          {selectedImages.length && (
            <button onClick={handleSendImg}>Təsdiq</button>
          )}
          <button onClick={handleRemoveChoosenImg}>Sekli sil</button>
        </div>
        <div {...getRootProps()}>
          <input {...getInputProps()} />
          {isDragActive ? <p>Drop file(s) here ...</p> : <div>Sec</div>}
        </div>
      </div>
    </>
  );
};

export default UploadAndDisplayImage;
