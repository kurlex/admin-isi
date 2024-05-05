import React from "react";
import { Box } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";

const LoadingCircle = ({ height = "100%", BackgroundColor = "none" }) => {
  const containerStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height,
    zIndex: 999,
    position: "inherit",
    color: "black",
    backgroundColor: BackgroundColor,
  };

  return (
    <Box sx={containerStyle}>
      <CircularProgress color="inherit" />
    </Box>
  );
};

export default LoadingCircle;
