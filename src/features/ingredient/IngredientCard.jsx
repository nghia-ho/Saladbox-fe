import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardMedia,
  Typography,
} from "@mui/material";
import { Stack } from "@mui/system";
import { isString } from "lodash";
import React from "react";
import { useDispatch } from "react-redux";
import { addIngredientsCustom } from "./ingredientSlice";

import { BASE_URL } from "../../app/config";

const IngredientCard = ({ ingredient }) => {
  const dispatch = useDispatch();

  return (
    <>
      <Card>
        <Box sx={{ p: 2, width: 1 }}>
          <CardActionArea>
            <CardMedia
              component="img"
              // image={`${BASE_URL}${ingredient.image}`}
              image={
                isString(ingredient.image) &&
                ingredient.image.includes("cloudinary")
                  ? ingredient.image
                  : `${BASE_URL}${ingredient.image}`
              }
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
            {ingredient.price.toLocaleString()}
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
