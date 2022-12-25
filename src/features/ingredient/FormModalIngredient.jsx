import React, { useCallback, useEffect } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Stack, Box } from "@mui/material";
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

  price: Yup.number().positive().required("Price is required"),
  calo: Yup.number().positive().required("Calo is required"),
});

function FormModalIngredient({
  handleClose,
  open,
  mode,
  type,
  selectedProduct,
  page,
  rowsPerPage,
  filterName,
  order,
  orderBy,
}) {
  const dispatch = useDispatch();
  const defaultValues = {
    type: "",
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
      dispatch(
        editIngredient({
          id: data._id,
          name: data.name,
          image: data.image,
          price: data.price,
          calo: data.calo,
          type: data.type,
          filterName: filterName,
          sort: { orderBy, order },
          page: page + 1,
          limit: rowsPerPage,
        })
      );
    } else {
      dispatch(
        createIngredient({
          name: data.name,
          image: data.image,
          price: data.price,
          calo: data.calo,
          type: data.type,
        })
      );
    }
    console.log(data);
    handleClose(false);
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
