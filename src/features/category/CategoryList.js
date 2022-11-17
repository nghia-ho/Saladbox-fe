import { Box, Button, Stack, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { categoryProduct } from "../product/productSlice";
import { getCategory } from "./categorySlice";

const CategoryList = () => {
  const dispatch = useDispatch();
  const { categories, isLoading } = useSelector((state) => state.category);
  useEffect(() => {
    dispatch(getCategory());
    console.log("hehe");
  }, [dispatch]);

  const handleCate = (id) => {
    dispatch(categoryProduct(id));
  };

  return (
    <Box sx={{ mt: 3 }}>
      <Typography variant="h4">Category</Typography>
      {categories.map((e) => (
        <Stack>
          <Button variant="h6" onClick={() => handleCate(e._id)}>
            {" "}
            {e.name}
          </Button>
        </Stack>
      ))}
    </Box>
  );
};

export default CategoryList;
