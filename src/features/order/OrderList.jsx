import { Box, Container } from "@mui/system";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOrders } from "./orderSlice";
import LoadingScreen from "../../components/LoadingScreen";
import { Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";

import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import moment from "moment";

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

function createData(orderId, date, product, price, status) {
  return { orderId, date, product, price, status };
}

const OrderList = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getOrders());
  }, [dispatch]);

  const { ordersList, isLoading } = useSelector((state) => state.order);

  const row = (param) => {
    const order = param.map((orderItem) => {
      return createData(
        orderItem._id,
        orderItem.createdAt,
        orderItem.orderItems,
        orderItem.totalPrice,
        orderItem.isPaid
      );
    });
    return order;
  };
  let rows = row(ordersList);
  console.log(rows);

  return (
    <Box sx={{ width: 1 }}>
      {isLoading && <LoadingScreen />}
      {(ordersList.length === 0 || !ordersList) && (
        <Box sx={{ maxWidth: 480, margin: "auto", textAlign: "center" }}>
          <Typography variant="h4" paragraph>
            No Orders
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
              <StyledTableCell>Product</StyledTableCell>
              <StyledTableCell align="right">Amount</StyledTableCell>
              <StyledTableCell align="right">Status</StyledTableCell>
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
                  {row.status ? "Complete" : "Unpaid"}
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default OrderList;
