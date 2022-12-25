import React, { useEffect, useState } from "react";
import { LoadingButton } from "@mui/lab";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Stack, Box } from "@mui/material";
import { FTextField, FormProvider } from "../../components/form";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { createCategory, editCategory } from "./categorySlice";

import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

const FormProductSchema = Yup.object().shape({
  name: Yup.string().required("Name of product is required"),
});

function ModalCate({ handleClose, cateSelected, open, mode, isLoading }) {
  const dispatch = useDispatch();
  const defaultValues = {
    name: "",
  };
  const methods = useForm({
    resolver: yupResolver(FormProductSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = async (data) => {
    if (mode === "edit") {
      dispatch(
        editCategory({
          name: data.name,
          id: cateSelected._id,
        })
      );
      handleClose();
    } else {
      dispatch(createCategory(data.name));
      handleClose();
    }
  };

  // reset defaultValue
  useEffect(() => {
    if (mode === "create") reset(defaultValues);
    if (mode === "edit") reset(cateSelected);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cateSelected, reset, mode]);

  return (
    <Dialog open={open} onClose={handleClose}>
      <Box sx={{ width: { md: 500, lg: 600 }, p: 2 }}>
        <DialogTitle sx={{ fontWeight: "600" }}>
          {mode === "create" ? "CREATE A NEW CATEGORY" : "EDIT CATEGORY"}
        </DialogTitle>
        <DialogContent>
          <Stack spacing={1}>
            <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
              <Box sx={{ py: 1 }}>
                <FTextField name="name" label="Name" />
              </Box>
              <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                {
                  <LoadingButton
                    loading={isSubmitting || isLoading}
                    onClick={handleSubmit}
                    type="submit"
                    variant="contained"
                  >
                    {mode === "create" ? "Create" : "Save"}
                  </LoadingButton>
                }
              </DialogActions>
            </FormProvider>
          </Stack>
        </DialogContent>
      </Box>
    </Dialog>
  );
}

export default ModalCate;
