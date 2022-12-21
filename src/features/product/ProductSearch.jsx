import { InputAdornment, Stack } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import React from "react";
import { FTextField } from "../../components/form";

function ProductSearch({ size }) {
  return (
    <Stack spacing={1} direction={{ xs: "column", sm: "column" }}>
      <FTextField
        name="nameQuery"
        sx={{ width: 1 }}
        placeholder="Search Product..."
        size={size}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon size="small" />
            </InputAdornment>
          ),
        }}
      />
    </Stack>
  );
}

export default ProductSearch;
