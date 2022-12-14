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

//admin page and layout
import MainLayoutAdmin from "../layouts/MainLayoutAdmin";
import AdminPage from "../pages/admin-pages/AdminPage";
import AdminOrderPage from "../pages/admin-pages/AdminOrderPage";
import UserPage from "../pages/admin-pages/UserPage";
import AdminProductPage from "../pages/admin-pages/AdminProductPage";
import IngredientPage from "../pages/admin-pages/IngredientPage";
import OrderDeTailPage from "../pages/admin-pages/OrderDetailPage";

const Router = () => {
  return (
    // public route
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path="menu" element={<MenuPage />} />
        <Route path="product/:id" element={<DetailPage />} />
        <Route path="cart" element={<CartPage />} />
        <Route path="custom" element={<CustomMealPage />} />
      </Route>
      {/* // protect route for user*/}
      <Route
        path="/"
        element={
          <AuthRequire allowRoles={["user"]}>
            <MainLayout />
          </AuthRequire>
        }
      >
        <Route path="account" element={<AccountPage />} />
        <Route path="shipping" element={<ShippingAddress />} />
        <Route path="payment" element={<Payment />} />
        <Route path="placeorder" element={<PlaceOrder />} />
        <Route path="order/:id" element={<OrderPage />} />
      </Route>
      {/* // protect route for admin*/}

      <Route
        path="/"
        element={
          <AuthRequire allowRoles={["admin"]}>
            <MainLayoutAdmin />
          </AuthRequire>
        }
      >
        <Route path="admin" element={<AdminPage />} />
        <Route path="orders" element={<AdminOrderPage />} />
        <Route path="orders/:id" element={<OrderDeTailPage />} />
        <Route path="product" element={<AdminProductPage />} />
        <Route path="user" element={<UserPage />} />
        <Route path="ingredient" element={<IngredientPage />} />
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
