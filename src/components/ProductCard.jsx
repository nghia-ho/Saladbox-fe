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
import apiService from "../app/apiService";
import { useDispatch, useSelector } from "react-redux";
import { getProductById } from "../features/product/productSlice";
import { Link as RouterLink } from "react-router-dom";

const ProductCard = ({ product, height }) => {
  const [count, setCount] = useState(0);
  const dispatch = useDispatch();
  if (count < 0) {
    setCount(0);
  }

  return (
    <Paper variant="elevation" elevation={2}>
      <Card>
        <Box sx={{ p: 2 }}>
          <CardActionArea component={RouterLink} to={`/product/${product._id}`}>
            <CardMedia
              sx={{ borderRadius: 2 }}
              component="img"
              height={height}
              image={`http://localhost:8000${product?.image}`}
              alt={product.name}
            />
          </CardActionArea>
        </Box>
        <CardContent>
          <Stack>
            <Typography variant="subtitle2" sx={{ fontWeight: "600" }}>
              {product.name}
            </Typography>
            <Stack direction="row">
              <Typography variant="caption">
                {product.decription?.slice(0, 80)}
              </Typography>
              <Typography variant="caption" ml={2}>
                {product.calo}cal
              </Typography>
            </Stack>
            <Typography variant="subtitle1" sx={{ fontWeight: "600" }}>
              {product.price}$
            </Typography>
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
          <IconButton size="large" color="primary">
            <ShoppingBasketIcon style={{ verticalAlign: "middle" }} />
          </IconButton>
        </CardActions>
      </Card>
    </Paper>
  );
};

export default ProductCard;
