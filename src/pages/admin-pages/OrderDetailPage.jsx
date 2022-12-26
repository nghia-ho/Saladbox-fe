import {
  Alert,
  AlertTitle,
  Box,
  Button,
  Card,
  Chip,
  Divider,
  Grid,
  IconButton,
  LinearProgress,
  Stack,
  Step,
  StepLabel,
  Stepper,
  Typography,
} from "@mui/material";
import { Container } from "@mui/system";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useParams } from "react-router-dom";
import {
  editOrder,
  editOrderCustom,
  getSingleOrder,
} from "../../features/order/orderSlice";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import EditIcon from "@mui/icons-material/Edit";
import ModalEditInfo from "../../features/order/ModalEditInfo";

function createRow(product, qty, price) {
  const total = qty * price;
  return { product, qty, price, total };
}

function subtotal(items) {
  return items?.map(({ price }) => price).reduce((sum, i) => sum + i, 0);
}

function OrderDeTailPage() {
  const location = useLocation();
  // console.log(location);
  const { order, isLoading } = useSelector((state) => state.order);
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

  const [openModal, setOpenModal] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [skipped, setSkipped] = useState(new Set());

  let { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getSingleOrder(id));
  }, [dispatch, id]);

  useEffect(() => {
    setActiveStep(index + 1);
  }, [index]);

  const row = (param) => {
    const order = param?.map((orderItem) => {
      return createRow(orderItem?.name, orderItem?.qty, orderItem?.price);
    });
    return order;
  };

  let rows = row(order?.orderItems);
  const invoiceSubtotal = subtotal(rows);

  const handleSuccess = () => {
    if (location.state === "order") {
      dispatch(editOrder({ id, isDeliverd: true }));
    } else if (location.state === "orderCustom") {
      dispatch(editOrderCustom({ id, isDeliverd: true }));
    }
  };

  const handleClickEdit = () => {
    setOpenModal(true);
  };
  const handleClose = () => {
    setOpenModal(false);
  };
  //---------------------------------------------------------------------------
  const steps = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  const handleNext = () => {
    let newSkipped = skipped;
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
    dispatch(editOrderCustom({ id, day: activeStep }));
  };

  return (
    <Container>
      <ModalEditInfo handleClose={handleClose} open={openModal} order={order} />
      <Box
        sx={{
          mb: 3,
          backgroundColor: "primary.darker",
          borderRadius: 2,
          p: 2,
        }}
      >
        <Typography variant="h6" fontWeight="600" color="primary.contrastText">
          Order Detail
        </Typography>
      </Box>
      {order?.custom && (
        <Card sx={{ width: 1, mb: 3, p: 3 }}>
          <Box>
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
            {activeStep === steps.length ? (
              <React.Fragment>
                <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                  <Box sx={{ flex: "1 1 auto" }} />
                  <Button disabled>Completed</Button>
                </Box>
              </React.Fragment>
            ) : (
              <React.Fragment>
                <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                  <Box sx={{ flex: "1 1 auto" }} />

                  {order.isDeleted ? (
                    <Chip color="error" label="Canceled" />
                  ) : order?.isPaid ? (
                    <Button onClick={handleNext}>
                      {activeStep === steps.length - 1 ? "Finish" : "Next"}
                    </Button>
                  ) : (
                    <Chip color="warning" label="Order UnPaid" />
                  )}
                </Box>
              </React.Fragment>
            )}
          </Box>
        </Card>
      )}
      {order && (
        <Grid container spacing={2}>
          <Grid item xs={12} md={8}>
            <Card sx={{ mb: 4 }}>
              <Box sx={{ p: 2 }}>
                <Typography variant="h6" fontWeight="600">
                  Product Infomation
                </Typography>
              </Box>
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 700 }} aria-label="spanning table">
                  <TableHead>
                    <TableRow>
                      <TableCell sx={{ fontWeight: 600 }}>PRODUCT</TableCell>
                      <TableCell sx={{ fontWeight: 600 }} align="right">
                        QTY.
                      </TableCell>
                      <TableCell sx={{ fontWeight: 600 }} align="right">
                        PRICE
                      </TableCell>
                      <TableCell sx={{ fontWeight: 600 }} align="right">
                        TOTAL
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {rows?.map((row, i) => (
                      <TableRow key={i} sx={{ height: 67 }}>
                        <TableCell>{row.product}</TableCell>
                        <TableCell align="right">{row.qty}</TableCell>
                        <TableCell align="right">{row.price}</TableCell>
                        <TableCell align="right">{row.total}</TableCell>
                      </TableRow>
                    ))}

                    <TableRow>
                      <TableCell rowSpan={6} />
                      <TableCell rowSpan={2} />
                      <TableCell colSpan={1}>Subtotal</TableCell>
                      <TableCell align="right">{invoiceSubtotal}</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </Card>

            <Box sx={{ mt: 2 }}>
              {isLoading && (
                <Box sx={{ width: 1 }}>
                  <LinearProgress color="success" />
                </Box>
              )}
              <Card sx={{ p: 2 }}>
                <Stack
                  sx={{ mb: 3 }}
                  direction="row"
                  justifyContent="space-between"
                >
                  <Typography variant="h6" fontWeight="600">
                    Customer Infomation
                  </Typography>
                  <IconButton onClick={handleClickEdit}>
                    <EditIcon />
                  </IconButton>
                </Stack>
                <Stack spacing={3}>
                  <Stack direction="row">
                    <Typography sx={{ width: 1 }}>Customer name:</Typography>
                    <Typography sx={{ width: 1 }} fontWeight="600">
                      {order.user.name}
                    </Typography>
                  </Stack>
                  <Divider />
                  <Stack direction="row">
                    <Typography sx={{ width: 1 }}>
                      Customer Phone Number:
                    </Typography>
                    <Typography sx={{ width: 1 }} fontWeight="600">
                      {order.shippingAddress.phone}
                    </Typography>
                  </Stack>
                  <Divider />
                  <Stack direction="row">
                    <Typography sx={{ width: 1 }}>Customer email:</Typography>
                    <Typography sx={{ width: 1 }} fontWeight="600">
                      {order.user.email}
                    </Typography>
                  </Stack>
                  <Divider />
                  <Stack direction="row">
                    <Typography sx={{ width: 1 }}>Customer address</Typography>
                    <Typography
                      fontWeight="600"
                      sx={{ width: 1 }}
                    >{`${order.shippingAddress.address} district ${order.shippingAddress.district} ${order.shippingAddress.city}`}</Typography>
                  </Stack>
                </Stack>
              </Card>
            </Box>
          </Grid>

          <Grid item xs={12} md={4}>
            <Card sx={{ p: 2 }}>
              <Box sx={{ mb: 4 }}>
                <Typography variant="h6" fontWeight="600">
                  Order Summary
                </Typography>
              </Box>

              <Stack spacing={3}>
                <Stack direction="row" justifyContent="space-between">
                  <Typography>Item(s) Price:</Typography>
                  <Typography fontWeight="600">
                    {" "}
                    {order.orderItems
                      .map(({ price }) => price)
                      .reduce((sum, i) => sum + i, 0)}
                  </Typography>
                </Stack>
                <Stack direction="row" justifyContent="space-between">
                  <Typography>Shipping:</Typography>
                  <Typography fontWeight="600">
                    {order.shippingPrice}
                  </Typography>
                </Stack>
                <Divider />
                <Stack direction="row" justifyContent="space-between">
                  <Typography>Total:</Typography>
                  <Typography fontWeight="600">{order.totalPrice}</Typography>
                </Stack>
              </Stack>
            </Card>

            <Card sx={{ mt: 5, p: 2 }}>
              <Box sx={{ mb: 3 }}>
                <Typography variant="h6" fontWeight="600">
                  Order Status
                </Typography>
              </Box>

              <Stack spacing={2}>
                {order.isDeleted ? (
                  <Alert severity="error">
                    <AlertTitle>Canceled</AlertTitle>
                    Order is Canceled
                  </Alert>
                ) : (
                  <>
                    {!order.isDeliverd ? (
                      <>
                        <Alert severity="info">
                          <AlertTitle>Pending</AlertTitle>
                          Order not delivered successfully
                        </Alert>
                        {!order.isPaid && <Alert severity="info">Unpaid</Alert>}
                        <Button
                          variant="contained"
                          onClick={handleSuccess}
                          sx={{ bgcolor: "primary.darker" }}
                          disabled={
                            location.state === "order"
                              ? false
                              : !order.day7
                              ? true
                              : false
                          }
                        >
                          Confirm Order
                        </Button>
                      </>
                    ) : (
                      <>
                        <Alert severity="success">
                          <AlertTitle>Success</AlertTitle>
                          Order Delivered Successfully
                        </Alert>
                        {order.isPaid && <Alert severity="success">Paid</Alert>}
                      </>
                    )}
                  </>
                )}
              </Stack>
            </Card>
          </Grid>
        </Grid>
      )}
    </Container>
  );
}
export default OrderDeTailPage;
