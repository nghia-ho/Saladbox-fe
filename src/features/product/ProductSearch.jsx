import { InputAdornment, Stack } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import React from "react";
import { FTextField, FormProvider } from "../../components/form";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getProducts, nameQuery, changePage } from "./productSlice";

const defaultValues = {
  searchQuery: "",
};

function ProductSearch() {
  const methods = useForm({
    defaultValues,
  });
  const dispatch = useDispatch();
  const { handleSubmit } = methods;
  const onSubmit = (data) => {
    dispatch(nameQuery(data.nameQuery));
  };
  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack
        spacing={2}
        direction={{ xs: "column", sm: "row" }}
        alignItems={{ sm: "center" }}
        justifyContent="center"
        my={2}
      >
        <FTextField
          name="nameQuery"
          sx={{ width: "50%" }}
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
    </FormProvider>
  );
}

export default ProductSearch;
