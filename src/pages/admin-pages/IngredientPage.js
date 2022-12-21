import React, { useEffect, useState } from "react";
//mui
import {
  Button,
  Card,
  Container,
  Stack,
  Typography,
  Tooltip,
  IconButton,
  TableContainer,
  Table,
  TableHead,
  Box,
} from "@mui/material";

import AddIcon from "@mui/icons-material/Add";
import FilterListIcon from "@mui/icons-material/FilterList";
import { useDispatch, useSelector } from "react-redux";

import FormModalIngredient from "../../features/ingredient/FormModalIngredient";
import { getIngredients } from "../../features/ingredient/ingredientSlice";
import DeleteModal from "../../components/DeleteModal";
import PopoverMenu from "../../components/Popover";
import HeadTable from "../../components/HeadTable";
import { FormProvider } from "../../components/form";
import IngredientSearch from "../../features/ingredient/IngredientSearch";
import { useForm } from "react-hook-form";
import BodyTable from "../../features/ingredient/BodyTable";
import TablePaginations from "../../components/TablePaginations";

const TABLE_HEAD = [
  { id: "name", label: "Name", alignRight: false },
  { id: "image", label: "Image", alignRight: false },
  { id: "step", label: "Step", alignRight: false },
  { id: "price", label: "Price", alignRight: false },
  { id: "calo", label: "Calo", alignRight: false },
  { id: "type", label: "Type", alignRight: "not" },
  { id: "isDeleted", label: "Is Deleted", alignRight: "not" },
];

function IngredientPage() {
  const [openPopover, setOpenPopover] = useState(null);
  const [openModalDelete, setopenModalDelete] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [route, setRoute] = useState(null);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [filterName, setFilterName] = useState("");
  const [mode, setMode] = useState("create");
  const [selectedItem, setSelectedItem] = useState(null);
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("name");

  const handleClickEdit = () => {
    setOpenModal(true);
    setMode("edit");
  };

  const handleClickCreate = () => {
    setOpenModal(true);
    setMode("create");
  };

  const handleClose = () => {
    setOpenModal(false);
  };

  // const handleClickDelete = () => {
  //   setOpenPopover(null);
  //   setopenModalDelete(true);
  // };
  const handleCloseDelete = () => {
    setopenModalDelete(false);
  };

  // dispatch & get ingredient
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      getIngredients({
        name: filterName,
        sort: { orderBy, order },
        page: page + 1,
        limit: rowsPerPage,
      })
    );
  }, [filterName, page, dispatch, orderBy, order, rowsPerPage]);

  const { ingredients, count } = useSelector((state) => state.ingredient);

  const handleOpenPopover = (event, value) => {
    setOpenPopover(event.currentTarget);
    setSelectedItem(value);
    setRoute("ingredient");
  };

  // const handleCloseMenu = () => {
  //   setOpenPopover(null);
  // };
  //--------------------------------------------------------------

  const defaultValues = {
    ingredientSearch: filterName,
  };
  const methods = useForm({
    defaultValues,
  });
  const { handleSubmit } = methods;
  const onSubmit = (data) => {
    setFilterName(data.ingredientSearch);
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
      <FormModalIngredient
        open={openModal}
        ingredients={ingredients}
        handleClose={handleClose}
        mode={mode}
        selectedProduct={selectedItem}
        setSelectedItem={setSelectedItem}
      />
      <DeleteModal
        selectedItem={selectedItem}
        openModalDelete={openModalDelete}
        route={route}
        handleCloseDelete={handleCloseDelete}
      />
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        mb={5}
      >
        <Typography variant="h5" gutterBottom fontWeight={600}>
          Ingredient
        </Typography>
        <Button
          variant="contained"
          color="info"
          startIcon={<AddIcon />}
          onClick={handleClickCreate}
        >
          New Ingredient
        </Button>
      </Stack>
      <Card sx={{ boxShadow: "none" }}>
        <Box
          sx={{
            height: 96,
            display: "flex",
            justifyContent: "space-between",
            padding: 3,
          }}
        >
          <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
            <IngredientSearch />
          </FormProvider>

          <Tooltip title="Filter list">
            <IconButton>
              <FilterListIcon />
            </IconButton>
          </Tooltip>
        </Box>

        <TableContainer sx={{ minWidth: 800 }}>
          <Table>
            <TableHead>
              <HeadTable
                TABLE_HEAD={TABLE_HEAD}
                route={route}
                order={order}
                setOrder={setOrder}
                orderBy={orderBy}
                setOrderBy={setOrderBy}
              />
            </TableHead>
            <BodyTable
              ingredients={ingredients}
              handleOpenPopover={handleOpenPopover}
            />
          </Table>
        </TableContainer>
      </Card>

      <TablePaginations
        count={count}
        rowsPerPage={rowsPerPage}
        page={page}
        handleChangePage={handleChangePage}
        handleChangeRowsPerPage={handleChangeRowsPerPage}
      />

      <PopoverMenu
        openPopover={openPopover}
        setOpenPopover={setOpenPopover}
        setopenModalDelete={setopenModalDelete}
        selectedItem={selectedItem}
        route={route}
        handleClickEdit={handleClickEdit}
      />
    </Container>
  );
}

export default IngredientPage;
