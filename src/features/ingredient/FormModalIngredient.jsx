import React, { useCallback, useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Stack, Box, Alert } from "@mui/material";
import {
  FTextField,
  FormProvider,
  FSelect,
  FUploadAvatar,
} from "../../components/form";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { createIngredient, editIngredient } from "./ingredientSlice";

import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

const FormIngredientSchema = Yup.object().shape({
  type: Yup.string().required("Type is required"),
  name: Yup.string().required("Name is required"),
  image: Yup.mixed().test("type", "We only support file", (file) => {
    if (file) return true;
    return false;
  }),
  price: Yup.number().positive().required("Price is required"),
  calo: Yup.number().positive().required("Calo is required"),
});

function FormModalIngredient({
  handleClose,
  open,
  mode,
  type,
  selectedProduct,
  error,
}) {
  const dispatch = useDispatch();
  const [time, SetTime] = useState("");

  useEffect(() => {
    if (error?.messagge) {
      SetTime(error?.messagge);
      setTimeout(() => {
        SetTime("");
      }, 3000);
    }
  }, [error]);

  const defaultValues = {
    type: "Cheeze",
    name: "",
    image: "",
    price: "",
    calo: "",
  };

  const methods = useForm({
    resolver: yupResolver(FormIngredientSchema),
    defaultValues,
  });
  const { handleSubmit, reset, setValue } = methods;

  const onSubmit = async (data) => {
    if (mode === "edit") {
      const response = await dispatch(
        editIngredient({
          id: data._id,
          name: data.name,
          image: data.image,
          price: data.price,
          calo: data.calo,
          type: data.type,
        })
      );
      if (response?.success) handleClose();
    } else {
      const response = await dispatch(
        createIngredient({
          name: data.name,
          image: data.image,
          price: data.price,
          calo: data.calo,
          type: data.type,
        })
      );
      if (response?.success) handleClose();
    }
    // console.log(data);
  };
  // reset defaultValue
  useEffect(() => {
    if (selectedProduct) reset(selectedProduct);
    if (mode === "create") reset(defaultValues);
    if (!selectedProduct) reset(defaultValues);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedProduct, reset, mode]);

  const handleDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];

      if (file) {
        setValue(
          "image",
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        );
      }
    },
    [setValue]
  );

  return (
    <Dialog open={open} onClose={handleClose}>
      <Box sx={{ width: { md: 400, lg: 600 } }}>
        <DialogTitle>
          {mode === "create" ? "CREATE A NEW INGREDIENT" : "EDIT INGREDIENT"}
        </DialogTitle>
        <DialogContent>
          <Stack spacing={2}>
            <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
              <Stack spacing={1} mt={1}>
                <Box sx={{ mb: 2 }}>
                  <FUploadAvatar
                    product={selectedProduct}
                    name="image"
                    // accept="image/*"
                    maxSize={3145728}
                    onDrop={handleDrop}
                  />
                </Box>
                {time && (
                  <Alert severity={time === "Success" ? "success" : "warning"}>
                    {time}
                  </Alert>
                )}
                <FTextField name="name" label="Ingredient Name" />
                <FSelect name="type" label="Type" select>
                  {type?.map((item) => (
                    <option value={item} key={item}>
                      {item}
                    </option>
                  ))}
                </FSelect>
                <FTextField name="price" label="Price" />
                <FTextField name="calo" label="Calorie" />
              </Stack>

              <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={handleSubmit} type="submit">
                  {mode === "create" ? "Create" : "Save"}
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

export default FormModalIngredient;
