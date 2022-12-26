import styled from "@emotion/styled";
import { Box, Chip, Grid, Stack, Typography } from "@mui/material";
import React from "react";
import PersonIcon from "@mui/icons-material/Person";
import PlaceIcon from "@mui/icons-material/Place";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import PaidIcon from "@mui/icons-material/Paid";
import DeliveryDiningIcon from "@mui/icons-material/DeliveryDining";
import moment from "moment";

const Item = styled(Box)(({ theme }) => ({
  ...theme.typography.body2,
  textAlign: "center",
  color: "#E6E5A3",
}));

function OrderInfo({
  city,
  name,
  email,
  isDeliverd,
  paymentMethod,
  isPaid,
  district,
  address,
  phone,
  paidAt,
  mode,
}) {
  return (
    <Box sx={{ mb: 1, backgroundColor: "primary.darker", borderRadius: 2 }}>
      <Grid container spacing={4} sx={{ mt: 0, px: 3, pb: 3 }}>
        <Grid item xs={12} md={6}>
          <Item>
            <Stack direction="row" spacing={3}>
              <Stack
                sx={{
                  p: { xs: 0, md: 2 },
                  backgroundColor: {
                    xs: "inherit",
                    md: "primary.lighter",
                  },
                  borderRadius: "50%",
                }}
              >
                <PersonIcon fontSize="large" color="success" />
              </Stack>
              <Stack justifyContent="center" alignItems="start">
                <Typography sx={{ fontWeight: 700 }}>Customer</Typography>

                <Typography>{name}</Typography>
                <Typography>{email}</Typography>
              </Stack>
            </Stack>
          </Item>
        </Grid>
        <Grid item xs={12} md={6}>
          <Item>
            <Stack direction="row" spacing={3}>
              <Stack
                sx={{
                  p: { xs: 0, md: 2 },
                  backgroundColor: {
                    xs: "inherit",
                    md: "primary.lighter",
                  },
                  borderRadius: "50%",
                }}
              >
                <LocalShippingIcon fontSize="large" color="success" />
              </Stack>
              <Stack justifyContent="start" alignItems="start">
                <Typography sx={{ fontWeight: 700 }}>Order Info</Typography>
                <Typography noWrap>Shipping: {city}</Typography>
                <Typography noWrap>Payment: {paymentMethod}</Typography>
              </Stack>
            </Stack>
          </Item>
        </Grid>
        <Grid item xs={12} md={6}>
          <Item>
            <Stack direction="row" spacing={3}>
              <Box
                sx={{
                  p: { xs: 0, md: 2 },
                  backgroundColor: {
                    xs: "inherit",
                    md: "primary.lighter",
                  },
                  borderRadius: "50%",
                }}
              >
                <PlaceIcon fontSize="large" color="success" />
              </Box>
              <Stack justifyContent="center" alignItems="start">
                <Typography sx={{ fontWeight: 700 }}>Deliver to</Typography>
                <Typography align="left">
                  Address: district {district} {address}
                </Typography>
                <Typography>Phone: {phone}</Typography>
              </Stack>
            </Stack>
          </Item>
        </Grid>
        {mode === "orderpage" && (
          <Grid item xs={12} md={6}>
            <Box sx={{ mb: 1 }}>
              <Item>
                <Stack direction="row" spacing={1}>
                  <PaidIcon fontSize="small" color="success" />
                  <Stack justifyContent="center" alignItems="start">
                    <Typography sx={{ fontWeight: 700 }}>
                      Paid status:
                    </Typography>
                  </Stack>
                  {isPaid ? (
                    <Chip
                      label={` ${isPaid ? "Completed" : ""}`}
                      size="small"
                      color="primary"
                    />
                  ) : (
                    <Chip label={"Unpaid"} size="small" color="error" />
                  )}
                </Stack>
              </Item>
            </Box>
            <Item>
              <Stack direction="row" spacing={1}>
                <DeliveryDiningIcon fontSize="small" color="success" />
                <Stack justifyContent="center" alignItems="start">
                  <Typography sx={{ fontWeight: 700 }}>Deliverd on:</Typography>
                </Stack>
                {isDeliverd ? (
                  <Chip
                    label={` ${moment(paidAt).calendar()}`}
                    size="small"
                    color="primary"
                  />
                ) : (
                  <Chip label={"Not Delivered"} size="small" color="error" />
                )}
              </Stack>
            </Item>
          </Grid>
        )}
      </Grid>
    </Box>
  );
}

export default OrderInfo;
