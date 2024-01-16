import { useDropzone } from "react-dropzone";
import { Box, IconButton } from "@mui/material";
import { FlexBetween } from "../theme";
import { DeleteOutlined } from "@mui/icons-material";
import { useCallback } from "react";

export default function DropzoneComponent({
  selectedImages,
  setSelectedImages,
  onChange,
  onBlur,
  selected,
  initialFiles,
  maxFiles,
}) {
  // const onDrop = useCallback(
  //   (acceptedFiles, rejectedFiles) => {
  //     setSelectedImages((prevState) => [...prevState, ...acceptedFiles]);
  //   },
  //   [setSelectedImages]
  // );
  const onDrop = (acceptedFiles, rejectedFiles) => {
    setSelectedImages((prevState) => [...prevState, ...acceptedFiles]);
  };

  console.log("selectedimg", selected);

  const renderSelectedImages = () => {
    return selectedImages.map((image, index) => (
      <Box
        key={index}
        sx={{
          width: "100px",
          height: "100px",
        }}
      >
        <img
          width="100%"
          height="100%"
          style={{ objectFit: "cover" }}
          src={URL.createObjectURL(image)}
          alt="hotel photo"
        />
      </Box>
    ));
  };

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
  } = useDropzone({ onDrop, accept: "image/png", maxFiles });

  return (
    <Box
      border={`2px dashed black`}
      p="1rem"
      width="100%"
      sx={{ "&:hover": { cursor: "pointer" } }}
    >
      <div className="dropzone" {...getRootProps()}>
        <input {...getInputProps({ onChange })} />
        {isDragActive ? (
          <p>Drop file(s) here ...</p>
        ) : (
          <p>Drag and drop file(s) here, or click to select files</p>
        )}
      </div>
      <FlexBetween>
        <Box sx={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          {selectedImages.length > 0 && renderSelectedImages()}
        </Box>
        {selectedImages.length > 0 && (
          <IconButton
            onClick={() => setSelectedImages([])}
            sx={{ width: "50px", height: "50px" }}
          >
            <DeleteOutlined />
          </IconButton>
        )}
      </FlexBetween>
    </Box>
  );
}
