import * as React from "react";
import ViewListIcon from "@mui/icons-material/ViewList";
import ViewModuleIcon from "@mui/icons-material/ViewModule";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { styled } from "@mui/material/styles";

export default function ProductView({ view, setView, handleChange }) {
  const StyledToggleButtonGroup = styled(ToggleButtonGroup)(({ theme }) => ({
    "& .MuiToggleButtonGroup-grouped": {
      border: 0,
      "&.Mui-disabled": {
        color: "#000000",
      },
      "&:not(:first-of-type)": {
        borderRadius: theme.shape.borderRadius,
      },
      "&:first-of-type": {
        borderRadius: theme.shape.borderRadius,
      },
      "&.Mui-selected": {
        color: "#07503f",
        backgroundColor: "primary",
      },
      "&:hover": {
        color: "#000000",
        backgroundColor: "none",
      },
    },
  }));

  return (
    <StyledToggleButtonGroup value={view} exclusive onChange={handleChange}>
      <ToggleButton
        value="list"
        aria-label="list"
        sx={{ border: "none", color: "black" }}
      >
        <ViewListIcon />
      </ToggleButton>
      <ToggleButton
        value="module"
        aria-label="module"
        sx={{ border: "none", color: "black" }}
      >
        <ViewModuleIcon />
      </ToggleButton>
    </StyledToggleButtonGroup>
  );
}
