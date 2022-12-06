import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  IconButton,
  Paper,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import { Stack } from "@mui/system";
import React, { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { useDispatch } from "react-redux";
import { addIngredientsCustom } from "./ingredientSlice";

const IngredientCard = ({ ingredient }) => {
  const dispatch = useDispatch();

  return (
    <>
      <Card>
        <Box sx={{ p: 2, width: 1 }}>
          <CardActionArea>
            <CardMedia
              component="img"
              image={`http://localhost:8000${ingredient.image}`}
              alt={ingredient.name}
            />
          </CardActionArea>
        </Box>
      </Card>
      <Stack>
        <Typography
          variant="caption"
          align="center"
          sx={{ fontWeight: "600" }}
          noWrap
        >
          {ingredient.name}
        </Typography>

        <Stack direction="row" justifyContent="space-between">
          <Typography variant="caption" noWrap>
            {ingredient.calo}cal
          </Typography>
          <Typography variant="caption" noWrap sx={{ fontWeight: "600" }}>
            {ingredient.price} vnd
          </Typography>
        </Stack>
        <Button
          size="small"
          variant="contained"
          color="secondary"
          sx={{
            my: 1,
            backgroundColor: "success.main",
            color: "success.contrastText",
          }}
          onClick={() => dispatch(addIngredientsCustom(ingredient))}
        >
          ADD
        </Button>
      </Stack>
    </>
  );
};

export default IngredientCard;
