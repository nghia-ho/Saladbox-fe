import { Box, Container, Grid, Pagination, Stack } from "@mui/material";
import React, { useState } from "react";
import Banner from "../components/Banner/Banner";
import { FormProvider } from "../components/form";
import ProductSearch from "../features/product/ProductSearch";
import { useEffect } from "react";
import ProductList from "../features/product/ProductList";

import { useSelector, useDispatch } from "react-redux";
import {
  getProducts,
  nameQuery,
  changePage,
} from "../features/product/productSlice";
import CategoryList from "../features/category/CategoryList";

const MenuPage = () => {
  const [page, setPage] = useState(0);
  const { totalPage } = useSelector((state) => state.products);
  return (
    <Container maxWidth="lg">
      {/* 
        <Banner/>
        <Grid1>Category</Grid1>
        <Grid2>
        <Search><Filter><Option: Filter by ingredient>
        <ProductList>
        <Padigation>
        </Grid2>
        */}

      <Banner
        sxBackground={{
          backgroundImage: `url(${"https://img.freepik.com/free-vector/world-vegan-day-twitch-banner_23-2149715841.jpg?w=1380&t=st=1668440409~exp=1668441009~hmac=b02518520df469e78376f3941f2785fc667d38cb64c35616420e2f0ffb4aa294"})`,
          backgroundPosition: "center",
        }}
        sx={{ height: "400px" }}
      />
      <Grid container spacing={2}>
        <Grid item xs={2} md={2}>
          <CategoryList />
        </Grid>
        <Grid item xs={10} md={10}>
          <ProductSearch />
          <ProductList />
        </Grid>
      </Grid>

      <Pagination count={totalPage} onChange={(e, value) => setPage(value)} />
    </Container>
  );
};

export default MenuPage;
