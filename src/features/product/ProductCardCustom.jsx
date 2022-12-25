import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Paper,
  Typography,
} from "@mui/material";

import { Stack } from "@mui/system";
import { isString } from "lodash";
import React from "react";
import { useNavigate } from "react-router-dom";
const ProductCardCustom = ({ product, handleAdd }) => {
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
                  isString(product?.image) &&
                  product?.image.includes("cloudinary")
                    ? product?.image
                    : product?.image
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
                  {product?.price.toLocaleString()}
                </Typography>
                <Typography variant="caption" ml={2}>
                  {product?.calo}cal
                </Typography>
              </Stack>
            </Stack>
          </CardContent>
        </Card>
      </Paper>
    </>
  );
};

export default ProductCardCustom;
