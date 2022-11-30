import { Button, Grid, Typography } from "@mui/material";
import { Box, Container, Stack } from "@mui/system";
import React, { useEffect } from "react";
import { FormProvider } from "../../components/form";
import FTextField from "../../components/form/FTextField";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "./userSlice";

function ProfileInfomation() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);
  const { user } = useSelector((state) => state.user);
  console.log(user?.name);
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
    <Container>
      <Grid container spacing={4}>
        <Grid item xs={3}>
          <Box
            sx={{
              borderRadius: "50%",
              backgroundColor: "grey",
              width: "120px",
              height: "120px",
            }}
          />
        </Grid>
        <Grid item xs={8}>
          Hi Nghia
        </Grid>
        <Box sx={{ m: 4, width: "75%" }}>
          <Typography>Thông tin cá nhân</Typography>
          <Box sx={{ mt: 4 }}>
            <FormProvider methods={methods}>
              <Stack spacing={2}>
                <FTextField name="name" label="Your Name" size="small" />
                <FTextField name="email" label="Email" size="small" />
                <FTextField name="address" label="Address" size="small" />
                <FTextField name="phone" label="Phone" size="small" />
                <Button variant="contained"> Save </Button>
              </Stack>
            </FormProvider>
          </Box>
        </Box>
      </Grid>
    </Container>
  );
}

export default ProfileInfomation;
