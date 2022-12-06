import React from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Grid,
  Typography,
  Box,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const Category = () => {
  const category = [
    {
      name: "Salad",
      icon: "/salad.png",
      path: "menu",
    },
    {
      name: "Juice",
      icon: "/juice.png",
      path: "menu",
    },
    {
      name: "Smoothie",
      icon: "/smoothie.png",
      path: "menu",
    },
    {
      name: "All",
      icon: "/salad-all.png",
      path: "menu",
    },
  ];
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        width: 1,
        height: 1,
        bgcolor: "secondary.light",
        p: 5,
        mt: 3,
        borderRadius: 2,
      }}
    >
      <Typography variant="h4" sx={{ mb: 5, fontWeight: 600 }} align="center">
        Category
      </Typography>
      <Grid container spacing={3}>
        {category.map((e, i) => (
          <Grid item xs={6} sm={3} md={3} key={i}>
            <Card
              onClick={() => navigate(`/${e.path}`)}
              sx={{
                py: 4,
                boxShadow: 0,
                textAlign: "center",
                cursor: "pointer",
                bgcolor: "secondary.dark",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  pl: 1,
                  pb: 1,
                  justifyContent: "center",
                }}
              >
                <Card sx={{ boxShadow: "0", bgcolor: "transparent" }}>
                  <CardMedia component="img" image={e.icon} alt={e.name} />
                </Card>
              </Box>
              <Box sx={{ display: "flex", flexDirection: "column" }}>
                <CardContent sx={{ flex: "1 0 auto" }}>
                  <Typography
                    component="div"
                    variant="subtitle"
                    sx={{ fontWeight: 600 }}
                  >
                    {e.name}
                  </Typography>
                </CardContent>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Category;
