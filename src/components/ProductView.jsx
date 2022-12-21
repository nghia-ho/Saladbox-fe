import * as React from "react";
import ViewListIcon from "@mui/icons-material/ViewList";
import ViewModuleIcon from "@mui/icons-material/ViewModule";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { styled } from "@mui/material/styles";

export default function ProductView({ view, handleChange }) {
  const StyledToggleButtonGroup = styled(ToggleButtonGroup)(({ theme }) => ({
    "& .MuiToggleButtonGroup-grouped": {
      margin: theme.spacing(0.5),
      border: 0,
      "&.Mui-disabled": {
        border: 0,
      },
      "&:not(:first-of-type)": {
        borderRadius: theme.shape.borderRadius,
      },
      "&:first-of-type": {
        borderRadius: theme.shape.borderRadius,
      },
      "&.Mui-selected": {
        color: "#815B5B",
      },
      color: "#D0B8A8",
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
