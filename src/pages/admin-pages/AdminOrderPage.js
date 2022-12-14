import React, { useEffect, useState } from "react";
//mui
import {
  Button,
  Card,
  Container,
  Stack,
  Typography,
  Toolbar,
  Tooltip,
  IconButton,
  OutlinedInput,
  InputAdornment,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableSortLabel,
  Box,
  TableBody,
  Avatar,
  TablePagination,
  MenuItem,
  Popover,
  Chip,
} from "@mui/material";
import { styled, alpha } from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import FilterListIcon from "@mui/icons-material/FilterList";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useDispatch, useSelector } from "react-redux";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { getOrders } from "../../features/order/orderSlice";
import { useNavigate } from "react-router-dom";
import DeleteOrderModal from "../../components/DeleteOrderModal";

const TABLE_HEAD = [
  { id: "orderID", label: "ORDERID", alignRight: false },
  { id: "customer", label: "CUSTOMER", alignRight: false },
  { id: "date", label: "DATE", alignRight: false },
  { id: "payment", label: "PAYMENT", alignRight: false },
  { id: "total", label: "TOTAL", alignRight: false },
  { id: "status", label: "STATUS", alignRight: "not" },
];

const StyledRoot = styled(Toolbar)(({ theme }) => ({
  height: 96,
  display: "flex",
  justifyContent: "space-between",
  padding: theme.spacing(0, 1, 0, 3),
}));

const StyledSearch = styled(OutlinedInput)(({ theme }) => ({
  width: 240,
  transition: theme.transitions.create(["box-shadow", "width"], {
    easing: theme.transitions.easing.easeInOut,
    duration: theme.transitions.duration.shorter,
  }),
  "&.Mui-focused": {
    width: 320,
    boxShadow: "rgba(0, 0, 0, 0.1) 0px 10px 50px",
  },
  "& fieldset": {
    borderWidth: `1px !important`,
    borderColor: `${alpha(theme.palette.grey[500], 0.32)} !important`,
  },
}));

function AdminOrderPage() {
  const [open, setOpen] = useState(null);
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState("asc");
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState("name");
  const [filterName, setFilterName] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [openModal, setOpenModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [openModalDelete, setopenModalDelete] = useState(false);

  const navigate = useNavigate();
  const handleClickEdit = () => {
    navigate(`/orders/${selectedProduct._id}`);
  };

  const handleClickCreate = () => {
    setOpenModal(true);
  };
  const handleClickDelete = () => {
    setOpen(null);
    setopenModalDelete(true);
  };

  // close modal form edit or create
  const handleClose = () => {
    setOpenModal(false);
  };
  // close modal form confirm delete
  const handleCloseDelete = () => {
    setopenModalDelete(false);
  };

  // dispatch & get ingredient
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getOrders());
  }, [dispatch]);

  const { ordersList } = useSelector((state) => state.order);

  const handleOpenMenu = (event, value) => {
    setOpen(event.currentTarget);
    setSelectedProduct(value);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };

  return (
    <Container maxWidth="lg">
      <DeleteOrderModal
        selectedProduct={selectedProduct}
        openModalDelete={openModalDelete}
        handleCloseDelete={handleCloseDelete}
      />
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        mb={5}
      >
        <Typography variant="h5" gutterBottom fontWeight={600}>
          Order
        </Typography>
        <Button
          variant="contained"
          color="info"
          startIcon={<AddIcon />}
          onClick={handleClickCreate}
        >
          Create Order
        </Button>
      </Stack>
      <Card sx={{ boxShadow: "none" }}>
        <StyledRoot>
          <StyledSearch
            // value={filterName}
            // onChange={onFilterName}
            placeholder="Search user..."
            startAdornment={
              <InputAdornment position="start">
                <SearchIcon size="small" />
              </InputAdornment>
            }
          />

          <Tooltip title="Filter list">
            <IconButton>
              <FilterListIcon />
            </IconButton>
          </Tooltip>
        </StyledRoot>

        <TableContainer sx={{ minWidth: 800 }}>
          <Table>
            <TableHead>
              <TableRow>
                {TABLE_HEAD.map((headCell) => (
                  <TableCell
                    key={headCell.id}
                    align={
                      headCell.alignRight === "not"
                        ? "center"
                        : headCell.alignRight
                        ? "right"
                        : "left"
                    }
                    sortDirection={orderBy === headCell.id ? order : false}
                  >
                    <TableSortLabel
                      hideSortIcon
                      active={orderBy === headCell.id}
                      direction={orderBy === headCell.id ? order : "asc"}
                      // onClick={createSortHandler(headCell.id)}
                    >
                      {headCell.label}
                      {orderBy === headCell.id ? (
                        <Box
                          sx={{
                            border: 0,
                            margin: -1,
                            padding: 0,
                            width: "1px",
                            height: "1px",
                            overflow: "hidden",
                            position: "absolute",
                            whiteSpace: "nowrap",
                            clip: "rect(0 0 0 0)",
                          }}
                        >
                          {order === "desc"
                            ? "sorted descending"
                            : "sorted ascending"}
                        </Box>
                      ) : null}
                    </TableSortLabel>
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>

            <TableBody>
              {ordersList &&
                ordersList
                  // .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => {
                    const {
                      _id,
                      user,
                      createdAt,
                      isPaid,
                      totalPrice,
                      isDeliverd,
                    } = row;
                    const selectedProduct = selected.indexOf(_id) !== -1;

                    return (
                      <TableRow
                        hover
                        key={row._id}
                        tabIndex={-1}
                        role="checkbox"
                        selected={selectedProduct}
                      >
                        <TableCell component="th" scope="row" padding="none">
                          <Typography variant="subtitle2" noWrap sx={{ ml: 2 }}>
                            {_id}
                          </Typography>
                        </TableCell>

                        <TableCell align="left">{user.name}</TableCell>
                        <TableCell align="left">{createdAt}</TableCell>
                        <TableCell align="center">
                          {isPaid ? (
                            <Chip
                              label="Paid"
                              color="primary"
                              variant="outlined"
                            />
                          ) : (
                            <Chip
                              label="Not Paid"
                              color="info"
                              variant="outlined"
                            />
                          )}
                        </TableCell>
                        <TableCell align="left">{totalPrice}</TableCell>

                        <TableCell align="center">
                          {isDeliverd ? (
                            <Chip
                              label="Deliver"
                              color="primary"
                              variant="outlined"
                            />
                          ) : (
                            <Chip
                              label="Pending"
                              color="info"
                              variant="outlined"
                            />
                          )}
                        </TableCell>
                        <TableCell align="right">
                          <IconButton
                            size="large"
                            color="inherit"
                            onClick={(e) => handleOpenMenu(e, row)}
                          >
                            <MoreVertIcon />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    );
                  })}
              {/* {emptyRows > 0 && (
                  <TableRow style={{ height: 53 * emptyRows }}>
                    <TableCell colSpan={6} />
                  </TableRow>
                )} */}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>
      <Popover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleCloseMenu}
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
        <MenuItem onClick={handleClickEdit}>
          <IconButton>
            <EditIcon />
          </IconButton>
          Edit
        </MenuItem>

        <MenuItem sx={{ color: "error.main" }} onClick={handleClickDelete}>
          <DeleteIcon />
          Delete
        </MenuItem>
      </Popover>
    </Container>
  );
}

export default AdminOrderPage;
