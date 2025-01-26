import {
  Box,
  FormControl,
  InputLabel,
  MenuItem, Select
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

import { setType } from "../../store/slices/tourSlice";
import DateRangePicker from "../DateRangePicker";

import { useTheme } from "@emotion/react";
import { motion } from "framer-motion";
import SelectComponent from "../SelectComponent";

const FormSelections = ({
  forType,
  months,
  showSelectComponent,
  typeOfTours,
  cities,
  countries,
  city,
  setCity,
  setCountry,
  country,
}) => {
  const dispatch = useDispatch();

  const selected = useSelector((store) => {
    return forType === "tour" ? store.tour.type : store.hotel.city;
  });

  const modeTheme = useTheme();
  const isDarkMode = modeTheme.palette.mode === "dark";

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexWrap: {
          md: "wrap",
        },
        // marginTop: "20px",
        gap: {
          sm: "2rem",
          md: "0",
        },
        flexDirection: {
          xs: "column",
          sm: "column",
          // md: "column",
          md: "row",
        },
        backgroundColor: {
          // md: "green",
          // lg: "red",
        },
      }}
    >
      {/* {forType !== "tour" && <DateRangePicker />} */}
      <DateRangePicker type={forType} />
      {forType !== "tour" && (
        <SelectComponent onChange={setCity} value={city} list={cities} />
      )}

      <FormControl
        sx={{
          m: 1,
          width: { xs: 300, sm: 300 },
          border: isDarkMode ? "1px solid #D3D3D3" : null,
          borderRadius: isDarkMode ? "2px" : null,
        }}
      >
        <InputLabel
          sx={{ color: isDarkMode ? "#D7D8D3" : "null", border: "black" }}
          id="demo-simple-select-label"
        >
          {forType === "tour" ? "Kateqoriya seç" : "Ölkə seç"}
        </InputLabel>
        <Select
          label={forType === "tour" ? "Kateqoriya seç" : "Ölkə seç"}
          displayEmpty
          inputProps={{ "aria-label": "Without label" }}
          // value={selected}
          value={forType === "tour" ? selected : country}
          onChange={(e) =>
            dispatch(
              forType === "tour"
                ? setType(e.target.value)
                : setCountry(e.target.value)
            )
          }
        >
          {!typeOfTours &&
            [...new Set(countries)].map((state, idx) => (
              <MenuItem value={state} key={idx}>
                {state}
              </MenuItem>
            ))}
          {typeOfTours &&
            typeOfTours.map((state, idx) => (
              <MenuItem
                component={motion.li}
                whileHover={{
                  color: "lightblue",
                  scale: 1.1,
                  originX: 0,
                }}
                transition={{ type: "spring", stiffness: 150 }}
                value={state}
                key={idx}
              >
                {state}
              </MenuItem>
            ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default FormSelections;
