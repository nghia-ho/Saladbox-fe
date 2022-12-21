import {
  Avatar,
  Chip,
  IconButton,
  Stack,
  TableBody,
  TableCell,
  TableRow,
  Typography,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import React from "react";

function BodyTable({ products, handleOpenPopover }) {
  return (
    <TableBody>
      {products &&
        products.map((row) => {
          const { name, category, image, price, calo, isDeleted } = row;

          return (
            <TableRow hover key={row._id} tabIndex={-1} role="checkbox">
              <TableCell align="center" scope="row">
                <Typography variant="subtitle2" noWrap>
                  {name}
                </Typography>
              </TableCell>

              <TableCell align="center">
                <Stack direction="row" justifyContent="center">
                  <Avatar
                    alt={name}
                    src={`http://localhost:8000${image[0] || "/salads/1.png"}`}
                  />
                </Stack>
              </TableCell>

              <TableCell align="center">{category.name}</TableCell>
              <TableCell align="center">{price}</TableCell>
              <TableCell align="center">{calo}</TableCell>
              <TableCell align="center">
                {isDeleted ? (
                  <Chip label="deleted" color="error" variant="outlined" />
                ) : (
                  <Chip label="avaiable" color="success" variant="outlined" />
                )}
              </TableCell>

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
