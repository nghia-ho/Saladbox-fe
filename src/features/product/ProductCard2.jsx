import {
  Box,
  Card,
  CardActionArea,
  CardMedia,
  Grid,
  IconButton,
  Paper,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import { Stack } from "@mui/system";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createfavoriteProduct, removefavoriteProduct } from "./productSlice";
import { Link as RouterLink } from "react-router-dom";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import useAuth from "../../hooks/useAuth";

const ProductCard2 = ({ product }) => {
  const [count, setCount] = useState(0);
  const dispatch = useDispatch();
  const auth = useAuth();
  if (count < 0) {
    setCount(0);
  }
  const { favorite } = useSelector((state) => state.products);
  const a = favorite?.favorite?.find((e) => e.product?._id === product?._id);
  const id = product._id;
  const wishList = !auth.user ? (
    <IconButton to="/login" component={RouterLink}>
      <FavoriteBorderIcon fontSize="inherit" color="primary" />
    </IconButton>
  ) : a ? (
    <IconButton onClick={() => dispatch(removefavoriteProduct(product._id))}>
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
          {/* GRID TONG */}
          <Grid container>
            <Stack
              sx={{
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
              {/* GRID ITEM OF TONG */}
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
                    to={`/product/${product._id}`}
                    sx={{ display: "flex" }}
                  >
                    <CardMedia
                      sx={{ borderRadius: 1, width: 1, height: 1 }}
                      component="img"
                      image={`http://localhost:8000${
                        product?.image || "/salads/1.png"
                      }`}
                      alt={product.name}
                    />
                  </CardActionArea>
                </Stack>
              </Grid>
              {/* GRID ITEM OF TONG */}
              <Grid item xs={12} sm={12} md={9} lg={9} xl={9}>
                <Stack sx={{ p: 2, height: 1 }} justifyContent="space-around">
                  <Box>
                    <Typography
                      variant="subtitle2"
                      sx={{ fontWeight: "600" }}
                      noWrap
                    >
                      {product.name}
                    </Typography>
                    <Stack>
                      <Typography variant="caption" align="justify">
                        {product.decription}
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
                      {product.price} vnd
                    </Typography>

                    <Typography variant="caption">{product.calo}cal</Typography>
                    {wishList}
                  </Stack>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    <Stack direction="row">
                      <IconButton
                        variant="outlined"
                        size="small"
                        onClick={() => setCount(count + 1)}
                      >
                        <AddIcon />
                      </IconButton>
                      <Typography
                        variant="subtitle2"
                        sx={{ fontWeight: "600", flexGrow: 1, m: 1 }}
                      >
                        {count}
                      </Typography>
                      <IconButton
                        variant="outlined"
                        size="small"
                        onClick={() => setCount(count - 1)}
                      >
                        <RemoveIcon />
                      </IconButton>
                    </Stack>
                    <IconButton
                      color="success"
                      onClick={() => auth.addToCard(product)}
                    >
                      <ShoppingBasketIcon />
                    </IconButton>
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
