import { Box, Button, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { categoryProduct } from "../product/productSlice";
import { getCategory } from "./categorySlice";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import ToggleButton from "@mui/material/ToggleButton";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";

const CategoryList = () => {
  const [selectValue, setSelectValue] = useState("");

  const dispatch = useDispatch();
  const { categories, isLoading } = useSelector((state) => state.category);
  useEffect(() => {
    dispatch(getCategory());
  }, [dispatch]);

  const handleAlignment = (event, newCate) => {
    setSelectValue(newCate);
  };

  const handleCate = (id, name) => {
    dispatch(categoryProduct(id));
    setSelectValue(name);
  };

  const StyledToggleButtonGroup = styled(ToggleButtonGroup)(({ theme }) => ({
    "& .MuiToggleButtonGroup-grouped": {
      border: 0,
      color: "#000000",
      "&.Mui-disabled": {
        color: "#000000",
        border: "1px solid black",
      },

      "&:not(:first-of-type)": {
        borderRadius: theme.shape.borderRadius,
      },
      "&:first-of-type": {
        borderRadius: theme.shape.borderRadius,
      },
      "&.Mui-selected": {
        color: "#E6E5A3",
        backgroundColor: "#557153",
      },
      "&:hover": {
        color: "#000000",
        backgroundColor: "#7C9473",
      },
    },
  }));

  return (
    <Box>
      <StyledToggleButtonGroup
        value={selectValue}
        color="primary"
        exclusive
        onChange={handleAlignment}
        aria-label="text alignment"
      >
        <ToggleButton sx={{ p: 3 }} value="all" aria-label="all">
          All
        </ToggleButton>
        <ToggleButton sx={{ p: 3 }} value="new" aria-label="new">
          New arrvival
        </ToggleButton>
        {categories.map((e) => (
          <ToggleButton
            key={e._id}
            sx={{ p: 3 }}
            value={e.name}
            aria-label={e.name}
            onClick={() => handleCate(e._id, e.name)}
          >
            {e.name}
          </ToggleButton>
        ))}
      </StyledToggleButtonGroup>
    </Box>
  );
};

export default CategoryList;
