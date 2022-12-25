import React from "react";
import { Box } from "@mui/system";
import LoadingScreen from "../../components/LoadingScreen";
import { Button, IconButton, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import DeleteIcon from "@mui/icons-material/Delete";

import moment from "moment";

import { styled } from "@mui/material/styles";
import { useDispatch } from "react-redux";
import { deleteOrder, getSingleOrder } from "./orderSlice";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

function createData(
  orderId,
  date,
  product,
  price,
  paymentMethod,
  status,
  isDeliverd,
  deleted
) {
  return {
    orderId,
    date,
    product,
    price,
    status,
    paymentMethod,
    isDeliverd,
    deleted,
  };
}

function Order({ isLoading, ordersList }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const row = (param) => {
    const order = param.map((orderItem) => {
      return createData(
        orderItem._id,
        orderItem.createdAt,
        orderItem.orderItems,
        orderItem.totalPrice,
        orderItem.paymentMethod,
        orderItem.isPaid,
        orderItem.isDeliverd,
        orderItem.isDeleted
      );
    });
    return order;
  };
  let rows = row(ordersList);
  const handleView = (order) => {
    dispatch(getSingleOrder(order.orderId));
    navigate(`/order/${order.orderId}`);
  };
  console.log(rows);
  return (
    <Box sx={{ width: 1 }}>
      {isLoading && <LoadingScreen />}
      {(ordersList.length === 0 || !ordersList) && (
        <Box sx={{ maxWidth: 480, margin: "auto", textAlign: "center", mb: 3 }}>
          <Typography variant="h4" paragraph>
            No Order
          </Typography>
          <Button to="/menu" variant="contained" component={Link}>
            Go Shopping
          </Button>
        </Box>
      )}
      <TableContainer component={Paper}>
        <Table
          sx={{ minWidth: { xs: 10, sm: 600, md: 700 } }}
          aria-label="customized table"
        >
          <TableHead>
            <TableRow>
              <StyledTableCell>Order ID</StyledTableCell>
              <StyledTableCell>Date</StyledTableCell>
              <StyledTableCell align="right"> Product</StyledTableCell>
              <StyledTableCell align="right">Amount</StyledTableCell>
              <StyledTableCell align="right">Payment Method</StyledTableCell>
              <StyledTableCell align="right">Paid Status</StyledTableCell>
              <StyledTableCell align="right">Delievery Status</StyledTableCell>
              <StyledTableCell align="center">More</StyledTableCell>
              <StyledTableCell align="center">Cancel</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <StyledTableRow key={row.orderId}>
                <StyledTableCell component="th" scope="row">
                  {row.orderId}
                </StyledTableCell>
                <StyledTableCell align="right">
                  {row.date ? moment(row.date).calendar() : ""}
                </StyledTableCell>
                <StyledTableCell align="right">
                  <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                    {row.product[0]?.name}...
                  </Typography>
                  + {row.product.length - 1} other items
                </StyledTableCell>
                <StyledTableCell align="right">{row.price}</StyledTableCell>
                <StyledTableCell align="right">
                  {row.paymentMethod}
                </StyledTableCell>
                <StyledTableCell align="right">
                  {row.status ? "Complete" : "Unpaid"}
                </StyledTableCell>
                <StyledTableCell align="right">
                  {row.isDeliverd ? "Complete" : "Not yet"}
                </StyledTableCell>
                <StyledTableCell align="center">
                  <Button onClick={() => handleView(row)}>More</Button>
                </StyledTableCell>
                {!row.isDeliverd ? (
                  <StyledTableCell align="center">
                    {row.deleted ? (
                      <Typography color="error" fontWeight="600">
                        Canceled
                      </Typography>
                    ) : (
                      <IconButton
                        size="large"
                        color="inherit"
                        onClick={() => dispatch(deleteOrder(row?.orderId))}
                      >
                        <DeleteIcon />
                      </IconButton>
                    )}
                  </StyledTableCell>
                ) : (
                  <StyledTableCell align="center"></StyledTableCell>
                )}
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export default Order;
