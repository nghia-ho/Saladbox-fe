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
  type,
}) {
  const navigate = useNavigate();
  const handleEdit = () => {
    if (route === "order") {
      navigate(`/orders/${selectedItem._id}`, { state: type });
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
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      transformOrigin={{ vertical: "top", horizontal: "left" }}
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
      {!selectedItem?.isDeliverd && !selectedItem?.isDeleted ? (
        <MenuItem onClick={handleDelete}>
          <IconButton>
            <DeleteIcon />
          </IconButton>
          Delete
        </MenuItem>
      ) : (
        <></>
      )}
    </Popover>
  );
}

export default PopoverMenu;
