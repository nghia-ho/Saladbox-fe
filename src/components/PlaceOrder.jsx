import { Box, Divider } from "@mui/material";
import { Stack } from "@mui/material";
import { Button } from "@mui/material";
import { Typography } from "@mui/material";
import { Container } from "@mui/material";
import React, { useContext, useEffect } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { CardActionArea } from "@mui/material";
import { CardMedia } from "@mui/material";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import PersonIcon from "@mui/icons-material/Person";
import { styled } from "@mui/material/styles";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import PlaceIcon from "@mui/icons-material/Place";
import { useDispatch, useSelector } from "react-redux";
import { createOrder1, resetIsLoading } from "../features/order/orderSlice";
const TAX_RATE = 0.07;

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
  const { cart, payment, shippingAdress, user, clearCart } = useAuth();
  const { order, isLoading } = useSelector((state) => state.order);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    if (!isLoading) {
      navigate(`/order/${order._id}`);
    }
  }, [isLoading, order._id, navigate]);
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
  let rows = Row(cart);

  const invoiceSubtotal = subtotal(rows);
  const invoiceTaxes = TAX_RATE * invoiceSubtotal;
  const invoiceTotal = invoiceTaxes + invoiceSubtotal;

  const handlePlaceOrder = () => {
    try {
      dispatch(
        createOrder1({
          orderItems: rows,
          shippingAddress: shippingAdress,
          paymentMethod: payment.toLocaleLowerCase(),
          shippingPrice: invoiceTaxes,
          totalPrice: invoiceTotal,
        })
      );
      clearCart();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container maxWidth="lg">
      <Box>
        <Box sx={{ margin: "auto", textAlign: "center", mt: 5 }}>
          <Box sx={{ mb: 5, backgroundColor: "#557153", borderRadius: 2 }}>
            <Stack
              direction="row"
              divider={<Divider orientation="vertical" flexItem />}
              spacing={1}
              justifyContent="space-around"
            >
              <Item>
                <Stack direction="row">
                  <Box
                    sx={{
                      p: 3,
                      backgroundColor: "#E6E5A3",
                      borderRadius: "50%",
                      mr: 3,
                    }}
                  >
                    <PersonIcon fontSize="large" color="primary" />
                  </Box>
                  <Stack justifyContent="center">
                    <Typography sx={{ fontWeight: 700 }}>Customer</Typography>

                    <Typography>{user.name}</Typography>
                  </Stack>
                </Stack>
              </Item>
              <Item>
                <Stack direction="row">
                  <Box
                    sx={{
                      p: 3,
                      backgroundColor: "#E6E5A3",
                      borderRadius: "50%",
                      mr: 3,
                    }}
                  >
                    <LocalShippingIcon fontSize="large" color="primary" />
                  </Box>
                  <Stack justifyContent="center">
                    <Typography sx={{ fontWeight: 700 }}>Order Info</Typography>
                    <Typography>Shipping: {shippingAdress.city}</Typography>
                    <Typography>Payment: {payment}</Typography>
                  </Stack>
                </Stack>
              </Item>
              <Item>
                <Stack direction="row">
                  <Box
                    sx={{
                      p: 3,
                      backgroundColor: "#E6E5A3",
                      borderRadius: "50%",
                      mr: 3,
                    }}
                  >
                    <PlaceIcon fontSize="large" color="primary" />
                  </Box>
                  <Stack justifyContent="center">
                    <Typography sx={{ fontWeight: 700 }}>Deliver to</Typography>
                    <Typography>Address: {shippingAdress.address}</Typography>
                    <Typography>Phone: {shippingAdress.phone}</Typography>
                  </Stack>
                </Stack>
              </Item>
            </Stack>
          </Box>

          <Stack direction="row">
            <TableContainer
              component={Paper}
              sx={{
                border: "1px solid grey",
                borderRadius: 2,
              }}
            >
              <Table sx={{ minWidth: 300 }} aria-label="spanning table">
                <TableHead>
                  <TableRow>
                    <TableCell align="center" colSpan={3}>
                      Details
                    </TableCell>
                    <TableCell align="left" colSpan={2}>
                      Price
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
                  {rows.map((row) => (
                    <TableRow key={row.product_id}>
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
                                image={`http://localhost:8000${row?.image}`}
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
                              {row.desc}
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
            <Box
              sx={{
                ml: 3,
                border: "1px solid grey",
                borderRadius: 2,
              }}
            >
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell align="center">Details</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody></TableBody>
                </Table>
                <TableRow>
                  <TableCell colSpan={2}>Subtotal</TableCell>
                  <TableCell colSpan={1} />
                  <TableCell align="center" colSpan={1}>
                    {ccyFormat(invoiceSubtotal)}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell colSpan={1}>Tax</TableCell>
                  <TableCell colSpan={2} align="center">
                    <Typography noWrap variant="subtitle2">
                      {`${(TAX_RATE * 100).toFixed(0)} %`}
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
                    {ccyFormat(invoiceTaxes)}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell colSpan={3}>Total</TableCell>
                  <TableCell align="center">
                    {ccyFormat(invoiceTotal)} vnd
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell colSpan={4}>
                    <Button onClick={handlePlaceOrder} variant="contained">
                      Place Order
                    </Button>
                  </TableCell>
                </TableRow>
              </TableContainer>
            </Box>
          </Stack>
        </Box>
      </Box>
    </Container>
  );
}

export default PlaceOrder;
