import { InputAdornment, Stack } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import React from "react";
import { FTextField } from "../../components/form";

function IngredientSearch() {
  return (
    <Stack spacing={1} direction={{ xs: "column", sm: "column" }}>
      <FTextField
        name="ingredientSearch"
        sx={{ width: 300 }}
        placeholder="Search Ingredient..."
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

export default IngredientSearch;
