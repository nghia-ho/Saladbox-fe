import React, { useCallback, useEffect, useState } from "react";
import { LoadingButton } from "@mui/lab";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Stack, Box, Modal } from "@mui/material";
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
  // ingredientStep1: Yup.array().min(1, "Ingredient should have at least one"),
  // ingredientStep2: Yup.array().min(1, "Ingredient should have at least one"),
  // ingredientStep3: Yup.array().min(1, "Ingredient should have at least one"),
});

function FormModalProduct({
  handleClose,
  open,
  mode,
  categories,
  ingredients,
  isLoading,
  selectedItem,
}) {
  const [openCreateCate, setOpenCreateCate] = useState(false);
  const dispatch = useDispatch();
  const defaultValues = {
    name: "",
    decription: "",
    category: "",
    image: "",
    ingredientStep1: mode === "edit" ? selectedItem.ingredientStep1 : [],
    ingredientStep2: mode === "edit" ? selectedItem.ingredientStep2 : [],
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
  } = methods;
  const onSubmit = async (data) => {
    const ingredients = [
      ...data.ingredientStep1.map((e) => e._id),
      ...data.ingredientStep2.map((e) => e._id),
      ...data.ingredientStep3.map((e) => e._id),
    ];
    if (mode === "edit") {
      dispatch(
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
      handleClose();
    } else {
      dispatch(
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
      handleClose();
    }
  };
  const onSubmitCreateCate = async (data) => {
    dispatch(createCategory(data.newCategory));
    setOpenCreateCate(false);
  };
  const step1 = ingredients?.filter((e) => e.step === 1);
  const step2 = ingredients?.filter((e) => e.step === 2);
  const step3 = ingredients?.filter((e) => e.step === 3);

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
          <FormProvider
            methods={methods}
            onSubmit={handleSubmit(onSubmitCreateCate)}
          >
            <FTextField name="newCategory" label="New Category Is: " />
            <Button type="submit">Create</Button>
          </FormProvider>
        </Box>
      </Modal>

      <Box sx={{ width: { md: 500, lg: 600 }, p: 2 }}>
        <DialogTitle sx={{ fontWeight: "600" }}>
          {mode === "create" ? "CREATE A NEW PRODUCT" : "EDIT PRODUCT"}
        </DialogTitle>
        <DialogContent>
          <Stack spacing={2}>
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
                {(selectedItem?.category === "637464ef3c08c345541890f2" ||
                  mode === "create") && (
                  <Stack direction="row">
                    <FAutocomplete
                      name={"ingredientStep1"}
                      label={"Green"}
                      options={step1}
                      defaultValue={defaultValues.ingredientStep1}
                      isOptionEqualToValue={(option, newValue) => {
                        return option.name === newValue.name;
                      }}
                      getOptionLabel={(step1) => step1.name}
                      width={1 / 3}
                    />
                    <FAutocomplete
                      name={"ingredientStep2"}
                      label={"Veggie & Topping"}
                      options={step2}
                      defaultValue={defaultValues.ingredientStep2}
                      getOptionLabel={(step2) => step2.name}
                      isOptionEqualToValue={(option, newValue) => {
                        return option.name === newValue.name;
                      }}
                      width={1 / 3}
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
                      width={1 / 3}
                    />
                  </Stack>
                )}
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
