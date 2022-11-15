import { Box, Container, Pagination, Stack } from "@mui/material";
import React, { useState } from "react";
import Banner from "../components/Banner/Banner";
import { FormProvider } from "../components/form";
import ProductSearch from "../components/ProductSearch";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import ProductList from "../components/ProductList";

import { useSelector, useDispatch } from "react-redux";
import {
  getProducts,
  nameQuery,
  changePage,
} from "../features/product/productSlice";

const defaultValues = {
  searchQuery: "",
};

const MenuPage = () => {
  const { name, calo, price, page, totalPage } = useSelector(
    (state) => state.products
  );

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProducts({ name, calo, price, page }));
  }, [dispatch, name, calo, price, page]);

  const methods = useForm({
    defaultValues,
  });

  const { handleSubmit } = methods;
  const onSubmit = (data) => {
    dispatch(nameQuery(data.nameQuery));
  };

  return (
    <Container sx={{ minWidth: "80%" }}>
      <Box>
        <Banner
          sxBackground={{
            backgroundImage: `url(${"https://img.freepik.com/free-vector/world-vegan-day-twitch-banner_23-2149715841.jpg?w=1380&t=st=1668440409~exp=1668441009~hmac=b02518520df469e78376f3941f2785fc667d38cb64c35616420e2f0ffb4aa294"})`,
            backgroundPosition: "center",
          }}
          sx={{ height: "400px" }}
        />
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <Stack
            spacing={2}
            direction={{ xs: "column", sm: "row" }}
            alignItems={{ sm: "center" }}
            justifyContent="center"
            my={2}
          >
            <ProductSearch />
          </Stack>
        </FormProvider>
      </Box>
      <Box>
        <ProductList />
        <Pagination
          count={totalPage}
          onChange={(e, value) => dispatch(changePage(value))}
        />
      </Box>
    </Container>
  );
};

export default MenuPage;
