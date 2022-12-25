import {
  Box,
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
  Grid,
} from "@mui/material";

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { getSingleOrder, payOrder } from "../features/order/orderSlice";
import LoadingScreen from "../components/LoadingScreen";
import apiService from "../app/apiService";

import { PayPalButton } from "react-paypal-button-v2";

import useAuth from "../hooks/useAuth";
import OrderInfo from "../features/order/OrderInfo";
import StepperOrder from "../features/order/StepperOrder";
import BodyTableRow from "../features/order/BodyTableRow";

const TABLE_HEAD = ["Items", "Qty.", "Unit", "Sum"];

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

  const auth = useAuth();

  useEffect(() => {
    if (!order?._id) {
      dispatch(getSingleOrder(id));
    }
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

    if (order?.paymentMethod === "paypal") {
      if (!window.paypal) {
        addPayPalScript();
      } else {
        // fix Bug render component Button paypall TT..TT huhu
        (async () => {
          await new Promise((resolve) => setTimeout(resolve, 1000));
          setsdkReady(true);
        })();
      }
    }
  }, [dispatch, id, order, orderPay]);

  const successPaymentHandler = (paymentResult) => {
    dispatch(payOrder(id, paymentResult));
  };

  const mode = "orderpage";

  return (
    <Container maxWidth="lg">
      {!order?._id ? (
        <LoadingScreen />
      ) : (
        <>
          <Box sx={{ margin: "auto", textAlign: "center", mt: 5 }}>
            {/* Infor Order */}
            <OrderInfo
              city={order.shippingAddress.city}
              name={auth.user.name}
              email={auth.user.email}
              isDeliverd={order.isDeliverd}
              paymentMethod={order.paymentMethod}
              isPaid={order?.isPaid}
              district={order.shippingAddress.district}
              address={order.shippingAddress.address}
              phone={order.shippingAddress.phone}
              paidAt={order.paidAt}
              mode={mode}
            />

            {/* 7days progress */}
            <StepperOrder order={order} activeStep={activeStep} steps={steps} />

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
                        {TABLE_HEAD.map((e) => (
                          <TableCell key={e}>{e}</TableCell>
                        ))}
                      </TableRow>
                    </TableHead>
                    {/* table BODY */}
                    <BodyTableRow rows={order.orderItems} />
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
                          {order.totalPrice.toLocaleString()}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell colSpan={3}>Tax</TableCell>
                        <TableCell colSpan={2} align="center">
                          <Typography noWrap variant="subtitle2">
                            {order.shippingPrice.toLocaleString()}
                          </Typography>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell colSpan={3}>Total</TableCell>
                        <TableCell align="center">
                          {order.totalPrice.toLocaleString()}
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
        </>
      )}
    </Container>
  );
}

export default OrderPage;
