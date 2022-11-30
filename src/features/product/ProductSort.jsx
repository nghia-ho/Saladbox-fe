import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { Box } from "@mui/material";

const SORT_BY_ITEM = [
  { value: "calo-lowest", label: "Calo: Low-High" },
  { value: "calo-highest", label: "Calo: High-Low" },
  { value: "price-highest", label: "Price: High-Low" },
  { value: "price-lowest", label: "Price: Low-High" },
];
function ProductSort({ setSort }) {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (value) => {
    setAnchorEl(null);
    console.log(value);
    setSort(value);
  };

  return (
    <>
      <Button
        sx={{ color: "#212121" }}
        p={0}
        onClick={handleClick}
        endIcon={anchorEl ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
      >
        Sort By
      </Button>
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
        <Box>
          {SORT_BY_ITEM.map((option) => (
            <MenuItem
              key={option.value}
              onClick={() => handleClose(option.value)}
            >
              {option.label}
            </MenuItem>
          ))}
        </Box>
      </Menu>
    </>
  );
}

export default ProductSort;
