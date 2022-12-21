import { Box, Button, Container, Grid, Paper, Stack } from "@mui/material";
import ClearAllIcon from "@mui/icons-material/ClearAll";

import React, { useEffect, useState } from "react";
import ProductSearch from "../features/product/ProductSearch";
import ProductList from "../features/product/ProductList";
import ProductSort from "../features/product/ProductSort";
import {
  getProducts,
  getfavoriteProduct,
} from "../features/product/productSlice";

import { useDispatch, useSelector } from "react-redux";
import CategoryList from "../features/category/CategoryList";
import { useForm } from "react-hook-form";
import { FormProvider } from "../components/form";

import ProductFilter from "../features/product/ProductFilter";
import useAuth from "../hooks/useAuth";
import ProductView from "../components/ProductView";
import Pagination from "../components/Panigation";
import { useLocation } from "react-router-dom";

const MenuPage = () => {
  const location = useLocation();
  const myparam = location.state;

  const [page, setPage] = useState(1);
  const [filterName, setFilterName] = useState("");
  const [sort, setSort] = useState("");
  const [view, setView] = React.useState("list");
  const arrayFilter = [0, 1500000];
  const [price, setPrice] = useState(arrayFilter);
  const [value, setValue] = useState(price);
  const [selectValue, setSelectValue] = useState(myparam || "");

  const handleChange = (event, nextView) => {
    setView(nextView);
  };
  const defaultValues = {
    nameQuery: filterName,
  };
  const methods = useForm({
    defaultValues,
  });
  const { handleSubmit, reset } = methods;

  const dispatch = useDispatch();
  const { user } = useAuth();
  const { totalPage } = useSelector((state) => state.products);
  useEffect(() => {
    dispatch(
      getProducts({
        page,
        name: filterName,
        price: JSON.stringify(price),
        sortBy: sort,
        category: selectValue,
      })
    );
    if (user) dispatch(getfavoriteProduct({ limit: 1000 }));
  }, [filterName, page, dispatch, sort, user, price, selectValue]);

  const onSubmit = (data) => {
    setFilterName(data.nameQuery);
    setPage(1);
  };
  const resetFilter = () => {
    setPage(1);
    reset();
    setFilterName("");
    setSort("");
    setPrice(arrayFilter);
    setValue(arrayFilter);
    setView("list");
    setSelectValue("");
  };
  return (
    <Container maxWidth="lg">
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Grid
          container
          spacing={1}
          sx={{ display: "flex", alignItems: "center" }}
        >
          <Grid item xs={12} sm={12} md={2}>
            <Stack
              spacing={2}
              direction={{ xs: "column", sm: "column", md: "column" }}
              alignItems={{ sm: "center" }}
              justifyContent="space-between"
              mt={3}
              sx={{
                display: { xs: "inline", sm: "none", md: "inline" },
              }}
            >
              <Box sx={{ mt: 3 }}>
                <ProductSearch />
              </Box>
            </Stack>
          </Grid>
          <Grid item xs={12} md={10}>
            <Stack
              spacing={2}
              direction="row"
              alignItems={{ sm: "center" }}
              justifyContent="space-between"
              mt={3}
            >
              <ProductView
                view={view}
                setView={setView}
                handleChange={handleChange}
              />

              <Box sx={{ display: { xs: "none", sm: "inline", md: "none" } }}>
                <ProductSearch size={"small"} />
              </Box>
              <ProductSort setSort={setSort} />
            </Stack>
          </Grid>
        </Grid>

        <Grid container spacing={1.5}>
          <Grid item xs={12} md={2}>
            <Stack
              sx={{ flexDirection: { xs: "row", sm: "row", md: "column" } }}
            >
              <CategoryList
                selectValue={selectValue}
                setSelectValue={setSelectValue}
                setPage={setPage}
              />

              <ProductFilter
                setPrice={setPrice}
                price={price}
                value={value}
                setValue={setValue}
              />
            </Stack>
            <Stack sx={{ my: { xs: 2, md: 1 } }} alignItems="center">
              <Paper elevation={2} sx={{ p: 1 }}>
                <Box sx={{ width: 1 }}>
                  <Button
                    size="large"
                    variant="contained"
                    onClick={resetFilter}
                    startIcon={<ClearAllIcon />}
                  >
                    Clear All
                  </Button>
                </Box>
              </Paper>
            </Stack>
          </Grid>
          <Grid item xs={12} md={10} sx={{ position: "relative" }}>
            <ProductList view={view} />
            <Stack alignItems="center" justifyContent="end">
              <Pagination count={totalPage} page={page} setPage={setPage} />
            </Stack>
          </Grid>
        </Grid>
        <Button type="submit"></Button>
      </FormProvider>
    </Container>
  );
};

export default MenuPage;
