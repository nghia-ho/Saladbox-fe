import { Box, Divider } from "@mui/material";
import { Stack } from "@mui/material";
import { Button } from "@mui/material";
import { Typography } from "@mui/material";
import { Container } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { CardActionArea } from "@mui/material";
import { CardMedia } from "@mui/material";

import PersonIcon from "@mui/icons-material/Person";
import { styled } from "@mui/material/styles";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import PlaceIcon from "@mui/icons-material/Place";
import { useDispatch, useSelector } from "react-redux";
import { getSingleOrder, payOrder } from "../features/order/orderSlice";
import LoadingScreen from "../components/LoadingScreen";
import apiService from "../app/apiService";

import { PayPalButton } from "react-paypal-button-v2";

function ccyFormat(num) {
  return `${num.toFixed(0)}`;
}

const Item = styled(Box)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(3),
  textAlign: "center",
  color: "#E6E5A3",
}));
function OrderPage() {
  const [sdkReady, setsdkReady] = useState(false);
  let { id } = useParams();
  const dispatch = useDispatch();
  const { order, orderPay, isLoading } = useSelector((state) => state.order);

  useEffect(() => {
    const addPayPalScript = async () => {
      const { data: clientId } = await apiService.get("/config/paypal");
      const script = document.createElement("script");
      script.type = "text/javascript";
      script.src = `https://www.paypal.come/sdk/js?client-id=${clientId}`;
      script.async = true;
      script.onload = () => {
        setsdkReady(true);
      };
      document.body.appendChild(script);
    };
    if (!order._id) {
      dispatch(getSingleOrder(id));
    } else if (!order.isPaid) {
      if (!window.paypal) {
        addPayPalScript();
        setsdkReady(true);
      } else {
        setsdkReady(true);
      }
    }
  }, [dispatch, id, order, orderPay]);

  const successPaymentHandler = (paymentResult) => {
    dispatch(payOrder(id, paymentResult));
  };
  return (
    <Container maxWidth="lg">
      {!order._id ? (
        <LoadingScreen />
      ) : (
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
                    <Stack justifyContent="center" alignItems="start">
                      <Typography sx={{ fontWeight: 700 }}>Customer</Typography>

                      <Typography>{order.user.name}</Typography>
                      <Typography>{order.user.email}</Typography>
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
                    <Stack justifyContent="center" alignItems="start">
                      <Typography sx={{ fontWeight: 700 }}>
                        Order Info
                      </Typography>
                      <Typography>
                        Shipping: {order.shippingAddress.city}
                      </Typography>
                      <Typography>Payment: {order.paymentMethod}</Typography>
                    </Stack>
                  </Stack>
                  <Box sx={{ mt: 1, width: 1 / 2 }}>
                    {order.isPaid ? (
                      <Box sx={{ p: 3, backGroundColor: "green" }}>
                        Paid status: {order.paymentResult.status}
                      </Box>
                    ) : (
                      <Box
                        sx={{
                          p: 1,
                          backgroundColor: "red",
                          borderRadius: 3,
                        }}
                      >
                        <Typography>Not Paid</Typography>
                      </Box>
                    )}
                  </Box>
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
                    <Stack justifyContent="center" alignItems="start">
                      <Typography sx={{ fontWeight: 700 }}>
                        Deliver to
                      </Typography>
                      <Typography>
                        Address: district ${order.shippingAddress.distrit}{" "}
                        {order.shippingAddress.address}
                      </Typography>
                      <Typography>
                        Phone: {order.shippingAddress.phone}
                      </Typography>
                    </Stack>
                  </Stack>
                  <Box sx={{ mt: 1, width: 1 / 3 }}>
                    {order.isDeliverd ? (
                      <Box sx={{ p: 3, backGroundColor: "green" }}>
                        Deliverd on {order.paidAt}
                      </Box>
                    ) : (
                      <Box
                        sx={{
                          p: 1,
                          backgroundColor: "red",
                          borderRadius: 3,
                        }}
                      >
                        <Typography>Not Deliverd</Typography>
                      </Box>
                    )}
                  </Box>
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
                    {order.orderItems.map((row) => (
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
                                  alt={row.name}
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
                        <TableCell align="center">{row.price}</TableCell>
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
                      {ccyFormat(order.totalPrice)}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell colSpan={3}>Tax</TableCell>
                    <TableCell colSpan={2} align="center">
                      <Typography noWrap variant="subtitle2">
                        {order.shippingPrice}
                      </Typography>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell colSpan={3}>Total</TableCell>
                    <TableCell align="center">
                      {ccyFormat(order.totalPrice)}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell colSpan={4}>
                      {order.paymentMethod === "paypal" && !order.isPaid ? (
                        <Box>
                          {isLoading && <LoadingScreen />}
                          {!sdkReady ? (
                            <LoadingScreen />
                          ) : (
                            <PayPalButton
                              amount={order.totalPrice}
                              onSuccess={successPaymentHandler}
                            />
                          )}
                        </Box>
                      ) : (
                        <Box>
                          <Button variant="outlined" disableTouchRipple>
                            Completed
                          </Button>
                        </Box>
                      )}
                    </TableCell>
                  </TableRow>
                </TableContainer>
              </Box>
            </Stack>
          </Box>
        </Box>
      )}
    </Container>
  );
}

export default OrderPage;
