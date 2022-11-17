import Category from "../components/Category";
import MainBanner from "../components/Banner/MainBanner";
import React, { useEffect } from "react";
import { Container } from "@mui/material";
import { useDispatch } from "react-redux";
import { getUser } from "../features/user/userSlice";

const HomePage = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUser());
  });
  return (
    <Container maxWidth="lg">
      <MainBanner />
      <Category />
    </Container>
  );
};

export default HomePage;
