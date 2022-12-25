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
      path: "shop",
      selected: "637464ef3c08c345541890f2",
    },
    {
      name: "Juice",
      icon: "/juice.png",
      path: "shop",
      selected: "637464f63c08c345541890f5",
    },
    {
      name: "Smoothie",
      icon: "/smoothie.png",
      path: "shop",
      selected: "6374652c3c08c345541890f8",
    },
    {
      name: "All",
      icon: "/salad-all.png",
      path: "shop",
    },
  ];
  const navigate = useNavigate();
  const handleNavigate = (e, selected) => {
    navigate(`/${e}`, { state: selected });
  };

  return (
    <Box
      sx={{
        width: 1,
        height: 1,
        bgcolor: "secondary.light",
        p: { xs: 2, sm: 5 },
        mt: 3,
        borderRadius: 2,
      }}
    >
      <Typography variant="h4" sx={{ mb: 5, fontWeight: 600 }} align="center">
        Category
      </Typography>
      <Grid container spacing={{ xs: 1, sm: 3 }}>
        {category.map((e, i) => (
          <Grid item xs={6} sm={3} md={3} key={i}>
            <Card
              onClick={() => handleNavigate(e.path, e.selected)}
              sx={{
                py: { xs: 1, sm: 4 },
                p: { xs: 2, sm: 2 },
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
                <Card sx={{ boxShadow: "0", bgcolor: "secondary.dark" }}>
                  <CardMedia component="img" image={e.icon} alt={e.name} />
                </Card>
              </Box>
              <Box sx={{ display: "flex", flexDirection: "column" }}>
                <CardContent sx={{ p: 0 }}>
                  <Typography variant="subtitle" sx={{ fontWeight: 600 }}>
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
