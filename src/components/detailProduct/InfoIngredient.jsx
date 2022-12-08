import { Box, Card, Grid, Typography } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import "./index.css";

function InfoIngredient() {
  const { product } = useSelector((state) => state.products);
  return (
    <Card>
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
            <Grid key={ingredient._id} item xs={3} md={3} lg={3}>
              <Box sx={{ m: 3 }} className="container">
                <Box
                  sx={{
                    overflow: "hidden",
                    display: "flex",
                    justifyContent: "center",
                    borderRadius: 1,
                    border: "1px dashed ",
                    p: 1,
                  }}
                >
                  <Box
                    component="img"
                    src={`http://localhost:8000${ingredient.image}`}
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
