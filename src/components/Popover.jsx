import { IconButton, MenuItem, Popover } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import React from "react";
import { useNavigate } from "react-router-dom";

function PopoverMenu({
  openPopover,
  setOpenPopover,
  setopenModalDelete,
  selectedItem,
  route,
  handleClickEdit,
}) {
  const navigate = useNavigate();

  const handleEdit = () => {
    if (route === "order") {
      navigate(`/orders/${selectedItem._id}`);
    } else {
      handleClickEdit();
    }
  };

  const handleDelete = () => {
    setopenModalDelete(true);
    setOpenPopover(null);
  };

  return (
    <Popover
      open={Boolean(openPopover)}
      anchorEl={openPopover}
      onClose={() => {
        setOpenPopover(null);
      }}
      anchorOrigin={{ vertical: "top", horizontal: "left" }}
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      PaperProps={{
        sx: {
          p: 1,
          width: 140,
          "& .MuiMenuItem-root": {
            px: 1,
            typography: "body2",
            borderRadius: 0.75,
          },
        },
      }}
    >
      <MenuItem onClick={handleEdit}>
        <IconButton>
          <EditIcon />
        </IconButton>
        Edit
      </MenuItem>

      <MenuItem sx={{ color: "error.main" }} onClick={handleDelete}>
        <DeleteIcon />
        Delete
      </MenuItem>
    </Popover>
  );
}

export default PopoverMenu;
