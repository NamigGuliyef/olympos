import { Box, Button, TextField } from "@mui/material";
import React from "react";
import { useForm } from "react-hook-form";
import { theme } from "../theme";
import { createTourCategory } from "../services/apiTours";
import AdminCreateTourSpesific from "../components/adminPanel/AdminCreateTourSpesific";

const AdminCategory = () => {
  const { register, handleSubmit, formState, reset } = useForm();
  const { errors } = formState;

  const handleTourCategory = (obj) => {
    console.log("kat obj", obj);
    reset();
    createTourCategory(obj);
    // createTourCategory(obj).then((res) => {
    //   if (res.ok) {
    //     console.log("Res", res);
    //   }
    // });
  };
  const handleTourSpesific = (obj) => {
    console.log("spesific obj", obj);
    reset();
    // createTourCategory(obj);
    // createTourCategory(obj).then((res) => {
    //   if (res.ok) {
    //     console.log("Res", res);
    //   }
    // });
  };

  return (
    <div>
      <form onSubmit={handleSubmit(handleTourCategory)}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            // backgroundColor: "red",
            height: "30vh",
            justifyContent: "center",
            border: "1px solid",
            gap: "1rem",
          }}
        >
          <TextField
            id="name"
            label="Kateqoriya"
            error={!!errors.name}
            helperText={errors.name?.message}
            {...register("name", {
              required: "xana boş ola bilməz",
            })}
          />
          <Button
            sx={{
              backgroundColor: `${theme.palette.primary.main}`,
            }}
            type="submit"
          >
            Təsdiqlə
          </Button>
        </Box>
      </form>
      <AdminCreateTourSpesific />
    </div>
  );
};

export default AdminCategory;
