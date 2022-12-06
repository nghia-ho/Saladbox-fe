import React from "react";
import { Route, Routes } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import BlankLayout from "../layouts/BlankLayout";
import HomePage from "../pages/HomePage";
import AccountPage from "../pages/AccountPage";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import NotFoundPage from "../pages/NotFoundPage";
import DetailPage from "../pages/DetailPage";
import AuthRequire from "./AuthRequire";
import MenuPage from "../pages/MenuPage";
import CartPage from "../pages/CartPage";
import ShippingAddress from "../components/ShippingAddress";
import Payment from "../components/Payment";
import PlaceOrder from "../components/PlaceOrder";
import OrderPage from "../pages/OrderPage";
import CustomMealPage from "../pages/CustomMealPage";
const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path="menu" element={<MenuPage />} />
        <Route path="product/:id" element={<DetailPage />} />
        <Route path="cart" element={<CartPage />} />
        <Route path="custom" element={<CustomMealPage />} />
      </Route>

      <Route
        path="/"
        element={
          <AuthRequire>
            <MainLayout />
          </AuthRequire>
        }
      >
        <Route path="account" element={<AccountPage />} />
        <Route path="shipping" element={<ShippingAddress />} />
        <Route path="payment" element={<Payment />} />
        <Route path="placeorder" element={<PlaceOrder />} />
        <Route path="order/:id" element={<OrderPage />} />
        {/* <Route path="admin" element={<AdminPage />} /> */}
      </Route>

      <Route element={<BlankLayout />}>
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
};

export default Router;
