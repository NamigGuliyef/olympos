import { Box, Button, TextField } from "@mui/material";
import React from "react";
import { useForm } from "react-hook-form";
import { theme } from "../../theme";

const AdminCategory = () => {
  const { register, handleSubmit, formState, reset } = useForm();
  const { errors } = formState;

  const handleTourSpesific = (obj) => {
    console.log("spesific obj", obj);
    // reset();
    // createTourCategory(obj);
    // createTourCategory(obj).then((res) => {
    //   if (res.ok) {
    //     console.log("Res", res);
    //   }
    // });
  };

  return (
    <div>
      <form onSubmit={handleSubmit(handleTourSpesific)}>
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
            id="tour-spesific"
            label="tour-spesific"
            error={!!errors["tour-spesific"]}
            helperText={errors["tour-spesific"]?.message}
            {...register("tour-spesific", {
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
    </div>
  );
};

export default AdminCategory;
