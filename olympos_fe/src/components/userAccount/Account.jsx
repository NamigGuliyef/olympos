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
//     console.log("val", name);
//   };

//   const handleSubmit = (e, data) => {
//     e.preventDefault();
//     console.log("submit", e.target);
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
import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import AdminModal from "../../components/reusable/AdminModal";
import { FlexBetween, theme } from "../../theme";
import { editUserProfile } from "../../services/apiAuth";
import toast from "react-hot-toast";
import UploadAndDisplayImage from "./UploadPhoto";

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

  const handleSubmit = (e) => {
    e.preventDefault();
    setOpenModal(false);
    if (inputs.new_password && inputs.old_password) {
      // const newObj = { ...inputs, password: inputs.new_password };
      // delete newObj.new_password;
      // delete newObj.old_password;

      // console.log("newObj", newObj);
      editUserProfile(inputs).then((res) => {
        if (res.statusCode === 401) {
          toast.error(res.message);
        }
      });
    }
  };

  return (
    <Box
      sx={{ backgroundColor: "white", padding: "2rem", borderRadius: "10px" }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: "1rem" }}>
        <Box sx={{ width: "200px" }}>
          <UploadAndDisplayImage user={inputs} />
        </Box>
        <Box sx={{ width: "100%" }}>
          <FlexBetween sx={{ mb: "1rem" }}>
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
          <FlexBetween sx={{ mb: "1rem" }}>
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
          <FlexBetween sx={{ mb: "1rem" }}>
            <Stack>
              <Typography variant="subtitle2" sx={{ color: "gray" }}>
                Email
              </Typography>
              <Typography variant="subtitle1">{user?.email || ""}</Typography>
            </Stack>
            <Button onClick={() => handleAccountModal("email")}>Change</Button>
          </FlexBetween>
          <FlexBetween sx={{ mb: "1rem" }}>
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
        <Typography
          sx={{
            fontSize: "20px",
            textAlign: "center",
            mb: "1rem",
          }}
        >
          Məlumatları dəyişdir
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            value={inputs.first_name}
            onChange={handleChange}
            name="first_name"
            label="Ad"
            required
          />
          <TextField
            value={inputs.last_name}
            onChange={handleChange}
            name="last_name"
            label="Soyad"
            required
          />
          <TextField
            value={inputs.email}
            onChange={handleChange}
            name="email"
            label="Email"
            required
          />
          <TextField
            value={inputs.phone_number}
            onChange={handleChange}
            name="phone_number"
            label="Telefon"
            required
          />
          <TextField
            type="password"
            value={inputs.old_password}
            onChange={handleChange}
            name="old_password"
            label="Köhnə parol"
            required
          />
          <TextField
            type="password"
            value={inputs.new_password}
            onChange={handleChange}
            name="new_password"
            label="Yeni parol"
            required
          />

          <Button
            type="submit"
            sx={{
              backgroundColor: `${theme.palette.primary.main}`,
              width: "100%",
              mt: "1rem",
            }}
          >
            Təsdiq et
          </Button>
        </form>
      </AdminModal>
    </Box>
  );
};

export default Account;
