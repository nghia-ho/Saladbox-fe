import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardMedia,
  Divider,
  getFormLabelUtilityClasses,
  IconButton,
  List,
  Typography,
} from "@mui/material";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { Stack } from "@mui/system";
import React, { useEffect, useState } from "react";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { useDispatch, useSelector } from "react-redux";
import {
  customProduct,
  createfavoriteProduct,
} from "../features/product/productSlice";
import {
  addIngredientsCustom,
  removeFromCustomBoard,
  subtractIngredientsCustom,
} from "../features/ingredient/ingredientSlice";

import useAuth from "../hooks/useAuth";

function CustomBoard({ setModal, setModalAdd }) {
  let { ingredientsCustom } = useSelector((state) => state.ingredient);
  const { user, addToCard } = useAuth();

  const dispatch = useDispatch();
  let calories = 0;
  let price = 0;
  ingredientsCustom.forEach((ingredient) => {
    calories += ingredient.calo * ingredient.amount;
    price += ingredient.price * ingredient.amount;
  });

  const handleCustom = async (ingredients, price, calo) => {
    if (user) {
      if (!ingredients.length) {
        setModalAdd(true);
      } else {
        const ingredient = ingredients.map((e) => e._id);
        const product = await dispatch(
          customProduct({
            name: "custom",
            ingredients: ingredient,
            price,
            calo,
            type: "custom",
          })
        );
        const id = product.payload._id;
        addToCard(product.payload);
        dispatch(createfavoriteProduct({ id, type: "custom" }));
      }
    } else setModal(true);
  };

  const map = (
    <Box my={1} sx={{ width: 1 }}>
      {ingredientsCustom.map((ingredientItem) => (
        <Stack direction="row" sx={{ p: 1 }}>
          <Card>
            <CardActionArea sx={{ display: "flex", p: 0.5 }}>
              <CardMedia
                sx={{ width: 1 }}
                component="img"
                image={`http://localhost:8000${ingredientItem.image}`}
                alt={ingredientItem.name}
              />
              <Box
                sx={{
                  position: "absolute",
                  bgcolor: "success.lighter",
                  right: 0,
                  bottom: 0,
                  width: 20,
                  height: 20,
                  borderTopLeftRadius: 6,
                }}
              >
                <Typography align="center" color="primary.contrastText">
                  {ingredientItem.amount}
                </Typography>
              </Box>
            </CardActionArea>
          </Card>

          <Stack justifyContent="space-between" sx={{ ml: 2, width: 1 }}>
            <Stack direction="row" justifyContent="space-between">
              <Typography
                sx={{ fontWeight: 600, color: "success.contrastText" }}
              >
                {ingredientItem.name}
              </Typography>

              <IconButton
                sx={{ p: 0 }}
                onClick={() => dispatch(removeFromCustomBoard(ingredientItem))}
              >
                <DeleteForeverIcon color="primary" fontSize="small" />
              </IconButton>
            </Stack>

            <Stack direction="row">
              <IconButton
                variant="outlined"
                sx={{ p: 0 }}
                onClick={() => dispatch(addIngredientsCustom(ingredientItem))}
              >
                <ArrowDropUpIcon sx={{ color: "success.contrastText" }} />
              </IconButton>

              <IconButton
                variant="outlined"
                sx={{ p: 0, ml: 2 }}
                onClick={() =>
                  dispatch(subtractIngredientsCustom(ingredientItem))
                }
              >
                <ArrowDropDownIcon />
              </IconButton>
            </Stack>

            <Stack direction="row" justifyContent="space-between">
              <Typography sx={{ color: "success.contrastText" }}>
                {ingredientItem.price} vnd
              </Typography>

              <Divider orientation="vertical" />
              <Typography sx={{ color: "success.contrastText" }}>
                {ingredientItem.calo} kcal
              </Typography>
            </Stack>
            <Divider />
          </Stack>
        </Stack>
      ))}
    </Box>
  );
  return (
    <Stack
      sx={{
        width: 1,
        height: 1,
        bgcolor: "success.main",
        borderRadius: 1,
        p: 0.5,
      }}
    >
      <Typography
        align="center"
        sx={{ pt: 2, fontWeight: 600, color: "success.contrastText" }}
      >
        Menu information
      </Typography>

      {ingredientsCustom.length ? (
        <List
          sx={{
            width: "100%",
            position: "relative",
            overflow: "auto",
            maxHeight: { xs: 350, sm: 350, md: 800, lg: 450, xl: 450 },
            "& ul": { padding: 0 },
          }}
          subheader={<li />}
        >
          {map}
        </List>
      ) : (
        <Stack alignItems="center" justifyContent="center">
          <Typography
            align="center"
            sx={{ fontWeight: 600, color: "success.contrastText" }}
          >
            You haven't added anything on today's menu
          </Typography>
        </Stack>
      )}
      <Box sx={{ flexGrow: 1 }} />
      <Stack>
        <Stack direction="row" justifyContent="space-between">
          <Typography
            variant="subtitle1"
            align="center"
            sx={{ fontWeight: 600, color: "success.contrastText" }}
          >
            Total
          </Typography>
          <Typography
            variant="subtitle1"
            align="center"
            sx={{ fontWeight: 600, color: "success.contrastText" }}
          >
            {price} VND
          </Typography>
          <Typography
            variant="subtitle1"
            align="center"
            sx={{ fontWeight: 600, color: "success.contrastText" }}
          >
            {calories} kcal
          </Typography>
        </Stack>
        <Button
          variant="outlined"
          onClick={() => handleCustom(ingredientsCustom, price, calories)}
        >
          Add to cart
        </Button>
      </Stack>
    </Stack>
  );
}

export default CustomBoard;
