import { Button, Grid, Paper, Typography } from "@mui/material";
import { Box, Stack } from "@mui/system";
import React, { useEffect } from "react";
import { FormProvider } from "../../components/form";
import FTextField from "../../components/form/FTextField";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { getUser } from "./userSlice";
import useAuth from "../../hooks/useAuth";

function ProfileInfomation() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

  const { user } = useAuth();

  const defaultValues = {
    name: user?.name || "",
    email: user?.email || "",
    address: user?.phone || "",
    phone: user?.address || "",
  };
  const methods = useForm({
    defaultValues,
  });
  return (
    <Paper elevation={2} sx={{ p: 3 }}>
      <Grid container spacing={1}>
        <Stack
          direction="row"
          sx={{ width: 1, display: { xs: "block", md: "flex" } }}
          alignItems="center"
          justifyContent="center"
        >
          <Grid item xs={12} md={6}>
            <Stack alignItems="center" my={2}>
              <Box
                sx={{
                  borderRadius: "50%",
                  backgroundColor: "grey",
                  width: "150px",
                  height: "150px",
                }}
              />
            </Stack>
          </Grid>
          <Grid item xs={12} md={12}>
            <Typography variant="h4" sx={{ fontWeight: 600 }} align="center">
              Hi {user.name ? user.name : ""} !
            </Typography>
          </Grid>
        </Stack>
        <Box sx={{ my: 3, width: 1 }}>
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            Personal Information{" "}
          </Typography>
          <Box sx={{ mt: 4 }}>
            <FormProvider methods={methods}>
              <Stack spacing={2} alignItems="end">
                <FTextField name="name" label="Your Name" size="large" />
                <FTextField name="email" label="Email" size="large" />
                <FTextField name="address" label="Address" size="large" />
                <FTextField name="phone" label="Phone" size="large" />
                <Button
                  variant="contained"
                  sx={{ width: 1 / 3, backgroundColor: "primary.darker" }}
                >
                  Save
                </Button>
              </Stack>
            </FormProvider>
          </Box>
        </Box>
      </Grid>
    </Paper>
  );
}

export default ProfileInfomation;
