import React from "react";
import { deepOrange, amber } from "@mui/material/colors";

const AdultBadge = ({ adult }) => {
  return (
    <div
      style={{
        width: "1.5rem",
        height: "1.5rem",
        backgroundColor: adult ? deepOrange[500] : amber[500],
        color: "black",
        fontWeight: "bold",
        borderRadius: "20%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {adult ? "19" : "all"}
    </div>
  );
};

export default AdultBadge;
