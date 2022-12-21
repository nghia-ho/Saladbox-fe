import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Stack, Box, Modal } from "@mui/material";
import { FTextField, FormProvider, FSelect } from "../../components/form";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { createCategory } from "../category/categorySlice";
import FAutocomplete from "../../components/form/FAutocomplete";
import { createProduct, editProduct } from "./productSlice";

function FormModalProduct({
  handleClose,
  open,
  mode,
  categories,
  ingredients,
  refreshData,
  selectedItem,
}) {
  const [openCreateCate, setOpenCreateCate] = useState(false);
  const dispatch = useDispatch();

  const defaultValues = {
    name: "",
    decription: "",
    category: "",
    image: "",
    price: "",
    calo: "",
    type: "",
    ingredientStep1: mode === "edit" ? selectedItem.ingredientStep1 : [],
    ingredientStep2: mode === "edit" ? selectedItem.ingredientStep2 : [],
    ingredientStep3: mode === "edit" ? selectedItem.ingredientStep3 : [],
  };
  const methods = useForm({
    // resolver: yupResolver(LoginSchema),
    defaultValues,
  });

  const { handleSubmit, reset } = methods;
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

      refreshData();
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
      refreshData();
    }
  };
  const onSubmitCreateCate = async (data) => {
    dispatch(createCategory(data.newCategory));
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
            width: 400,
            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: 24,
            p: 4,
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

      <Box sx={{ width: { md: 400, lg: 600 } }}>
        <DialogTitle>
          {mode === "create" ? "CREATE A NEW PRODUCT" : "EDIT PRODUCT"}
        </DialogTitle>
        <DialogContent>
          <Stack spacing={2}>
            <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
              <Stack spacing={1} mt={1}>
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
                {selectedItem?.category?.name === "salad" && (
                  <Stack direction="row">
                    <FAutocomplete
                      name="ingredientStep1"
                      options={step1}
                      defaultValue={defaultValues.ingredientStep1}
                      isOptionEqualToValue={(option, newValue) => {
                        return option.name === newValue.name;
                      }}
                      getOptionLabel={(step1) => step1.name}
                      width={1 / 3}
                    />
                    <FAutocomplete
                      name="ingredientStep2"
                      options={step2}
                      defaultValue={defaultValues.ingredientStep2}
                      getOptionLabel={(step2) => step2.name}
                      isOptionEqualToValue={(option, newValue) => {
                        return option.name === newValue.name;
                      }}
                      width={1 / 3}
                    />
                    <FAutocomplete
                      name="ingredientStep3"
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

                <FTextField name="image" label="Image" />
                {mode === "edit" && (
                  <>
                    <FTextField name="price" label="Price" />
                    <FTextField name="calo" label="Calorie" />
                  </>
                )}
                <FSelect name="type" label="Type" select>
                  {["custom", "avaiable"].map((item) => (
                    <option value={item} key={item}>
                      {item}
                    </option>
                  ))}
                </FSelect>
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

export default FormModalProduct;
