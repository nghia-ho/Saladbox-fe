import { Button, Modal, Stack, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { useDispatch } from "react-redux";
import { deleteIngredient } from "../features/ingredient/ingredientSlice";
import { deleteOrder } from "../features/order/orderSlice";
import { deleteProduct } from "../features/product/productSlice";

function DeleteModal({
  selectedItem,
  openModalDelete,
  handleCloseDelete,
  route,
}) {
  const dispatch = useDispatch();
  const handleDelete = () => {
    if (route === "order") dispatch(deleteOrder(selectedItem?._id));

    if (route === "product")
      dispatch(
        deleteProduct({
          id: selectedItem?._id,
        })
      );

    if (route === "ingredient")
      dispatch(
        deleteIngredient({
          id: selectedItem?._id,
        })
      );

    handleCloseDelete();
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
        <Stack>
          <Typography variant="h6" fontWeight="600">
            Delete {route}?
          </Typography>
          <Typography sx={{ mt: 2 }}>
            This cannot be undone and it will be deleted
          </Typography>
          <Stack direction="row" justifyContent="end">
            <Button onClick={handleDelete}>Delete</Button>
            <Button onClick={handleCloseDelete}>Cancel</Button>
          </Stack>
        </Stack>
      </Box>
    </Modal>
  );
}

export default DeleteModal;
