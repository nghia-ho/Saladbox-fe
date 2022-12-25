import Category from "../features/category/Category";
import MainBanner from "../components/Banner/MainBanner";
import React from "react";
import { Container } from "@mui/material";
import Service from "../components/Service";

const HomePage = () => {
  return (
    <Container maxWidth="lg">
      <MainBanner />
      <Category />
      <Service />
    </Container>
  );
};

export default HomePage;
