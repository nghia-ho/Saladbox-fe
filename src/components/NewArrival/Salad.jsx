import { Container, Grid } from "@mui/material";
import React from "react";
import ProductCard from "../ProductCard";

const Salad = () => {
  const category = [
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
      type: "Salad cao cấp",
      price: 10,
      cal: 150,
      url: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80",
    },

    {
      name: "Lorem ipsum dolor sit amet",
      type: "Salad hằng ngày",
      price: 10,
      cal: 150,
      url: "https://images.unsplash.com/photo-1543339308-43e59d6b73a6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
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

export default Salad;
