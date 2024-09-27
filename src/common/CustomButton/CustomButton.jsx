import React from "react";
import { InfoOutlined } from "@mui/icons-material";
import { styled } from "@mui/material/styles";
import { Button } from "@mui/material";

const CustomButton = ({ handleBtnClick, value, mt = "0" }) => {
  const IconButton = styled(Button)(({ theme }) => ({
    color: "white",
    backgroundColor: "none",
    border: "1px solid #999",
    marginTop: mt,
    "&:hover": {
      backgroundColor: "white",
      backgroundColor: "none",
      border: "1px solid white",
    },
  }));

  return (
    <IconButton
      onClick={handleBtnClick}
      variant="outlined"
      size="small"
      startIcon={<InfoOutlined />}
    >
      {value}
    </IconButton>
  );
};

export default CustomButton;
