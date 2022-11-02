import { Container, Grid } from "@mui/material";
import React from "react";
import ProductCard from "../ProductCard";

const Smoothies = () => {
  const category = [
    {
      name: "Lorem ipsum dolor sit amet",
      type: "Salad hằng ngày",
      price: 10,
      cal: 150,
      url: "https://plus.unsplash.com/premium_photo-1663854478383-58e5d46a222f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
    },
    {
      name: "Lorem ipsum dolor sit amet",
      type: "Salad hằng ngày",
      price: 10,
      cal: 150,
      url: "https://images.unsplash.com/photo-1615478503562-ec2d8aa0e24e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
    },

    {
      name: "Lorem ipsum dolor sit amet",
      type: "Salad cao cấp",
      price: 10,
      cal: 150,
      url: "https://images.unsplash.com/photo-1610622930110-3c076902312a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
    },

    {
      name: "Lorem ipsum dolor sit amet",
      type: "Salad hằng ngày",
      price: 10,
      cal: 150,
      url: "https://images.unsplash.com/photo-1577594412764-f8fa57d4e5b4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
    },
  ];
  return (
    <Container maxWidth="xl">
      <Grid container spacing={3}>
        {category.map((e, i) => (
          <Grid item xs={6} sm={6} md={3} lg={3} key={i}>
            <ProductCard product={e} height="200" />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Smoothies;
