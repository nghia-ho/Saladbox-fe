import React, { useCallback, useEffect, useState } from "react";
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
import { Label } from "@mui/icons-material";
import { getProducts } from "../../features/product/productSlice";
import FormModalProduct from "../../components/FormModalProduct";
import { getCategory } from "../../features/category/categorySlice";
import { getIngredients } from "../../features/ingredient/ingredientSlice";
import DeleteModalProduct from "../../components/DeleteModalProduct";

const TABLE_HEAD = [
  { id: "name", label: "Name", alignRight: false },
  { id: "image", label: "Image", alignRight: false },
  { id: "category", label: "category", alignRight: false },
  { id: "price", label: "Price", alignRight: false },
  { id: "calo", label: "Calo", alignRight: false },
  { id: "isDeleted", label: "Is Deleted", alignRight: false },
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

function AdminProductPage() {
  const [open, setOpen] = useState(null);
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState("asc");
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState("name");
  const [filterName, setFilterName] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [openModal, setOpenModal] = useState(false);
  const [openModalDelete, setopenModalDelete] = useState(false);
  const [mode, setMode] = useState("create");
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleClickEdit = () => {
    setOpenModal(true);
    setMode("edit");
    setOpen(null);
  };

  const handleClickCreate = () => {
    setOpenModal(true);
    setMode("create");
    setOpen(null);
  };

  const handleClose = () => {
    setOpenModal(false);
  };

  const handleClickDelete = () => {
    setOpen(null);
    setopenModalDelete(true);
  };
  const handleCloseDelete = () => {
    setopenModalDelete(false);
  };

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      getProducts({
        page,
        name: filterName,
      })
    );
    dispatch(getCategory());
    dispatch(getIngredients());
  }, [filterName, page, dispatch]);

  const products = useSelector((state) => state.products.products);
  const categories = useSelector((state) => state.category.categories);
  const ingredients = useSelector(
    (state) => state.ingredient.ingredients.ingredient
  );

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const createSortHandler = (property) => (event) => {
    handleRequestSort(event, property);
  };

  const handleOpenMenu = (event, value) => {
    setOpen(event.currentTarget);
    let step1 = value?.ingredients.filter((i) => i.step === 1);
    let step2 = value?.ingredients.filter((i) => i.step === 2);
    let step3 = value?.ingredients.filter((i) => i.step === 3);
    const newValue = { ...value };
    newValue.ingredientStep1 = step1;
    newValue.ingredientStep2 = step2;
    newValue.ingredientStep3 = step3;
    setSelectedProduct(newValue);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  return (
    <Container maxWidth="lg">
      <FormModalProduct
        open={openModal}
        handleClose={handleClose}
        categories={categories}
        ingredients={ingredients}
        refreshData={() => {
          setOpenModal(false);
          // setSelectedProduct(null);
        }}
        selectedProduct={selectedProduct}
        // handleClose={() => {
        //   setOpenForm(false);
        //   setSelectedCar(null);
        // }}
        mode={mode}
      />
      <DeleteModalProduct
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
          Product
        </Typography>
        <Button
          variant="contained"
          color="info"
          startIcon={<AddIcon />}
          onClick={handleClickCreate}
        >
          New Product
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
                    align={headCell.alignRight ? "right" : "left"}
                    sortDirection={orderBy === headCell.id ? order : false}
                  >
                    <TableSortLabel
                      hideSortIcon
                      active={orderBy === headCell.id}
                      direction={orderBy === headCell.id ? order : "asc"}
                      onClick={createSortHandler(headCell.id)}
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
              {products &&
                products
                  // .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => {
                    const { name, category, image, price, calo, isDeleted } =
                      row;
                    const selectedProduct = selected.indexOf(name) !== -1;

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
                            {name}
                          </Typography>
                        </TableCell>

                        <TableCell align="left">
                          <Avatar
                            alt={name}
                            src={`http://localhost:8000${
                              image[0] || "/salads/1.png"
                            }`}
                          />
                        </TableCell>

                        <TableCell align="left">{category.name}</TableCell>
                        <TableCell align="left">{price}</TableCell>
                        <TableCell align="left">{calo}</TableCell>
                        <TableCell align="center">
                          {isDeleted ? (
                            <Chip
                              label="deleted"
                              color="error"
                              variant="outlined"
                            />
                          ) : (
                            <Chip
                              label="avaiable"
                              color="success"
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
            {/*
                {isNotFound && (
                  <TableBody>
                    <TableRow>
                      <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                        <Paper
                          sx={{
                            textAlign: 'center',
                          }}
                        >
                          <Typography variant="h6" paragraph>
                            Not found
                          </Typography>

                          <Typography variant="body2">
                            No results found for &nbsp;
                            <strong>&quot;{filterName}&quot;</strong>.
                            <br /> Try checking for typos or using complete words.
                          </Typography>
                        </Paper>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                )}*/}
          </Table>
        </TableContainer>

        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={products.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Card>
      <Popover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleCloseMenu}
        anchorOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
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

export default AdminProductPage;
