import {
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

const ProductCard = ({ product, height }) => {
  const [count, setCount] = useState(0);

  if (count < 0) {
    setCount(0);
  }

  return (
    <Paper variant="elevation" elevation={2}>
      <Card>
        <CardActionArea>
          <CardMedia
            component="img"
            height={height}
            image={product.url}
            alt={product.name}
          />
        </CardActionArea>
        <CardContent>
          <Stack>
            <Typography variant="subtitle2" sx={{ fontWeight: "600" }}>
              {product.name}
            </Typography>
            <Stack direction="row">
              <Typography variant="caption">{product.type}</Typography>
              <Typography variant="caption" ml={2}>
                {product.cal}cal
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
