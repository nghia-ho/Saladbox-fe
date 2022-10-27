import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea, Container, Grid } from "@mui/material";
import { Stack } from "@mui/system";

const TrendingProduct = () => {
  const category = [
    {
      name: "Lorem ipsum dolor sit amet",
      type: "Salad đặc trưng",
      price: 10,
      cal: 150,
      url: "https://images.unsplash.com/photo-1625128726833-c811f18946b3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
    },
    {
      name: "Lorem ipsum dolor sit amet",
      type: "Salad hằng ngày",
      price: 10,
      cal: 150,
      url: "https://images.unsplash.com/photo-1604497181015-76590d828b75?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1471&q=80",
    },
    {
      name: "Lorem ipsum dolor sit amet",
      type: "Salad hằng ngày",
      price: 10,
      cal: 150,
      url: "https://images.unsplash.com/photo-1610817153377-e54299ffdb1e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
    },

    {
      name: "Lorem ipsum dolor sit amet",
      type: "Salad đặc trưng",
      price: 10,
      cal: 150,
      url: "https://images.unsplash.com/photo-1629358101753-531fa5a2f661?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
    },
    {
      name: "Lorem ipsum dolor sit amet",
      type: "Salad cao cấp",
      price: 10,
      cal: 150,
      url: "https://images.unsplash.com/photo-1592417817098-8fd3d9eb14a5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
    },
    {
      name: "Lorem ipsum dolor sit amet",
      type: "Salad đặc trưng",
      price: 10,
      cal: 150,
      url: "https://images.unsplash.com/photo-1546793665-c74683f339c1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
    },
    {
      name: "Lorem ipsum dolor sit amet",
      type: "Salad hằng ngày",
      price: 10,
      cal: 150,
      url: "https://images.unsplash.com/photo-1582572358586-7cd1c5dbfa9e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80",
    },
    {
      name: "Lorem ipsum dolor sit amet",
      type: "Salad hằng ngày",
      price: 10,
      cal: 150,
      url: "https://images.unsplash.com/photo-1574926054530-540288c8e678?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
    },
  ];
  return (
    <Container maxWidth="xl">
      <Typography variant="h5" sx={{ my: 5 }}>
        Best Sellers Salads
      </Typography>
      <Card sx={{ maxWidth: 1, boxShadow: 0 }}>
        <Grid container spacing={3}>
          {category.map((e, i) => (
            <Grid item xs={6} sm={6} md={4} lg={3} key={i}>
              <CardActionArea>
                <CardMedia
                  component="img"
                  height="300"
                  image={e.url}
                  alt={e.name}
                />
                <CardContent>
                  <Stack>
                    <Typography gutterBottom variant="subtitle" component="div">
                      {e.name}
                    </Typography>
                    <Typography gutterBottom variant="subtitle" component="div">
                      {e.price}$
                    </Typography>
                    <Typography gutterBottom variant="subtitle" component="div">
                      {e.type}
                    </Typography>
                    <Typography gutterBottom variant="subtitle" component="div">
                      {e.cal}
                    </Typography>
                  </Stack>
                </CardContent>
              </CardActionArea>
            </Grid>
          ))}
        </Grid>
      </Card>
    </Container>
  );
};

export default TrendingProduct;
