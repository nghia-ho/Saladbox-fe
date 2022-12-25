import { Box, Card, Grid, Typography } from "@mui/material";
import { isString } from "lodash";
import React from "react";
import "../detailProduct/index.css";

function InfoIngredient({ product }) {
  return (
    <Card sx={{ p: 1 }}>
      <Box>
        <Box sx={{ display: "flex" }}>
          <Typography
            align="center"
            sx={{
              fontWeight: "600",
              m: 2,
              px: 2,
              display: "block",
              textTransform: "uppercase",
              borderRadius: 0.5,
              bgcolor: "secondary.main",
            }}
          >
            Ingredients
          </Typography>
        </Box>

        <Grid container spacing={1}>
          {product?.ingredients?.map((ingredient, index) => (
            <Grid key={index} item xs={3} md={3} lg={3}>
              <Box sx={{ m: { xs: 1, md: 3 } }} className="container">
                <Box
                  sx={{
                    overflow: "hidden",
                    display: "flex",
                    justifyContent: "center",
                    borderRadius: 1,
                    border: "1px dashed grey",
                    p: 1,
                  }}
                >
                  <Box
                    component="img"
                    src={
                      isString(ingredient.image) &&
                      ingredient.image.includes("cloudinary")
                        ? ingredient.image
                        : `http://localhost:8000${ingredient.image}`
                    }
                    alt={ingredient?._id}
                    sx={{
                      width: 1 / 2,
                    }}
                  />
                  <Box
                    className="overlay"
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {ingredient.calo} calo
                  </Box>
                </Box>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Card>
  );
}

export default InfoIngredient;
