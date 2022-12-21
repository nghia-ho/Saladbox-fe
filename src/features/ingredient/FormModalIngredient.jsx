import React, { useEffect } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Stack, Box } from "@mui/material";
import { FTextField, FormProvider, FSelect } from "../../components/form";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { createIngredient, editIngredient } from "./ingredientSlice";

function FormModalIngredient({
  handleClose,
  open,
  mode,
  ingredients,
  selectedProduct,
  setSelectedProduct,
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
    defaultValues,
  });
  const { handleSubmit, reset } = methods;

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
        })
      );
      handleClose(false);
      setSelectedProduct(null);
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
      handleClose(false);
      setSelectedProduct(null);
    }
  };

  // reset defaultValue
  useEffect(() => {
    if (selectedProduct) reset(selectedProduct);
    if (mode === "create") reset(defaultValues);
    if (!selectedProduct) reset(defaultValues);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedProduct, reset, mode]);

  let type = [...new Set(ingredients?.map((i) => i.type))];
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
                <FTextField name="name" label="Ingredient Name" />
                <FSelect name="type" label="Type" select>
                  {type?.map((item) => (
                    <option value={item} key={item}>
                      {item}
                    </option>
                  ))}
                </FSelect>
                <FTextField name="image" label="Image" />
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
