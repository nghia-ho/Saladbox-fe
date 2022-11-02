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
      name: "Salad cao cấp",
      icon: <ChairAltIcon />,
    },
    {
      name: "Salad hằng ngày",
      icon: <ChairAltIcon />,
    },
    {
      name: "Salad đặc trưng",
      icon: <ChairAltIcon />,
    },
    {
      name: "Sinh tố xanh",
      icon: <ChairAltIcon />,
    },
    {
      name: "Nước ép",
      icon: <ChairAltIcon />,
    },
    {
      name: "Món ăn thêm",
      icon: <ChairAltIcon />,
    },
    // {
    //   name: "Đồ uống khác",
    //   icon: <ChairAltIcon />,
    // },
  ];
  return (
    <Container maxWidth="xl">
      <Typography variant="h5" sx={{ my: 5 }}>
        Category
      </Typography>
      <Grid container spacing={3}>
        {category.map((e, i) => (
          <Grid item xs={4} sm={6} md={2} key={i}>
            <Paper variant="outlined">
              <Card
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
