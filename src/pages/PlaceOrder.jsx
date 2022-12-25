import {
  Box,
  Grid,
  Button,
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Card,
} from "@mui/material";

import React from "react";
import useAuth from "../hooks/useAuth";

import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { createOrder1, createOrderCustom } from "../features/order/orderSlice";
import { clearCart, clearCartCustom } from "../features/cart/cartSlice";

import OrderInfo from "../features/order/OrderInfo";
import BodyTableRow from "../features/order/BodyTableRow";

const shippingPrice = 15000;

function priceRow(qty, unit) {
  return qty * unit;
}

function createRow(name, qty, unit, image, product_id) {
  const price = priceRow(qty, unit);
  return { name, qty, unit, price, image, product_id };
}

function subtotal(items) {
  return items.map(({ price }) => price).reduce((sum, i) => sum + i, 0);
}

function PlaceOrder() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { cart, shippingAddress, paymentMethod, cartCustom } = useSelector(
    (state) => state.cart
  );
  const { user } = useAuth();

  let rows;
  if (cartCustom.length) {
    const Row = (param) => {
      const cart = param.map((cartItem) => {
        return createRow(
          cartItem.day.name,
          cartItem.quantity,
          cartItem.day.price,
          cartItem.day.image,
          cartItem.day._id
        );
      });
      return cart;
    };
    rows = Row(cartCustom);
  } else {
    const Row = (param) => {
      const cart = param.map((cartItem) => {
        return createRow(
          cartItem.name,
          cartItem.quantity,
          cartItem.price,
          cartItem.image,
          cartItem._id
        );
      });
      return cart;
    };
    rows = Row(cart);
  }
  const invoiceSubtotal = subtotal(rows);
  const invoiceTotal = shippingPrice + invoiceSubtotal;

  const handlePlaceOrder = async () => {
    try {
      if (cartCustom.length) {
        const order = await dispatch(
          createOrderCustom({
            orderItems: rows,
            shippingAddress: shippingAddress,
            paymentMethod: paymentMethod.toLocaleLowerCase(),
            shippingPrice: shippingPrice,
            totalPrice: invoiceTotal,
          })
        );
        navigate(`/order/${order._id}`);
        dispatch(clearCartCustom());
      } else {
        const order = await dispatch(
          createOrder1({
            orderItems: rows,
            shippingAddress: shippingAddress,
            paymentMethod: paymentMethod.toLocaleLowerCase(),
            shippingPrice: shippingPrice,
            totalPrice: invoiceTotal,
          })
        );
        navigate(`/order/${order._id}`);
        dispatch(clearCart());
      }
    } catch (error) {
      console.log(error);
    }
  };

  const mode = "placeorder";

  return (
    <Container maxWidth="lg">
      <Box sx={{ margin: "auto", textAlign: "center", mt: 5 }}>
        {/* info order */}
        <OrderInfo
          city={shippingAddress.city}
          name={user.name}
          email={user.email}
          paymentMethod={paymentMethod}
          district={shippingAddress.district}
          address={shippingAddress.address}
          phone={shippingAddress.phone}
          mode={mode}
        />

        <Grid container spacing={{ xs: 3, md: 1 }}>
          <Grid item xs={12} md={9}>
            <Card>
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 300 }} aria-label="spanning table">
                  <TableHead>
                    <TableRow>
                      <TableCell align="center" colSpan={4}>
                        Cart Infomation
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Item</TableCell>
                      <TableCell align="center">Qty.</TableCell>
                      <TableCell align="center">Unit</TableCell>
                      <TableCell align="center">Sum</TableCell>
                    </TableRow>
                  </TableHead>
                  {/* table row  body */}
                  <BodyTableRow rows={rows} />
                </Table>
              </TableContainer>
            </Card>
          </Grid>
          <Grid item xs={12} md={3}>
            <Card>
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell colSpan={3} align="center">
                        Invoice
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      <TableCell> Subtotal</TableCell>
                      <TableCell align="center">
                        {invoiceSubtotal.toLocaleString()}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Shipping Fee</TableCell>

                      <TableCell align="center">
                        {shippingPrice.toLocaleString()}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Total</TableCell>
                      <TableCell align="center">
                        {invoiceTotal.toLocaleString()}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell colSpan={3} align="center" sx={{ p: 1.5 }}>
                        <Button
                          onClick={handlePlaceOrder}
                          variant="contained"
                          color="success"
                        >
                          Place Order
                        </Button>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}

export default PlaceOrder;
