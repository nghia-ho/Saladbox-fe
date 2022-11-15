import React from "react";
import { Link, Typography } from "@mui/material";
import { Box } from "@mui/system";

function MainFooter() {
  return (
    <Box sx={{ backgroundColor: "#6a9b90", mt: 10 }}>
      <Typography variant="body2" color="text.secondary" align="center" p={2}>
        {"Copyright © "}
        <Link
          color="inherit"
          href="https://www.salad.vn"
          sx={{ fontWeight: "bolder" }}
        >
          Hoo Nghia
        </Link>{" "}
        {new Date().getFullYear()}
        {"."}
      </Typography>
    </Box>
  );
}

export default MainFooter;
