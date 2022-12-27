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

import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import { Stack } from "@mui/system";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { createfavoriteProduct, removefavoriteProduct } from "./productSlice";
import { Link as RouterLink, useLocation } from "react-router-dom";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import useAuth from "../../hooks/useAuth";
import { addToCard } from "../cart/cartSlice";
import { isString } from "lodash";

import { BASE_URL } from "../../app/config";

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const auth = useAuth();

  const location = useLocation();

  const { favorite } = useSelector((state) => state.products);
  console.log(favorite);
  const a = favorite?.favorite?.find((e) => e.product?._id === product?._id);
  const id = product._id;
  const wishList = !auth.user ? (
    <IconButton
      to="/login"
      component={RouterLink}
      state={{ from: location }}
      replace
    >
      <FavoriteBorderIcon fontSize="small" color="primary" />
    </IconButton>
  ) : a ? (
    <IconButton onClick={() => dispatch(removefavoriteProduct(product._id))}>
      <FavoriteIcon fontSize="small" color="primary" />
    </IconButton>
  ) : (
    <IconButton
      onClick={() => dispatch(createfavoriteProduct({ id, type: "avaiable" }))}
    >
      <FavoriteBorderIcon fontSize="small" color="primary" />
    </IconButton>
  );

  return (
    <Paper variant="elevation" elevation={0}>
      <Card>
        <Box sx={{ p: 2 }}>
          <CardActionArea component={RouterLink} to={`/product/${product._id}`}>
            <CardMedia
              sx={{ borderRadius: 2 }}
              component="img"
              // image={`${BASE_URL}${
              //   product?.image || "/salads/1.png"
              // }`}

              image={
                isString(product?.image) &&
                product?.image.includes("cloudinary")
                  ? product?.image
                  : product?.image
                  ? `${BASE_URL}${product?.image}`
                  : `${BASE_URL}/salads/1.png`
              }
              alt={product.name}
            />
          </CardActionArea>
        </Box>
        <CardContent>
          <Stack>
            <Typography variant="subtitle2" sx={{ fontWeight: "600" }} noWrap>
              {product.name}
            </Typography>
            <Stack direction="row">
              <Typography variant="caption" noWrap>
                {product.decription}
              </Typography>
              <Typography variant="caption" ml={2}>
                {product.calo}cal
              </Typography>
            </Stack>
            <Stack
              direction="row"
              spacing={2}
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography variant="subtitle1" sx={{ fontWeight: "600" }}>
                {product.price.toLocaleString()}
              </Typography>
              {wishList}
            </Stack>
          </Stack>
        </CardContent>
        <CardActions sx={{ display: "flex", justifyContent: "space-between" }}>
          <Button
            onClick={() => dispatch(addToCard(product))}
            variant="outlined"
            color="success"
            fullWidth
            startIcon={<ShoppingBasketIcon />}
          >
            Add To Cart
          </Button>
        </CardActions>
      </Card>
    </Paper>
  );
};

export default ProductCard;
