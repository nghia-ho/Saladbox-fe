import { InputAdornment, Stack } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import React from "react";
import { FTextField } from "../../components/form";

function OrderSearch() {
  return (
    <Stack spacing={1} direction={{ xs: "column", sm: "row" }}>
      <FTextField
        name="orderSearch"
        sx={{ width: 300 }}
        placeholder="Search Order..."
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />
    </Stack>
  );
}

export default OrderSearch;
