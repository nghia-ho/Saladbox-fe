import { Button, Modal } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { useDispatch } from "react-redux";
import { deleteIngredient } from "../features/ingredient/ingredientSlice";
import { deleteProduct } from "../features/product/productSlice";

function DeleteIngredientModal({
  selectedProduct,
  openModalDelete,
  handleCloseDelete,
}) {
  const dispatch = useDispatch();
  const handleDelete = () => {
    dispatch(deleteIngredient(selectedProduct?._id));
  };
  return (
    <Modal open={openModalDelete} onClose={handleCloseDelete}>
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
        <Button onClick={handleDelete}>Delete</Button>
      </Box>
    </Modal>
  );
}

export default DeleteIngredientModal;
