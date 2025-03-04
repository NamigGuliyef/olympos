// import { Box, Button, Stack, TextField, Typography } from "@mui/material";
// import React, { useEffect, useState } from "react";
// import { CustomContainer, FlexBetween, theme } from "../../theme";
// import { getUserDetails } from "../../services/apiAuth";
// import AdminModal from "../../components/reusable/AdminModal";

// const Account = ({ user }) => {
//   const [openModal, setOpenModal] = useState(false);
//   const [inputs, setInputs] = useState({
//     name: user?.first_name || "sss",
//     email: user?.email || "",
//     address: "",
//     phone: user?.phone_number || "",
//     birth_date: "",
//   });

//   const handleAccountModal = (name) => {
//     setOpenModal(true);
//   };

//   const handleChange = (event) => {
//     const { name, email, phone, birth_date } = event.target;
//   };

//   const handleSubmit = (e, data) => {
//     e.preventDefault();
//   };

//   return (
//     <Box
//       sx={{
//         backgroundColor: "white",
//         padding: "2rem",
//         borderRadius: "10px",
//       }}
//     >

//       <AdminModal
//         tableIsExist={false}
//         setShowInput={setOpenModal}
//         openOrClose={openModal}
//       >
//         <Typography
//           sx={{
//             fontSize: "20px",
//             textAlign: "center",
//             mb: "1rem",
//           }}
//         >
//           Məlumatları dəyişdir
//         </Typography>
//         <form onSubmit={handleSubmit}>
//           {/* <Box
//             sx={{
//               display: "flex",
//               alignItems: "center",
//               justifyContent: "center",
//               gap: "1rem",
//               flexWrap: "wrap",
//             }}
//           > */}
//           <TextField
//             onChange={handleChange}
//             required
//             id="outlined-required"
//             label="name"
//             // defaultValue={user?.first_name || ""}
//             defaultValue={inputs.name}
//           />
//           <TextField
//             defaultValue={inputs.email}
//             onChange={handleChange}
//             required
//             id="outlined-required"
//             label="email"
//             // defaultValue={user?.email || ""}
//           />
//           <TextField
//             defaultValue={inputs.phone}
//             onChange={handleChange}
//             required
//             id="outlined-required"
//             label="phone"
//             // defaultValue={user?.phone_number || ""}
//           />
//           <TextField
//             defaultValue={inputs.birth_date}
//             onChange={handleChange}
//             required
//             id="outlined-required"
//             label="birth_date"
//             // defaultValue="Date of Birth"
//           />
//           {/* </Box> */}
//           <Button
//             type="submit"
//             sx={{
//               backgroundColor: `${theme.palette.primary.main}`,
//               width: "100%",
//               mt: "1rem",
//             }}
//           >
//             Təsdiq et
//           </Button>
//         </form>
//       </AdminModal>
//     </Box>
//   );
// };

// export default Account;

