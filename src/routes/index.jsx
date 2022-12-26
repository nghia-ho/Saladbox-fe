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
import ShippingAddress from "../pages/ShippingAddress";
import Payment from "../pages/Payment";
import PlaceOrder from "../pages/PlaceOrder";
import OrderPageDetail from "../pages/OrderPageDetail";
import CustomMealPage from "../pages/CustomMealPage";
import OrderPage from "../pages/OrderPage";

//admin page and layout
import MainLayoutAdmin from "../layouts/MainLayoutAdmin";
import AdminPage from "../pages/admin-pages/AdminPage";
import AdminOrderPage from "../pages/admin-pages/AdminOrderPage";
import AdminProductPage from "../pages/admin-pages/AdminProductPage";
import IngredientPage from "../pages/admin-pages/IngredientPage";
import OrderDeTailPage from "../pages/admin-pages/OrderDetailPage";
import CustomMealsPage from "../pages/CustomMealsPage";
import CartPageCustom from "../pages/CartPageCustom";
import CategoryPage from "../pages/admin-pages/CategoryPage";

const Router = () => {
  return (
    // public route
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path="shop" element={<MenuPage />} />
        <Route path="product/:id" element={<DetailPage />} />
        <Route path="cart" element={<CartPage />} />
        <Route path="cartcustom" element={<CartPageCustom />} />
        <Route path="custom" element={<CustomMealPage />} />
        <Route path="weeklymealplan" element={<CustomMealsPage />} />
      </Route>

      {/* // Protect route User*/}
      <Route
        path="/"
        element={
          <AuthRequire allowRoles={["user"]}>
            <MainLayout />
          </AuthRequire>
        }
      >
        <Route path="account" element={<AccountPage />} />
        <Route path="order" element={<OrderPage />} />
        <Route path="shipping" element={<ShippingAddress />} />
        <Route path="payment" element={<Payment />} />
        <Route path="placeorder" element={<PlaceOrder />} />
        <Route path="order/:id" element={<OrderPageDetail />} />
      </Route>

      {/* // Protect route Admin*/}
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
        <Route path="category" element={<CategoryPage />} />
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
