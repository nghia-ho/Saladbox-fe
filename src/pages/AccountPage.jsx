import { Container } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getUser } from "../features/user/userSlice";

const AccountPage = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUser());
  });
  return <Container></Container>;
};

export default AccountPage;
