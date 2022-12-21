import React from "react";
import { Box } from "@mui/system";
import { Card, CardContent, CardMedia, Grid, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Service = () => {
  const category = [
    {
      name: "Custom Your Salad",
      icon: "/custom1.png",
      path: "custom",
      caption:
        " Based on a basic salad component including 3 parts,greens - veggie & protein & topping - sauce. Choose your favorite ingredients and create your own salad recipes",
    },
    {
      name: "Special Weekly Meal",
      icon: "/custom.png",
      path: "customeweaklysalad",
      caption:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus consectetur porro molestiae vero ea in maxime delectus esse, nihil eligendi.",
    },
  ];
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        width: 1,
        height: 1,
        bgcolor: "success.light",
        p: { xs: 2, sm: 5 },
        mt: 3,
        borderRadius: 2,
      }}
    >
      <Typography
        variant="h4"
        sx={{ mb: 5, fontWeight: 600, color: "success.contrastText" }}
        align="center"
      >
        Our Service
      </Typography>
      <Grid container spacing={{ xs: 1, sm: 3 }}>
        {category.map((e, i) => (
          <Grid item xs={12} sm={6} key={i}>
            <Card
              onClick={() => navigate(`/${e.path}`)}
              sx={{
                py: 4,
                boxShadow: 0,
                textAlign: "center",
                cursor: "pointer",
                bgcolor: "success.dark",
                height: 1,
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
                    color="success.contrastText"
                  >
                    {e.name}
                    <Typography
                      component="div"
                      variant="caption"
                      align="justify"
                      mt={2}
                    >
                      {e.caption}
                    </Typography>
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

export default Service;
