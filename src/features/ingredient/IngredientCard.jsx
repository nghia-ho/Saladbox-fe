import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardMedia,
  Typography,
} from "@mui/material";
import { Stack } from "@mui/system";
import React from "react";
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
