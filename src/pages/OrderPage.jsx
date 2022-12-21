import {
  Box,
  Divider,
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
  Stepper,
  Step,
  StepLabel,
  Grid,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import PlaceIcon from "@mui/icons-material/Place";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import { styled } from "@mui/material/styles";

import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { getSingleOrder, payOrder } from "../features/order/orderSlice";
import LoadingScreen from "../components/LoadingScreen";
import apiService from "../app/apiService";

import { PayPalButton } from "react-paypal-button-v2";
import moment from "moment";

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
  const [activeStep, setActiveStep] = useState(0);
  const [sdkReady, setsdkReady] = useState(false);
  let { id } = useParams();
  const dispatch = useDispatch();
  const { order, orderPay, isLoading } = useSelector((state) => state.order);
  const listDay = [
    order?.day1,
    order?.day2,
    order?.day3,
    order?.day4,
    order?.day5,
    order?.day6,
    order?.day7,
  ];
  let index = listDay.findLastIndex((e) => e === true);

  const steps = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  useEffect(() => {
    setActiveStep(index + 1);
  }, [index]);

  useEffect(() => {
    const addPayPalScript = async () => {
      const { data: clientId } = await apiService.get("/config/paypal");
      const script = document.createElement("script");
      script.type = "text/javascript";
      script.src = `https://www.paypal.com/sdk/js?currency=USD&client-id=${clientId}`;
      script.async = true;
      script.onload = () => {
        setsdkReady(true);
      };
      document.body.appendChild(script);
    };
    if (!order?._id) {
      dispatch(getSingleOrder(id));
    }
    if (!order?.isPaid && order?.paymentMethod === "paypal") {
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
      {!order?._id ? (
        <LoadingScreen />
      ) : (
        <Box>
          <Box sx={{ margin: "auto", textAlign: "center", mt: 5 }}>
            <Box
              sx={{ mb: 1, backgroundColor: "primary.darker", borderRadius: 2 }}
            >
              <Stack
                sx={{ flexDirection: { xs: "column", sm: "row" } }}
                divider={<Divider orientation="vertical" flexItem />}
                justifyContent="space-between"
              >
                <Item>
                  <Stack direction="row" spacing={3}>
                    <Stack
                      sx={{
                        display: { xs: "none", md: "inline" },
                        p: { xs: 0, sm: 1, md: 4 },
                        backgroundColor: "primary.lighter",
                        borderRadius: "50%",
                      }}
                    >
                      <PersonIcon fontSize="large" color="success" />
                    </Stack>
                    <Stack justifyContent="center" alignItems="start">
                      <Typography sx={{ fontWeight: 700 }}>Customer</Typography>

                      <Typography>{order.user.name}</Typography>
                      <Typography>{order.user.email}</Typography>
                    </Stack>
                  </Stack>
                </Item>
                <Item>
                  <Stack direction="row" spacing={3}>
                    <Stack
                      sx={{
                        display: { xs: "none", md: "inline" },
                        p: { xs: 0, sm: 1, md: 4 },
                        backgroundColor: "primary.lighter",
                        borderRadius: "50%",
                      }}
                    >
                      <LocalShippingIcon fontSize="large" color="success" />
                    </Stack>
                    <Stack justifyContent="center" alignItems="start">
                      <Typography sx={{ fontWeight: 700 }}>
                        Order Info
                      </Typography>
                      <Typography noWrap>
                        Shipping: {order.shippingAddress.city}
                      </Typography>
                      <Typography noWrap>
                        Payment: {order.paymentMethod}
                      </Typography>
                      <Box sx={{ mt: 1, width: 1 }}>
                        {order?.isPaid ? (
                          <Box>Paid status: {order?.paymentResult?.status}</Box>
                        ) : (
                          <Box
                            sx={{
                              backgroundColor: "red",
                              borderRadius: 1,
                            }}
                          >
                            <Typography>Not Paid</Typography>
                          </Box>
                        )}
                      </Box>
                    </Stack>
                  </Stack>
                </Item>
                <Item>
                  <Stack direction="row" spacing={3}>
                    <Stack
                      sx={{
                        display: { xs: "none", md: "inline" },
                        p: { xs: 0, sm: 1, md: 4 },
                        backgroundColor: {
                          xs: "primary.lighter",
                          sm: "none",
                          md: "none",
                        },
                        borderRadius: "50%",
                      }}
                    >
                      <PlaceIcon fontSize="large" color="success" />
                    </Stack>
                    <Stack justifyContent="center" alignItems="start">
                      <Typography sx={{ fontWeight: 700 }}>
                        Deliver to
                      </Typography>
                      <Typography noWrap>
                        Address: district {order.shippingAddress.district}{" "}
                        {order.shippingAddress.address}
                      </Typography>
                      <Typography noWrap>
                        Phone: {order.shippingAddress.phone}
                      </Typography>
                      <Box sx={{ mt: 1 }}>
                        {order.isDeliverd ? (
                          <Box sx={{ backGroundColor: "green" }}>
                            Deliverd on {moment(order.paidAt).calendar()}
                          </Box>
                        ) : (
                          <Box
                            sx={{
                              backgroundColor: "red",
                              borderRadius: 1,
                            }}
                          >
                            <Typography>Not Deliverd</Typography>
                          </Box>
                        )}
                      </Box>
                    </Stack>
                  </Stack>
                </Item>
              </Stack>
            </Box>

            {order?.custom && (
              <Card
                sx={{
                  display: { xs: "none", md: "inline" },
                  width: 1,
                  my: 1,
                }}
              >
                <Box sx={{ p: 3 }}>
                  <Stepper activeStep={activeStep}>
                    {steps.map((label, index) => {
                      const stepProps = {};
                      const labelProps = {};

                      return (
                        <Step key={label} {...stepProps}>
                          <StepLabel {...labelProps}>{label}</StepLabel>
                        </Step>
                      );
                    })}
                  </Stepper>

                  {activeStep === steps.length && (
                    <React.Fragment>
                      <Box
                        sx={{ display: "flex", flexDirection: "row", pt: 2 }}
                      >
                        <Box sx={{ flex: "1 1 auto" }} />
                        <Button disabled>Completed</Button>
                      </Box>
                    </React.Fragment>
                  )}
                </Box>
              </Card>
            )}

            {order?.custom && (
              <Card
                sx={{ display: { xs: "inline", md: "none" }, width: 1, my: 1 }}
              >
                <Box sx={{ p: 3 }}>
                  <Stepper activeStep={activeStep} orientation="vertical">
                    {steps.map((label, index) => {
                      const stepProps = {};
                      const labelProps = {};

                      return (
                        <Step key={label} {...stepProps}>
                          <StepLabel {...labelProps}>{label}</StepLabel>
                        </Step>
                      );
                    })}
                  </Stepper>

                  {activeStep === steps.length && (
                    <React.Fragment>
                      <Box
                        sx={{ display: "flex", flexDirection: "row", pt: 2 }}
                      >
                        <Box sx={{ flex: "1 1 auto" }} />
                        <Button disabled>Completed</Button>
                      </Box>
                    </React.Fragment>
                  )}
                </Box>
              </Card>
            )}

            <Grid container spacing={1}>
              <Grid item xs={12} md={9}>
                <TableContainer component={Paper}>
                  <Table sx={{ minWidth: 300 }} aria-label="spanning table">
                    <TableHead>
                      <TableRow>
                        <TableCell align="center" colSpan={4}>
                          Details
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
                      {order.orderItems.map((row, i) => (
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
              </Grid>
              <Grid item xs={12} md={3}>
                <TableContainer component={Paper} sx={{}}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell colSpan={5} align="center">
                          Invoice
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
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
                                  disabled={false}
                                  fundingSource={"paypal"}
                                />
                              )}
                            </Box>
                          ) : (
                            <Stack>
                              <Button variant="outlined" disableTouchRipple>
                                Completed
                              </Button>
                            </Stack>
                          )}
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
              </Grid>
            </Grid>
          </Box>
        </Box>
      )}
    </Container>
  );
}

export default OrderPage;
