import { InputAdornment, Stack } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import React from "react";
import { FTextField } from "../../components/form";

function ProductSearch() {
  return (
    <Stack
      spacing={2}
      direction={{ xs: "column", sm: "row" }}
      alignItems={{ sm: "center" }}
      justifyContent="center"
      my={2}
    >
      <FTextField
        name="nameQuery"
        sx={{ width: 300 }}
        size="small"
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

export default ProductSearch;
