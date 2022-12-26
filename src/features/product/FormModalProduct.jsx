import React, { useCallback, useEffect, useState } from "react";
import { LoadingButton } from "@mui/lab";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Stack, Box, Modal, Grid, Alert, TextField } from "@mui/material";
import {
  FTextField,
  FormProvider,
  FSelect,
  FUploadAvatar,
} from "../../components/form";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { createCategory } from "../category/categorySlice";
import FAutocomplete from "../../components/form/FAutocomplete";
import { createProduct, editProduct } from "./productSlice";

import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

const FormProductSchema = Yup.object().shape({
  name: Yup.string().required("Name of product is required"),
  decription: Yup.string().required("Decription is required"),
  category: Yup.string().required("Category is required"),
});

function FormModalProduct({
  handleClose,
  open,
  mode,
  categories,
  ingredients,
  isLoading,
  selectedItem,
  errorMessage,
}) {
  const [openCreateCate, setOpenCreateCate] = useState(false);
  const [time, SetTime] = useState("");
  const [name, setName] = useState("");

  useEffect(() => {
    if (errorMessage) {
      SetTime(errorMessage);
      setTimeout(() => {
        SetTime("");
      }, 3000);
    }
  }, [errorMessage]);

  const dispatch = useDispatch();

  const defaultValues = {
    name: "",
    decription: "",
    category: categories[0]?._id || "",
    image: "",
    ingredientStep1: mode === "edit" ? selectedItem.ingredientStep1 : [],
    ingredientStep2_5: mode === "edit" ? selectedItem.ingredientStep2_5 : [],
    ingredientStep2_1: mode === "edit" ? selectedItem.ingredientStep2_1 : [],
    ingredientStep2_2: mode === "edit" ? selectedItem.ingredientStep2_2 : [],
    ingredientStep2_3: mode === "edit" ? selectedItem.ingredientStep2_3 : [],
    ingredientStep2_4: mode === "edit" ? selectedItem.ingredientStep2_4 : [],
    ingredientStep3: mode === "edit" ? selectedItem.ingredientStep3 : [],
  };
  const methods = useForm({
    resolver: yupResolver(FormProductSchema),
    defaultValues,
  });
  const {
    handleSubmit,
    reset,
    setValue,
    formState: { isSubmitting },
    setError,
  } = methods;
  const onSubmit = async (data) => {
    try {
      const ingredients = [
        ...data.ingredientStep1.map((e) => e._id),
        ...data.ingredientStep2_5.map((e) => e._id),
        ...data.ingredientStep2_1.map((e) => e._id),
        ...data.ingredientStep2_2.map((e) => e._id),
        ...data.ingredientStep2_3.map((e) => e._id),
        ...data.ingredientStep2_4.map((e) => e._id),
        ...data.ingredientStep3.map((e) => e._id),
      ];

      if (mode === "edit") {
        const product = await dispatch(
          editProduct({
            id: data._id,
            name: data.name,
            ingredients: ingredients,
            decription: data.decription,
            image: data.image,
            category: data.category,
            price: data.price,
            calo: data.calo,
            type: data.type,
          })
        );

        if (product.payload) handleClose();
      } else {
        const product = await dispatch(
          createProduct({
            name: data.name,
            decription: data.decription,
            ingredients,
            image: data.image,
            category: data.category,
            price: data.price,
            calo: data.calo,
            type: data.type,
          })
        );
        if (product.payload.success) handleClose();
      }
    } catch (error) {
      setError("responseError", error);
    }
  };

  const handleChange = (event) => {
    setName(event.target.value);
  };

  const onSubmitCreateCate = async () => {
    const result = dispatch(createCategory(name));
    if (result) setOpenCreateCate(false);
  };
  const step1 = ingredients?.filter((e) => e.step === 1 && !e.isDeleted);
  const step2_1 = ingredients?.filter(
    (i) => i.step === 2 && i.type === "Vegetable" && !i.isDeleted
  );
  const step2_2 = ingredients?.filter(
    (i) => i.step === 2 && i.type === "Protein" && !i.isDeleted
  );
  const step2_3 = ingredients?.filter(
    (i) => i.step === 2 && i.type === "Cheeze" && !i.isDeleted
  );
  const step2_4 = ingredients?.filter(
    (i) => i.step === 2 && i.type === "Fruit" && !i.isDeleted
  );
  const step2_5 = ingredients?.filter(
    (i) => i.step === 2 && i.type === "Cheeze" && !i.isDeleted
  );
  const step3 = ingredients?.filter((e) => e.step === 3 && !e.isDeleted);

  // reset defaultValue
  useEffect(() => {
    if (mode === "create") reset(defaultValues);
    if (mode === "edit") reset(selectedItem);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedItem, reset, mode]);

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
      {/* modal create category */}
      <Modal
        open={openCreateCate}
        onClose={() => setOpenCreateCate(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 500,
            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: 24,
            p: 6,
          }}
        >
          <TextField
            id="outlined-name"
            label="NEW CATEGORY"
            value={name}
            onChange={handleChange}
          />
          <Button type="submit" onClick={onSubmitCreateCate}>
            Create
          </Button>
        </Box>
      </Modal>

      <Box sx={{ width: 1, p: 2 }}>
        <DialogTitle sx={{ fontWeight: "600" }}>
          {mode === "create" ? "CREATE A NEW PRODUCT" : "EDIT PRODUCT"}
        </DialogTitle>
        <DialogContent>
          <Stack spacing={2}>
            {time && <Alert severity="info">{time}</Alert>}
            <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
              <Stack spacing={1} my={1}>
                <FUploadAvatar
                  product={selectedItem}
                  name="image"
                  // accept="image/*"
                  maxSize={3145728}
                  onDrop={handleDrop}
                />
                <FTextField name="name" label="Product Name" />
                <FTextField
                  name="decription"
                  label="Decription"
                  multiline
                  rows={2}
                />
                <Stack direction={"row"} alignItems="center">
                  <FSelect name="category" label="Category" select>
                    {categories?.map((item) => (
                      <option value={item._id} key={item._id}>
                        {item.name}
                      </option>
                    ))}
                  </FSelect>

                  <Button onClick={() => setOpenCreateCate(true)}>
                    Create new category
                  </Button>
                </Stack>
                <Grid container>
                  <FAutocomplete
                    name={"ingredientStep1"}
                    label={"Green"}
                    options={step1}
                    defaultValue={defaultValues.ingredientStep1}
                    isOptionEqualToValue={(option, newValue) => {
                      return option.name === newValue.name;
                    }}
                    getOptionLabel={(step1) => step1.name}
                    width={1 / 2}
                  />
                  <FAutocomplete
                    name={"ingredientStep2_1"}
                    label={"Vegetable"}
                    options={step2_1}
                    defaultValue={defaultValues.ingredientStep2_1}
                    getOptionLabel={(step2_1) => step2_1.name}
                    isOptionEqualToValue={(option, newValue) => {
                      return option.name === newValue.name;
                    }}
                    width={1 / 2}
                  />
                  <FAutocomplete
                    name={"ingredientStep2_2"}
                    label={"Protein"}
                    options={step2_2}
                    defaultValue={defaultValues.ingredientStep2_2}
                    getOptionLabel={(step2_2) => step2_2.name}
                    isOptionEqualToValue={(option, newValue) => {
                      return option.name === newValue.name;
                    }}
                    width={1 / 2}
                  />
                  <FAutocomplete
                    name={"ingredientStep2_3"}
                    label={"Cheeze"}
                    options={step2_3}
                    defaultValue={defaultValues.ingredientStep2_3}
                    getOptionLabel={(step2_3) => step2_3.name}
                    isOptionEqualToValue={(option, newValue) => {
                      return option.name === newValue.name;
                    }}
                    width={1 / 2}
                  />
                  <FAutocomplete
                    name={"ingredientStep2_4"}
                    label={"Fruit"}
                    options={step2_4}
                    defaultValue={defaultValues.ingredientStep2_4}
                    getOptionLabel={(step2_4) => step2_4.name}
                    isOptionEqualToValue={(option, newValue) => {
                      return option.name === newValue.name;
                    }}
                    width={1 / 2}
                  />
                  <FAutocomplete
                    name={"ingredientStep2_5"}
                    label={"Cheeze"}
                    options={step2_5}
                    defaultValue={defaultValues.ingredientStep2_5}
                    getOptionLabel={(step2_5) => step2_5.name}
                    isOptionEqualToValue={(option, newValue) => {
                      return option.name === newValue.name;
                    }}
                    width={1 / 2}
                  />
                  <FAutocomplete
                    name={"ingredientStep3"}
                    label={"Sauce"}
                    options={step3}
                    defaultValue={defaultValues.ingredientStep3}
                    getOptionLabel={(step3) => step3.name}
                    isOptionEqualToValue={(option, newValue) => {
                      return option.name === newValue.name;
                    }}
                    width={1 / 2}
                  />
                </Grid>
              </Stack>

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
            <Stack direction="row" spacing={2}></Stack>
          </Stack>
        </DialogContent>
      </Box>
    </Dialog>
  );
}

export default FormModalProduct;
