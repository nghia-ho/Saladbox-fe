import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardMedia,
  Grid,
  IconButton,
  Paper,
  Typography,
} from "@mui/material";

import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import { Stack } from "@mui/system";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createfavoriteProduct, removefavoriteProduct } from "./productSlice";
import { Link as RouterLink, useLocation } from "react-router-dom";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import useAuth from "../../hooks/useAuth";
import { addToCard } from "../cart/cartSlice";
import { isString } from "lodash";
import { BASE_URL } from "../../app/config";

const ProductCard2 = ({ product }) => {
  const [count, setCount] = useState(0);
  const dispatch = useDispatch();
  const auth = useAuth();
  if (count < 0) {
    setCount(0);
  }
  const location = useLocation();
  const { favorite } = useSelector((state) => state.products);
  const a = favorite?.favorite?.find((e) => e.product?._id === product?._id);
  const id = product?._id;
  const wishList = !auth.user ? (
    <IconButton
      to="/login"
      component={RouterLink}
      state={{ from: location }}
      replace
    >
      <FavoriteBorderIcon fontSize="inherit" color="primary" />
    </IconButton>
  ) : a ? (
    <IconButton onClick={() => dispatch(removefavoriteProduct(id))}>
      <FavoriteIcon fontSize="inherit" color="primary" />
    </IconButton>
  ) : (
    <IconButton
      onClick={() => dispatch(createfavoriteProduct({ id, type: "avaiable" }))}
    >
      <FavoriteBorderIcon fontSize="inherit" color="primary" />
    </IconButton>
  );

  return (
    <Paper variant="elevation" elevation={2}>
      <Card>
        <Box sx={{ p: 2 }}>
          {/* GRID  */}
          <Grid container>
            <Stack
              sx={{
                width: 1,
                display: {
                  xs: "block",
                  sm: "flex",
                  md: "flex",
                  lg: "flex",
                  xl: "flex",
                },
              }}
              direction="row"
            >
              {/* GRID ITEM */}
              <Grid item xs={12} sm={9} md={3} lg={3} xl={3}>
                <Stack
                  direction="row"
                  sx={{
                    display: {
                      xs: "flex",
                      sm: "flex",
                      md: "flex",
                      lg: "flex",
                      xl: "flex",
                    },
                  }}
                >
                  <CardActionArea
                    component={RouterLink}
                    to={`/product/${product?._id}`}
                    sx={{ display: "flex" }}
                  >
                    <CardMedia
                      sx={{ borderRadius: 1, width: 1 }}
                      component="img"
                      // image={
                      //   product?.image.length
                      //     ? `${BASE_URL}${product?.image}`
                      //     : "/saladcustom.png"
                      // }
                      image={
                        isString(product?.image) &&
                        product?.image.includes("cloudinary")
                          ? product?.image
                          : product?.image
                          ? `${BASE_URL}${product?.image}`
                          : `${BASE_URL}/salads/1.png`
                      }
                      alt={product?.name}
                    />
                  </CardActionArea>
                </Stack>
              </Grid>
              {/* GRID ITEM */}
              <Grid item xs={12} sm={12} md={9} lg={9} xl={9}>
                <Stack
                  sx={{ px: { xs: 0, sm: 2 }, height: 1, mt: { xs: 2, sm: 0 } }}
                  justifyContent="space-around"
                >
                  <Box>
                    <Typography
                      variant="subtitle2"
                      sx={{ fontWeight: "600" }}
                      noWrap
                    >
                      {product?.name}
                    </Typography>
                    <Stack>
                      <Typography variant="caption" align="justify">
                        {product?.decription}
                      </Typography>
                    </Stack>
                  </Box>
                  <Stack
                    direction="row"
                    spacing={2}
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <Typography variant="subtitle1" sx={{ fontWeight: "600" }}>
                      {product?.price.toLocaleString()}
                    </Typography>

                    <Typography variant="caption">
                      {product?.calo}cal
                    </Typography>
                    {wishList}
                  </Stack>
                  <Grid container spacing={1}>
                    {product?.ingredients?.map((ingredient, index) => (
                      <Grid key={index} item xs={2} sm={2} lg={1}>
                        {ingredient.image && (
                          <Box sx={{ m: 0 }}>
                            <Box
                              sx={{
                                overflow: "hidden",
                                display: "flex",
                                justifyContent: "center",
                                borderRadius: 1,
                                border: "1px dashed",
                                p: 1,
                              }}
                            >
                              <Box
                                component="img"
                                // src={`${BASE_URL}${ingredient.image}`}
                                src={
                                  isString(ingredient?.image) &&
                                  ingredient?.image.includes("cloudinary")
                                    ? ingredient?.image
                                    : `${BASE_URL}${ingredient?.image}`
                                }
                                alt={ingredient?._id}
                                sx={{
                                  width: { lg: 1 / 1.5, xs: 1 },
                                }}
                              />
                            </Box>
                          </Box>
                        )}
                      </Grid>
                    ))}
                  </Grid>

                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: { xs: "center", sm: "start" },
                      mt: 1,
                    }}
                  >
                    <Button
                      variant="outlined"
                      onClick={() => dispatch(addToCard(product))}
                      startIcon={<ShoppingBasketIcon />}
                    >
                      Add To Cart
                    </Button>
                  </Box>
                </Stack>
              </Grid>
            </Stack>
          </Grid>
        </Box>
      </Card>
    </Paper>
  );
};

export default ProductCard2;
