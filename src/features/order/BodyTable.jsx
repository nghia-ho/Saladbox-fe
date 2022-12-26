import React from "react";
import {
  Typography,
  IconButton,
  TableRow,
  TableCell,
  TableBody,
  Chip,
} from "@mui/material";

import MoreVertIcon from "@mui/icons-material/MoreVert";
import moment from "moment";

function BodyTable({ ordersList, handleOpenPopover }) {
  return (
    <TableBody>
      {ordersList &&
        ordersList.map((row) => {
          return (
            <TableRow hover key={row.createdAt} tabIndex={-1} role="checkbox">
              <TableCell align="center" scope="row">
                <Typography variant="subtitle2" noWrap>
                  {row._id}
                </Typography>
              </TableCell>

              <TableCell align="center">{row.user.name}</TableCell>
              <TableCell align="center">
                {moment(row.createdAt).calendar()}
              </TableCell>
              <TableCell align="center">
                {row.isPaid ? (
                  <Chip label="Paid" color="primary" variant="outlined" />
                ) : (
                  <Chip label="Not Paid" color="info" variant="outlined" />
                )}
              </TableCell>
              <TableCell align="center">{row.totalPrice}</TableCell>

              <TableCell align="center">
                {row.isDeleted ? (
                  <Chip label="Canceled" color="error" variant="outlined" />
                ) : row.isDeliverd ? (
                  <Chip label="Deliver" color="primary" variant="outlined" />
                ) : (
                  <Chip label="Pending" color="info" variant="outlined" />
                )}
              </TableCell>
              <TableCell align="center">{row?.paymentMethod}</TableCell>

              <TableCell align="center">
                <IconButton
                  size="large"
                  color="inherit"
                  onClick={(e) => handleOpenPopover(e, row)}
                >
                  <MoreVertIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          );
        })}
    </TableBody>
  );
}

export default BodyTable;
