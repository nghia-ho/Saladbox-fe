import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Paper,
  Typography,
} from "@mui/material";

import { Stack } from "@mui/system";
import React from "react";
import { useNavigate } from "react-router-dom";
const ProductCardCustom = ({ product, handleAdd }) => {
  const navigate = useNavigate();
  return (
    <>
      <Paper
        sx={{ cursor: "pointer" }}
        variant="elevation"
        elevation={0}
        onClick={() => handleAdd && handleAdd(product)}
      >
        <Card>
          <Box sx={{ p: 1.5 }}>
            <CardActionArea>
              <CardMedia
                sx={{ borderRadius: 2 }}
                component="img"
                image={
                  product?.image?.length
                    ? `http://localhost:8000${product?.image}`
                    : "/saladcustom.png"
                }
                alt={product?.name}
              />
            </CardActionArea>
          </Box>
          <CardContent sx={{ p: 1.5, py: 0 }}>
            <Stack>
              <Typography variant="subtitle2" sx={{ fontWeight: "600" }} noWrap>
                {product?.name}
              </Typography>
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
              >
                <Typography variant="caption" sx={{ fontWeight: "600" }} noWrap>
                  {product?.price} vnd
                </Typography>
                <Typography variant="caption" ml={2}>
                  {product?.calo}cal
                </Typography>
              </Stack>
            </Stack>
          </CardContent>
          <CardActions>
            <Button
              size="small"
              color="primary"
              sx={{ pt: 0 }}
              onClick={() => navigate(`/product/${product?._id}`)}
            >
              View more
            </Button>
          </CardActions>
        </Card>
      </Paper>
    </>
  );
};

export default ProductCardCustom;
