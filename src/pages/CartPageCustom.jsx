import { Box } from "@mui/material";
import { Stack } from "@mui/material";
import { Button } from "@mui/material";
import { Typography } from "@mui/material";
import { Container } from "@mui/material";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { CardActionArea } from "@mui/material";
import { CardMedia } from "@mui/material";

import { useSelector } from "react-redux";
import { isString } from "lodash";

import { BASE_URL } from "../app/config";

function priceRow(qty, unit) {
  return qty * unit;
}

function createRow(desc, qty, unit, image, _id, name) {
  const price = priceRow(qty, unit);
  return { desc, qty, unit, price, image, _id, name };
}

function subtotal(items) {
  return items.map(({ price }) => price).reduce((sum, i) => sum + i, 0);
}

function CartPageCustom() {
  const { cartCustom } = useSelector((state) => state.cart);

  const navigate = useNavigate();
  const row = (param) => {
    const cart = param.map((cartItem) => {
      return createRow(
        cartItem.day.name,
        cartItem.quantity,
        cartItem.day.price,
        cartItem.day.image,
        cartItem.day._id,
        cartItem.name
      );
    });
    return cart;
  };
  let rows = row(cartCustom);

  const invoiceSubtotal = subtotal(rows);
  const invoiceTotal = invoiceSubtotal;

  const handleCheckout = () => {
    navigate("/shipping");
  };
  return (
    <Container>
      <Box>
        <Box sx={{ margin: "auto", textAlign: "center", mt: 5 }}>
          <Typography variant="h4" paragraph>
            Your Cart
          </Typography>

          <TableContainer component={Paper}>
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
                  <TableCell align="center">Date</TableCell>
                  <TableCell align="center">Item</TableCell>
                  <TableCell align="center">Qty.</TableCell>
                  <TableCell align="center">Unit</TableCell>
                  <TableCell align="center">Sum</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row, i) => (
                  <TableRow key={i}>
                    <TableCell align="center">{row.name}</TableCell>
                    <TableCell align="center">
                      <Stack direction="row" justifyContent="start">
                        <Box
                          sx={{
                            maxWidth: 50,
                            display: { xs: "none", sm: "inline" },
                          }}
                        >
                          <CardActionArea
                            component={Link}
                            to={`/product/${row._id}`}
                          >
                            <CardMedia
                              sx={{ borderRadius: 2 }}
                              component="img"
                              image={
                                isString(row?.image) &&
                                row?.image.includes("cloudinary")
                                  ? row?.image
                                  : row?.image
                                  ? `${BASE_URL}${row?.image}`
                                  : "/saladcustom.png"
                              }
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
                          <Typography align="left" gutterBottom>
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
                      {row.price.toLocaleString()}{" "}
                    </TableCell>
                  </TableRow>
                ))}

                <TableRow>
                  <TableCell rowSpan={4} />
                  <TableCell colSpan={1}>Subtotal</TableCell>
                  <TableCell colSpan={1} />
                  <TableCell align="center" colSpan={1}>
                    {invoiceSubtotal.toLocaleString()}
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell colSpan={2}>Total</TableCell>
                  <TableCell align="center">
                    {invoiceTotal.toLocaleString()}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell rowSpan={3} />
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>

          <Button onClick={handleCheckout} variant="contained" sx={{ mt: 5 }}>
            Check out
          </Button>
        </Box>
      </Box>
    </Container>
  );
}

export default CartPageCustom;
