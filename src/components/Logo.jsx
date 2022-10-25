import { Box } from "@mui/system";
import React from "react";
import LocalDiningIcon from "@mui/icons-material/LocalDining";
import { Link as RouterLink } from "react-router-dom";
const Logo = ({ disableLink = false, sx }) => {
  const logo = (
    <Box sx={{ width: 40, height: 40, ...sx }}>
      <LocalDiningIcon fontSize="large" color="primary" />
    </Box>
  );

  if (disableLink) {
    return <>{logo}</>;
  }

  return <RouterLink to="/">{logo}</RouterLink>;
};

export default Logo;
