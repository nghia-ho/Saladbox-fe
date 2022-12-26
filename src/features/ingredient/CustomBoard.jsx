import React, { useState } from "react";
import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardMedia,
  Divider,
  IconButton,
  List,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

import { useDispatch, useSelector } from "react-redux";
import isString from "lodash/isString";

import { customProduct, createfavoriteProduct } from "../product/productSlice";
import {
  addIngredientsCustom,
  removeFromCustomBoard,
  subtractIngredientsCustom,
} from "./ingredientSlice";
import { addToCard } from "../cart/cartSlice";

import { BASE_URL } from "../../app/config";

import useAuth from "../../hooks/useAuth";

function CustomBoard({ setModal, setModalAdd }) {
  const [name, setName] = useState("Salad Custom");
  let { ingredientsCustom } = useSelector((state) => state.ingredient);
  const { user } = useAuth();

  const dispatch = useDispatch();
  let calories = 0;
  let price = 0;
  ingredientsCustom.forEach((ingredient) => {
    calories += ingredient.calo * ingredient.amount;
    price += ingredient.price * ingredient.amount;
  });
  const handleChange = (event) => {
    setName(event.target.value);
  };

  const handleCustom = async (ingredients, price, calo) => {
    if (user) {
      if (!ingredients.length) {
        setModalAdd(true);
      } else {
        const ingredient = ingredients.map((e) => e._id);
        const product = await dispatch(
          customProduct({
            ingredients: ingredient,
            price,
            name,
            calo,
          })
        );
        const id = product.payload._id;
        dispatch(addToCard(product.payload));
        dispatch(createfavoriteProduct({ id, type: "custom" }));
      }
    } else setModal(true);
  };

  const map = (
    <Box my={1} sx={{ width: 1 }}>
      <TextField
        sx={{ width: 1, px: 1 }}
        id="outlined-name"
        label="Name"
        value={name}
        onChange={handleChange}
      />
      {ingredientsCustom.map((ingredientItem) => (
        <Stack direction="row" sx={{ p: 1 }} key={ingredientItem._id}>
          <Card sx={{ width: 1 / 3 }}>
            <CardActionArea sx={{ display: "flex", p: 0.5, width: 1 }}>
              <CardMedia
                component="img"
                image={
                  isString(ingredientItem.image) &&
                  ingredientItem.image.includes("cloudinary")
                    ? ingredientItem.image
                    : `${BASE_URL}${ingredientItem.image}`
                }
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
                {ingredientItem.name.slice(0, 20)}
              </Typography>

              <IconButton
                sx={{ p: 0 }}
                onClick={() => dispatch(removeFromCustomBoard(ingredientItem))}
              >
                <DeleteForeverIcon fontSize="small" />
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
                {ingredientItem.price.toLocaleString()}
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
        bgcolor: "success.main",
        borderRadius: 1,
        p: 0.5,
        height: 1,
        maxHeight: {
          xs: 350,
          sm: 350,
          md: 800,
          lg: 650,
          xl: 650,
        },
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
            width: 1,
            position: "relative",
            overflow: "auto",
            maxHeight: {
              xs: 350,
              sm: 350,
              md: 800,
              lg: 650,
              xl: 650,
            },
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
            {price.toLocaleString()}
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
