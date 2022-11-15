import React from "react";
import ChairAltIcon from "@mui/icons-material/ChairAlt";
import { Box, Container } from "@mui/system";
import {
  Card,
  CardContent,
  Grid,
  IconButton,
  Paper,
  Typography,
} from "@mui/material";
import { alpha, styled } from "@mui/material/styles";
import { Link, useNavigate } from "react-router-dom";

const StyledIcon = styled("div")(({ theme }) => ({
  margin: "auto",
  display: "flex",
  borderRadius: "50%",
  alignItems: "center",
  width: theme.spacing(8),
  height: theme.spacing(8),
  justifyContent: "center",
  marginBottom: theme.spacing(3),
}));

const Category = () => {
  const category = [
    {
      name: "Salad",
      icon: <ChairAltIcon />,
    },
    {
      name: "Juice",
      icon: <ChairAltIcon />,
    },
    {
      name: "Juice",
      icon: <ChairAltIcon />,
    },
    {
      name: "All",
      icon: <ChairAltIcon />,
    },
    {
      name: "Special Weekly Meal",
      icon: <ChairAltIcon />,
    },
    {
      name: "Custom Your Salad",
      icon: <ChairAltIcon />,
    },
  ];
  const navigate = useNavigate();
  console.log(
    category.map((e) => {
      const x = e.name.trim().toLowerCase();
      return x;
    })
  );
  return (
    <Container maxWidth="xl">
      <Typography variant="h5" sx={{ my: 5 }}>
        Category
      </Typography>
      <Grid container spacing={3}>
        {category.slice(0, 4).map((e, i) => (
          <Grid item xs={6} sm={3} md={3} key={i}>
            <Paper variant="outlined">
              <Card
                onClick={() =>
                  navigate(
                    `/menu/${e.name === "All" ? "" : e.name.toLowerCase()}`
                  )
                }
                sx={{
                  py: 4,
                  boxShadow: 0,
                  textAlign: "center",
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
                  <IconButton>
                    <ChairAltIcon />
                  </IconButton>
                </Box>
                <Box sx={{ display: "flex", flexDirection: "column" }}>
                  <CardContent sx={{ flex: "1 0 auto" }}>
                    <Typography component="div" variant="subtitle">
                      {e.name}
                    </Typography>
                  </CardContent>
                </Box>
              </Card>
            </Paper>
          </Grid>
        ))}
      </Grid>
      <Typography variant="h5" sx={{ my: 5 }}>
        Our Service
      </Typography>
      <Grid container spacing={3}>
        {category.slice(4, 6).map((e, i) => (
          <Grid item xs={12} sm={6} md={6} key={i}>
            <Paper variant="outlined">
              <Card
                onClick={() =>
                  navigate(`/menu/${e.name.toLowerCase().replace(/ /g, "")}`)
                }
                sx={{
                  py: 4,
                  boxShadow: 0,
                  textAlign: "center",
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
                  <IconButton>
                    <ChairAltIcon />
                  </IconButton>
                </Box>
                <Box sx={{ display: "flex", flexDirection: "column" }}>
                  <CardContent sx={{ flex: "1 0 auto" }}>
                    <Typography component="div" variant="subtitle">
                      {e.name}
                    </Typography>
                  </CardContent>
                </Box>
              </Card>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Category;
