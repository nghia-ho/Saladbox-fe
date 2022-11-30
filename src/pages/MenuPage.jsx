import { Box, Container, Grid, Pagination, Stack } from "@mui/material";
import React, { useEffect, useState } from "react";
import ProductSearch from "../features/product/ProductSearch";
import ProductList from "../features/product/ProductList";
import ProductSort from "../features/product/ProductSort";
import { getProducts } from "../features/product/productSlice";

import { useDispatch, useSelector } from "react-redux";
import CategoryList from "../features/category/CategoryList";
import { useForm } from "react-hook-form";
import { FormProvider } from "../components/form";
import { sortedIndexOf } from "lodash";
import ProductFilter from "../features/product/ProductFilter";

const MenuPage = () => {
  const [page, setPage] = useState(1);
  const [filterName, setFilterName] = useState("");
  const [sort, setSort] = useState("");

  const defaultValues = {
    nameQuery: "",
  };

  const methods = useForm({
    defaultValues,
  });

  const dispatch = useDispatch();
  const { totalPage } = useSelector((state) => state.products);

  const { handleSubmit } = methods;

  useEffect(() => {
    dispatch(
      getProducts({
        page,
        name: filterName,
        sortBy: sort,
      })
    );
  }, [filterName, page, dispatch, sort]);

  const onSubmit = (data) => {
    setFilterName(data.nameQuery);
    setPage(1);
  };

  return (
    <Container maxWidth="lg">
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Stack direction="row" justifyContent="space-between" sx={{ mt: 3 }}>
          <ProductSearch />
          <CategoryList page={page} />
          <ProductSort setSort={setSort} />
        </Stack>

        <Grid container spacing={2}>
          <Grid item xs={2} md={2} mt={1}>
            <ProductFilter />
          </Grid>
          <Grid item xs={10} md={10}>
            <ProductList />
          </Grid>
        </Grid>
      </FormProvider>

      <Pagination count={totalPage} onChange={(e, value) => setPage(value)} />
    </Container>
  );
};

export default MenuPage;
