import {
  Box,
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
import { useDispatch, useSelector } from "react-redux";
import { createfavoriteProduct, removefavoriteProduct } from "./productSlice";
import { Link as RouterLink } from "react-router-dom";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import useAuth from "../../hooks/useAuth";
import { addToCard } from "../cart/cartSlice";

const ProductCard = ({ product }) => {
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
              image={`http://localhost:8000${
                product?.image || "/salads/1.png"
              }`}
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
                {product.price} vnd
              </Typography>
              {wishList}
            </Stack>
          </Stack>
        </CardContent>
        <CardActions sx={{ display: "flex", justifyContent: "space-between" }}>
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
            size="large"
            color="success"
            onClick={() => dispatch(addToCard(product))}
          >
            <ShoppingBasketIcon style={{ verticalAlign: "middle" }} />
          </IconButton>
        </CardActions>
      </Card>
    </Paper>
  );
};

export default ProductCard;
