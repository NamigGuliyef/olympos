import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

export default function SelectComponent({ list, onChange, value }) {
  return (
    <FormControl sx={{ m: 1, width: { xs: 300, sm: 300 } }}>
      <InputLabel id="demo-simple-select-label">Şəhər seç</InputLabel>
      <Select
        label="Şəhər seç"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        displayEmpty
        inputProps={{ "aria-label": "Without label" }}
      >
        {[...new Set(list)].map((l, i) => (
          <MenuItem value={l} key={l + i}>
            {l}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
