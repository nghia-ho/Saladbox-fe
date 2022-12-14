import {
  Alert,
  AlertTitle,
  Box,
  Button,
  Card,
  Divider,
  Grid,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import { Container } from "@mui/system";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { editOrder, getSingleOrder } from "../../features/order/orderSlice";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import LoadingScreen from "../../components/LoadingScreen";
import EditIcon from "@mui/icons-material/Edit";
import ModalEditInfo from "../../components/ModalEditInfo";

function createRow(product, qty, price) {
  const total = qty * price;
  return { product, qty, price, total };
}

function subtotal(items) {
  return items?.map(({ price }) => price).reduce((sum, i) => sum + i, 0);
}

function OrderDeTailPage() {
  const [openModal, setOpenModal] = useState(false);

  let { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getSingleOrder(id));
  }, [dispatch, id]);

  const { order, isLoading } = useSelector((state) => state.order);

  const row = (param) => {
    const order = param?.map((orderItem) => {
      return createRow(orderItem?.name, orderItem?.qty, orderItem?.price);
    });
    return order;
  };

  let rows = row(order?.orderItems);
  const invoiceSubtotal = subtotal(rows);

  const handleSuccess = () => {
    dispatch(editOrder({ id, isDeliverd: true }));
  };

  const handleClickEdit = () => {
    setOpenModal(true);
  };
  const handleClose = () => {
    setOpenModal(false);
  };

  return (
    <Container>
      <ModalEditInfo handleClose={handleClose} open={openModal} order={order} />
      {isLoading ? (
        <LoadingScreen />
      ) : (
        order && (
          <Grid container spacing={2}>
            <Grid item xs={8}>
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
                      {rows?.map((row) => (
                        <TableRow key={row.product}>
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

              <Card sx={{ mt: 4, p: 2 }}>
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
            </Grid>

            <Grid item xs={4}>
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

                <Stack spacing={3}>
                  {!order.isDeliverd ? (
                    <>
                      <Alert severity="info">
                        <AlertTitle>Pending</AlertTitle>
                        Order not delivered successfully
                      </Alert>
                      <Button variant="contained" onClick={handleSuccess}>
                        Confirm Order Delivered Successfully
                      </Button>
                    </>
                  ) : (
                    <>
                      <Alert severity="success">
                        <AlertTitle>Success</AlertTitle>
                        Order Delivered Successfully
                      </Alert>
                    </>
                  )}
                </Stack>
              </Card>
            </Grid>
          </Grid>
        )
      )}
    </Container>
  );
}
export default OrderDeTailPage;
