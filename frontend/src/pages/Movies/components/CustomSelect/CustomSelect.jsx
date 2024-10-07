import React, { useEffect, useState } from "react";
import { grey } from "@mui/material/colors";
import { InputLabel, MenuItem, FormControl, Select } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const sortTypeList = [
  { value: "none", name: "none" },
  { value: "popularity", name: "popularity" },
  { value: "vote_count", name: "vote count" },
  { value: "vote_average", name: "vote average" },
];

const theme = createTheme({
  components: {
    MuiSelect: {
      styleOverrides: {
        root: {
          color: grey[100],
          ".MuiOutlinedInput-notchedOutline": {
            borderColor: grey[600],
          },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: grey[600],
          },
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: grey[600],
          },
          ".MuiSvgIcon-root ": {
            fill: `${grey[600]} !important`,
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: grey[100],
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          "&.Mui-selected": {
            backgroundColor: "none", // 선택된 아이템의 배경색
          },
          "&.Mui-selected:hover": {
            backgroundColor: "none", // 선택된 아이템의 호버 배경색
          },
          "&:hover": {
            backgroundColor: grey[300], // 호버 배경색
          },
        },
      },
    },
  },
  palette: {
    primary: {
      main: grey[200],
      light: grey[500],
      dark: grey[700],
    },
  },
});

const CustomSelect = ({ sort, setSort }) => {
  const handleSortChange = (event) => {
    setSort(event.target.value);
  };

  return (
    <ThemeProvider theme={theme}>
      <FormControl fullWidth>
        <InputLabel sx={{ color: grey[500] }} id="demo-simple-select-label">
          sort
        </InputLabel>
        <Select
          selected
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={sort}
          label="sort"
          onChange={handleSortChange}
        >
          {sortTypeList.map((type, idx) => {
            return (
              <MenuItem
                key={idx}
                value={type.value}
                disabled={
                  type.value === "none"
                    ? sort === type.value || sort === ""
                    : sort === type.value
                }
              >
                {type.name}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
    </ThemeProvider>
  );
};

export default CustomSelect;
