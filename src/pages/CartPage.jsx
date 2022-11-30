import { Box } from "@mui/material";
import { Stack } from "@mui/material";
import { Button } from "@mui/material";
import { Typography } from "@mui/material";
import { Container } from "@mui/material";
import React, { useContext } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { CardActionArea } from "@mui/material";
import { CardMedia } from "@mui/material";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

const TAX_RATE = 0.07;

function ccyFormat(num) {
  return `${num.toFixed(0)}`;
}

function priceRow(qty, unit) {
  return qty * unit;
}

function createRow(desc, qty, unit, image, _id) {
  const price = priceRow(qty, unit);
  return { desc, qty, unit, price, image, _id };
}

function subtotal(items) {
  return items.map(({ price }) => price).reduce((sum, i) => sum + i, 0);
}

function CartPage() {
  const { cart, addToCard, subtractToCart, deleteFromCart } = useAuth();
  const navigate = useNavigate();
  const Row = (param) => {
    const cart = param.map((cartItem) => {
      return createRow(
        cartItem.name,
        cartItem.quantity,
        cartItem.price,
        cartItem.image,
        cartItem._id
      );
    });
    return cart;
  };
  let rows = Row(cart);

  const invoiceSubtotal = subtotal(rows);
  const invoiceTaxes = TAX_RATE * invoiceSubtotal;
  const invoiceTotal = invoiceTaxes + invoiceSubtotal;

  const handleCheckout = () => {
    navigate("/shipping");
  };

  return (
    <Container>
      <Box>
        {cart.length ? (
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
                    <TableCell>Item</TableCell>
                    <TableCell align="center">Qty.</TableCell>
                    <TableCell align="center">Unit</TableCell>
                    <TableCell align="center">Sum</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map((row) => (
                    <TableRow key={row.desc}>
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
                              to={`/product/${row.id}`}
                            >
                              <CardMedia
                                sx={{ borderRadius: 2 }}
                                component="img"
                                image={`http://localhost:8000${row?.image}`}
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
                            <Typography align="center" gutterBottom>
                              {row.desc}
                            </Typography>
                          </Box>
                        </Stack>
                      </TableCell>

                      <TableCell align="center">
                        <Stack direction="row" justifyContent="center">
                          <IconButton
                            variant="outlined"
                            size="small"
                            onClick={() => addToCard(row)}
                          >
                            <AddIcon />
                          </IconButton>
                          <Typography
                            variant="subtitle2"
                            sx={{ fontWeight: "600", m: 1 }}
                            align="center"
                          >
                            {row.qty}
                          </Typography>
                          <IconButton
                            variant="outlined"
                            size="small"
                            onClick={() => subtractToCart(row)}
                          >
                            <RemoveIcon />
                          </IconButton>
                        </Stack>
                      </TableCell>
                      <TableCell align="center">{row.unit}</TableCell>
                      <TableCell align="center">
                        {ccyFormat(row.price)}{" "}
                      </TableCell>
                      <TableCell align="center">
                        <IconButton
                          color="error"
                          onClick={() => deleteFromCart(row)}
                        >
                          <DeleteForeverIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}

                  <TableRow>
                    <TableCell rowSpan={4} />
                    <TableCell colSpan={1}>Subtotal</TableCell>
                    <TableCell colSpan={1} />
                    <TableCell align="center" colSpan={1}>
                      {ccyFormat(invoiceSubtotal)}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell colSpan={1}>Tax</TableCell>
                    <TableCell align="center">{`${(TAX_RATE * 100).toFixed(
                      0
                    )} %`}</TableCell>
                    <TableCell align="center">
                      {ccyFormat(invoiceTaxes)}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell colSpan={2}>Total</TableCell>
                    <TableCell align="center">
                      {ccyFormat(invoiceTotal)} vnd
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
        ) : (
          <Box sx={{ maxWidth: 480, margin: "auto", textAlign: "center" }}>
            <Typography variant="h4" paragraph>
              Your Cart is empty
            </Typography>
            <Button to="/menu" variant="contained" component={Link}>
              Go Back
            </Button>
          </Box>
        )}
      </Box>
    </Container>
  );
}

export default CartPage;
