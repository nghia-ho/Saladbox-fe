import { Container, Grid } from "@mui/material";
import React from "react";
import ProductCard from "../ProductCard";

const Juice = () => {
  const category = [
    {
      name: "Lorem ipsum dolor sit amet",
      type: "Salad hằng ngày",
      price: 10,
      cal: 150,
      url: "https://images.unsplash.com/photo-1534353473418-4cfa6c56fd38?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
    },
    {
      name: "Lorem ipsum dolor sit amet",
      type: "Salad hằng ngày",
      price: 10,
      cal: 150,
      url: "https://images.unsplash.com/photo-1614707585284-9cb9fc018387?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=790&q=80",
    },

    {
      name: "Lorem ipsum dolor sit amet",
      type: "Salad cao cấp",
      price: 10,
      cal: 150,
      url: "https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
    },

    {
      name: "Lorem ipsum dolor sit amet",
      type: "Salad hằng ngày",
      price: 10,
      cal: 150,
      url: "https://images.unsplash.com/photo-1613637069941-06b7dbc394a4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
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

export default Juice;
