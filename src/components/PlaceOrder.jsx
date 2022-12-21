import {
  Box,
  Divider,
  Grid,
  Stack,
  Button,
  Typography,
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CardActionArea,
  CardMedia,
  Card,
} from "@mui/material";

import React from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

import PersonIcon from "@mui/icons-material/Person";
import { styled } from "@mui/material/styles";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import PlaceIcon from "@mui/icons-material/Place";
import { useDispatch, useSelector } from "react-redux";
import { createOrder1, createOrderCustom } from "../features/order/orderSlice";
import { clearCart, clearCartCustom } from "../features/cart/cartSlice";
const shippingPrice = 15000;

function ccyFormat(num) {
  return `${num.toFixed(0)}`;
}

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
const Item = styled(Box)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(3),
  textAlign: "center",
  color: "#E6E5A3",
}));
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
          cartItem.day.image[0],
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
          cartItem.image[0],
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

  return (
    <Container maxWidth="lg">
      <Box sx={{ margin: "auto", textAlign: "center", mt: 5 }}>
        <Box sx={{ mb: 4, backgroundColor: "primary.darker", borderRadius: 2 }}>
          <Typography
            variant="h6"
            paragraph
            fontWeight="600"
            sx={{ p: 1, pt: 3 }}
          >
            Customer Infomation
          </Typography>
          <Divider />
          <Stack
            sx={{ flexDirection: { xs: "column", sm: "row" } }}
            divider={<Divider orientation="vertical" flexItem />}
            justifyContent="space-around"
          >
            <Item>
              <Stack direction="row" spacing={3}>
                <Stack
                  sx={{
                    display: { xs: "none", md: "inline" },
                    p: 3,
                    backgroundColor: "primary.lighter",
                    borderRadius: "50%",
                  }}
                >
                  <PersonIcon fontSize="large" color="success" />
                </Stack>
                <Stack justifyContent="center" alignItems="start">
                  <Typography sx={{ fontWeight: 700 }}>Customer</Typography>
                  <Typography>{user.name}</Typography>
                </Stack>
              </Stack>
            </Item>
            <Divider />
            <Item>
              <Stack direction="row" spacing={3}>
                <Stack
                  sx={{
                    display: { xs: "none", md: "inline" },
                    p: 3,
                    backgroundColor: "primary.lighter",
                    borderRadius: "50%",
                  }}
                >
                  <LocalShippingIcon fontSize="large" color="success" />
                </Stack>
                <Stack justifyContent="center" alignItems="start">
                  <Typography sx={{ fontWeight: 700 }}>Order Info</Typography>
                  <Typography>Shipping: {shippingAddress.city}</Typography>
                  <Typography>Payment: {paymentMethod}</Typography>
                </Stack>
              </Stack>
            </Item>
            <Divider />
            <Item>
              <Stack direction="row" spacing={3}>
                <Stack
                  sx={{
                    p: 3,
                    display: { xs: "none", md: "inline" },
                    backgroundColor: "primary.lighter",
                    borderRadius: "50%",
                  }}
                >
                  <PlaceIcon fontSize="large" color="success" />
                </Stack>
                <Stack justifyContent="center" alignItems="start">
                  <Typography sx={{ fontWeight: 700 }}>Deliver to</Typography>
                  <Typography>Address: {shippingAddress.address}</Typography>
                  <Typography>Phone: {shippingAddress.phone}</Typography>
                </Stack>
              </Stack>
            </Item>
          </Stack>
        </Box>

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
                  <TableBody>
                    {rows.map((row, i) => (
                      <TableRow key={i}>
                        <TableCell align="center">
                          <Stack direction="row">
                            <Box
                              sx={{
                                maxWidth: 50,
                                display: { xs: "none", sm: "inline" },
                              }}
                            >
                              <CardActionArea
                                component={Link}
                                to={`/product/${row.product_id}`}
                              >
                                <CardMedia
                                  sx={{ borderRadius: 2 }}
                                  component="img"
                                  image={
                                    row?.image
                                      ? `http://localhost:8000${row?.image}`
                                      : "/custom.png"
                                  }
                                  alt={row.desc}
                                />
                              </CardActionArea>
                            </Box>

                            <Box
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                ml: 3,
                              }}
                            >
                              <Typography align="center" gutterBottom>
                                {row.name}
                              </Typography>
                            </Box>
                          </Stack>
                        </TableCell>

                        <TableCell align="center">
                          <Stack direction="row" justifyContent="center">
                            <Typography
                              variant="subtitle2"
                              sx={{ fontWeight: "600", m: 1 }}
                              align="center"
                            >
                              {row.qty}
                            </Typography>
                          </Stack>
                        </TableCell>
                        <TableCell align="center">{row.unit}</TableCell>
                        <TableCell align="center">
                          {ccyFormat(row.price)}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
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
                        {ccyFormat(invoiceSubtotal)}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Shipping Fee</TableCell>

                      <TableCell align="center">
                        {ccyFormat(shippingPrice)}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Total</TableCell>
                      <TableCell align="center">
                        {ccyFormat(invoiceTotal)}
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
