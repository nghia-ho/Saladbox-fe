import { Card, Divider, Grid, Paper, Typography } from "@mui/material";
import { Box, Stack } from "@mui/system";
import React, { useEffect, useCallback } from "react";
import { FormProvider, FUploadAvatar } from "../../components/form";
import FTextField from "../../components/form/FTextField";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { getUser, updateUser } from "./userSlice";
import useAuth from "../../hooks/useAuth";
import { LoadingButton } from "@mui/lab";

function ProfileInfomation() {
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.user.isLoading);
  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

  const { user } = useAuth();

  const defaultValues = {
    name: user?.name || "",
    email: user?.email || "",
    address: user?.address || "",
    phone: user?.phone || "",
    avatarUrl: user?.avatarURL || "",
  };
  const methods = useForm({
    defaultValues,
  });

  const {
    setValue,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const handleDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];

      if (file) {
        setValue(
          "avatarUrl",
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        );
      }
    },
    [setValue]
  );

  const onSubmit = async (data) => {
    dispatch(
      updateUser({ userId: user._id, ...data, avatarURL: data.avatarUrl })
    );
  };

  return (
    <Box sx={{ width: 1 }}>
      <Paper
        elevation={1}
        sx={{
          p: 3,
          width: 1,
          boxShadow: "rgba(17, 12, 46, 0.15) 0px 48px 100px 0px;",
        }}
      >
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={1}>
            <Stack
              direction="row"
              sx={{ width: 1, display: { xs: "block", md: "flex" } }}
              alignItems="center"
              justifyContent="center"
            >
              <Grid item xs={12} md={6}>
                <FUploadAvatar
                  name="avatarUrl"
                  accept="image/*"
                  maxSize={9145728}
                  onDrop={handleDrop}
                />
              </Grid>
              <Grid item xs={12} md={12}>
                <Typography
                  variant="h4"
                  sx={{ fontWeight: 600 }}
                  align="center"
                >
                  Hi {user.name ? user.name : ""} !
                </Typography>
              </Grid>
            </Stack>
            <Box sx={{ my: 3, width: 1 }}>
              <Box py={3} v>
                <Divider />
              </Box>
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                Personal Information{" "}
              </Typography>
              <Box sx={{ mt: 4 }}>
                <Stack spacing={2} alignItems="end">
                  <FTextField name="name" label="Your Name" size="large" />
                  <FTextField name="email" label="Email" size="large" />
                  <FTextField name="address" label="Address" size="large" />
                  <FTextField name="phone" label="Phone" size="large" />
                  <FTextField
                    name="aboutme"
                    label="About Me"
                    size="large"
                    multiline
                    rows={4}
                  />
                  <LoadingButton
                    variant="contained"
                    type="submit"
                    sx={{ width: 1 / 3, backgroundColor: "primary.darker" }}
                    loading={isSubmitting || isLoading}
                  >
                    Save
                  </LoadingButton>
                </Stack>
              </Box>
            </Box>
          </Grid>
        </FormProvider>
      </Paper>
    </Box>
  );
}

export default ProfileInfomation;
