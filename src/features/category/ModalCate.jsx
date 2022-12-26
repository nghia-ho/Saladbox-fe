import React, { useEffect } from "react";
import { LoadingButton } from "@mui/lab";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Stack, Box, Alert } from "@mui/material";
import { FTextField, FormProvider } from "../../components/form";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { createCategory, editCategory } from "./categorySlice";

import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

const FormProductSchema = Yup.object().shape({
  name: Yup.string().required("Name of product is required"),
});

function ModalCate({
  handleClose,
  cateSelected,
  open,
  mode,
  isLoading,
  error,
}) {
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
    setError,
  } = methods;

  const onSubmit = async (data) => {
    try {
      if (mode === "edit") {
        const cate = await dispatch(
          editCategory({
            name: data.name,
            id: cateSelected._id,
          })
        );
        if (cate) handleClose();
      } else {
        const cate = await dispatch(createCategory(data.name));
        if (cate) handleClose();
      }
    } catch (error) {
      console.log(error);
      setError("responseError", error);
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
              {error ? <Alert severity="info">{error}</Alert> : <></>}
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