import React, { useState } from "react";
import {
  Box,
  Button,
  Stack,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import AdminModal from "../../components/reusable/AdminModal";
import { FlexBetween, theme } from "../../theme";
import { editUserProfile } from "../../services/apiAuth";
import toast from "react-hot-toast";
import UploadAndDisplayImage from "./UploadPhoto";
import DropzoneComponent from "../DropzoneComponent";

const Account = ({ user }) => {
  const [openModal, setOpenModal] = useState(false);
  const [inputs, setInputs] = useState({
    first_name: user?.first_name,
    last_name: user?.last_name,
    email: user?.email,
    phone_number: user?.phone_number,
    old_password: "",
    new_password: "",
  });
  const [selectedImages, setSelectedImages] = useState([]);
  const tablet = useMediaQuery("(max-width: 600px)");

  const handleAccountModal = (field) => {
    setOpenModal(true);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  // change user profile photo
  const handleUserImgSubmit = () => {
    const formData = new FormData();
    formData.append("first_name", user.first_name);
    formData.append("last_name", user.last_name);
    formData.append("email", user.email);
    formData.append("phone_number", user.phone_number);
    formData.append("profile_photo", selectedImages[0]);
    // for (var pair of formData.entries()) {
    //   console.log(pair[0] + ": " + pair[1]);
    // }
    editUserProfile(formData).then((data) =>
      console.log("data: " + data.statusCode)
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setOpenModal(false);
    const formData = new FormData();
    let newObj = {};
    newObj = { ...inputs };
    // if (!inputs.new_password && !inputs.old_password) {
    //   delete newObj.new_password;
    //   delete newObj.old_password;
    // }
    formData.append("first_name", newObj.first_name);
    formData.append("last_name", newObj.last_name);
    formData.append("email", newObj.email);
    formData.append("phone_number", newObj.phone_number);
    if (newObj.new_password && newObj.old_password) {
      formData.append("new_password", newObj.new_password);
      formData.append("old_password", newObj.old_password);
    }

    // for (var pair of formData.entries()) {
    //   console.log(pair[0] + ": " + pair[1]);
    // }

    editUserProfile(formData).then((res) => {
      if (res.statusCode === 401) {
        toast.error(res.message);
      }
    });
  };

  return (
    <Box
      sx={{ backgroundColor: "white", padding: "2rem", borderRadius: "10px" }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          flexDirection: tablet ? "column" : "row",
          gap: "5rem",
        }}
      >
        <Box sx={{ width: "200px" }}>
          <UploadAndDisplayImage user={inputs} />
          <DropzoneComponent
            maxFiles={1}
            selectedImages={selectedImages}
            setSelectedImages={setSelectedImages}
          />
          {selectedImages.length ? (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                mt: "1rem",
              }}
            >
              <Button
                sx={{
                  background: `${theme.palette.primary.main}`,
                  color: "white",
                  textTransform: "capitalize",
                }}
                onClick={handleUserImgSubmit}
                type="submit"
              >
                Şəkili dəyiş
              </Button>
            </Box>
          ) : (
            <span></span>
          )}
        </Box>
        <Box sx={{ width: "100%" }}>
          <FlexBetween sx={{ mb: "3rem" }}>
            <Stack>
              <Typography variant="subtitle2" sx={{ color: "gray" }}>
                First Name
              </Typography>
              <Typography variant="subtitle1">
                {user?.first_name || ""}
              </Typography>
            </Stack>
            <Button onClick={() => handleAccountModal("name")}>Change</Button>
          </FlexBetween>
          <FlexBetween sx={{ mb: "3rem" }}>
            <Stack>
              <Typography variant="subtitle2" sx={{ color: "gray" }}>
                Last Name
              </Typography>
              <Typography variant="subtitle1">
                {user?.last_name || ""}
              </Typography>
            </Stack>
            <Button onClick={() => handleAccountModal("name")}>Change</Button>
          </FlexBetween>
          <FlexBetween sx={{ mb: "3rem" }}>
            <Stack>
              <Typography variant="subtitle2" sx={{ color: "gray" }}>
                Email
              </Typography>
              <Typography variant="subtitle1">{user?.email || ""}</Typography>
            </Stack>
            <Button onClick={() => handleAccountModal("email")}>Change</Button>
          </FlexBetween>
          <FlexBetween sx={{ mb: "3rem" }}>
            <Stack>
              <Typography variant="subtitle2" sx={{ color: "gray" }}>
                Phone Number
              </Typography>
              <Typography variant="subtitle1">
                {user?.phone_number || ""}
              </Typography>
            </Stack>
            <Button onClick={() => handleAccountModal("phoneNumber")}>
              Change
            </Button>
          </FlexBetween>
        </Box>
      </Box>
      <AdminModal
        tableIsExist={false}
        setShowInput={setOpenModal}
        openOrClose={openModal}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: "2rem",
            borderRadius: "12px",
            boxShadow: 3,
            background: "linear-gradient(135deg, #f5f7fa, #c3cfe2)",
          }}
        >
          <Typography
            sx={{
              fontSize: "22px",
              fontWeight: "bold",
              textAlign: "center",
              mb: "1.5rem",
              color: theme.palette.primary.dark,
            }}
          >
            Məlumatları dəyişdir
          </Typography>

          <form onSubmit={handleSubmit} style={{ width: "100%" }}>
            <Stack spacing={2}>
              <TextField
                value={inputs.first_name}
                onChange={handleChange}
                name="first_name"
                label="Ad"
                required
                fullWidth
                variant="outlined"
                sx={{ borderRadius: "8px" }}
              />
              <TextField
                value={inputs.last_name}
                onChange={handleChange}
                name="last_name"
                label="Soyad"
                required
                fullWidth
                variant="outlined"
                sx={{ borderRadius: "8px" }}
              />
              <TextField
                value={inputs.email}
                onChange={handleChange}
                name="email"
                label="Email"
                required
                fullWidth
                variant="outlined"
                sx={{ borderRadius: "8px" }}
              />
              <TextField
                value={inputs.phone_number}
                onChange={handleChange}
                name="phone_number"
                label="Telefon"
                required
                fullWidth
                variant="outlined"
                sx={{ borderRadius: "8px" }}
              />
              <TextField
                type="password"
                value={inputs.old_password}
                onChange={handleChange}
                name="old_password"
                label="Köhnə parol"
                fullWidth
                variant="outlined"
                sx={{ borderRadius: "8px" }}
              />
              <TextField
                type="password"
                value={inputs.new_password}
                onChange={handleChange}
                name="new_password"
                label="Yeni parol"
                fullWidth
                variant="outlined"
                sx={{ borderRadius: "8px" }}
              />
            </Stack>

            <Button
              type="submit"
              fullWidth
              sx={{
                mt: 3,
                p: 1.5,
                borderRadius: "8px",
                background: "linear-gradient(135deg, #667eea, #764ba2)",
                color: "white",
                fontWeight: "bold",
                "&:hover": {
                  background: "linear-gradient(135deg, #5a67d8, #6b46c1)",
                },
              }}
              onClick={() => toast.success("Profil məlumatı dəyişdi")} // Toast mesajı
            >
              Təsdiq et
            </Button>
          </form>
        </Box>
      </AdminModal>

    </Box>
  );
};

export default Account;
