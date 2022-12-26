import React, { useEffect } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Stack, Box } from "@mui/material";

import { editOrder, editOrderCustom } from "./orderSlice";

import { useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";

import { FTextField, FormProvider } from "../../components/form";

function ModalEditInfo({ open, handleClose, order }) {
  const dispatch = useDispatch();
  const location = useLocation();

  const defaultValues = {
    name: order?.user.name || "",
    phone: order?.shippingAddress.phone || "",
    email: order?.user.email || "",
    address: order?.shippingAddress.address || "",
    district: order?.shippingAddress.district || "",
  };
  const methods = useForm({
    defaultValues,
  });
  const { handleSubmit, reset } = methods;

  const onSubmit = async (data) => {
    if (location.state === "order") {
      dispatch(
        editOrder({
          id: order._id,
          phone: data.phone,
          address: data.address,
          district: data.district,
        })
      );
    } else if (location.state === "orderCustom") {
      dispatch(
        editOrderCustom({
          id: order._id,
          phone: data.phone,
          address: data.address,
          district: data.district,
        })
      );
      handleClose();
    }
  };

  useEffect(() => {
    if (order) reset(defaultValues);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [order, reset]);

  return (
    <Dialog open={open} onClose={handleClose}>
      <Box sx={{ width: { md: 400, lg: 600 } }}>
        <DialogTitle>Edit Customer Information</DialogTitle>
        <DialogContent>
          <Stack spacing={2}>
            <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
              <Stack spacing={1} mt={1}>
                <FTextField disabled name="name" label="Name" />
                <FTextField name="phone" label="Phone" />
                <FTextField disabled name="email" label="Email" />
                <FTextField name="address" label="Address" />
                <FTextField name="district" label="District" />
              </Stack>

              <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={handleSubmit} type="submit">
                  Save
                </Button>
              </DialogActions>
            </FormProvider>
            <Stack direction="row" spacing={2}></Stack>
          </Stack>
        </DialogContent>
      </Box>
    </Dialog>
  );
}

export default ModalEditInfo;
