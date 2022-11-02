import React from "react";
import Category from "../components/Category";
import TrendingProduct from "../components/TrendingProduct";
import HoverCard from "../components/HoverCard";
import NewArrival from "../components/NewArrival/NewArrival";
const HomePage = () => {
  return (
    <>
      <Category />
      <TrendingProduct />
      <HoverCard />
      <NewArrival />
    </>
  );
};

export default HomePage;
