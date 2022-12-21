import React, { useEffect, useState } from "react";
//mui
import {
  Button,
  Card,
  Container,
  Stack,
  Typography,
  TableContainer,
  Table,
  TableHead,
  Box,
} from "@mui/material";

import AddIcon from "@mui/icons-material/Add";

import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../../features/product/productSlice";
import FormModalProduct from "../../features/product/FormModalProduct";
import { getCategory } from "../../features/category/categorySlice";
import { getIngredients } from "../../features/ingredient/ingredientSlice";
import DeleteModal from "../../components/DeleteModal";
import PopoverMenu from "../../components/Popover";
import HeadTable from "../../components/HeadTable";
import { FormProvider } from "../../components/form";
import ProductSearch from "../../features/product/ProductSearch";
import { useForm } from "react-hook-form";
import BodyTable from "../../features/product/BodyTable";
import TablePaginations from "../../components/TablePaginations";

const TABLE_HEAD = [
  { id: "name", label: "Name" },
  { id: "image", label: "Image" },
  { id: "category", label: "category" },
  { id: "price", label: "Price" },
  { id: "calo", label: "Calo" },
  { id: "isDeleted", label: "Is Deleted" },
];

function AdminProductPage() {
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
    setOpenPopover(null);
  };

  const handleClickCreate = () => {
    setOpenModal(true);
    setMode("create");
    setOpenPopover(null);
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

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      getProducts({
        name: filterName,
        sort: { orderBy, order },
        page: page + 1,
        limit: rowsPerPage,
      })
    );
    dispatch(getCategory());
    dispatch(getIngredients({}));
  }, [filterName, page, dispatch, orderBy, order, rowsPerPage]);

  const { products, count } = useSelector((state) => state.products);
  const categories = useSelector((state) => state.category.categories);
  const ingredients = useSelector(
    (state) => state.ingredient.ingredients.ingredient
  );

  const handleOpenPopover = (event, value) => {
    setOpenPopover(event.currentTarget);
    let step1 = value.ingredients.filter((i) => i.step === 1);
    let step2 = value.ingredients.filter((i) => i.step === 2);
    let step3 = value.ingredients.filter((i) => i.step === 3);

    const newValue = { ...value };
    newValue.ingredientStep1 = step1;
    newValue.ingredientStep2 = step2;
    newValue.ingredientStep3 = step3;
    setSelectedItem(newValue);
    setRoute("product");
  };

  // const handleCloseMenu = () => {
  //   setOpenPopover(null);
  // };
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  //--------------------------------------------------------------

  const defaultValues = {
    nameQuery: filterName,
  };
  const methods = useForm({
    defaultValues,
  });
  const { handleSubmit } = methods;
  const onSubmit = (data) => {
    setFilterName(data.nameQuery);
    setPage(0);
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
        }}
        selectedItem={selectedItem}
        mode={mode}
      />
      <DeleteModal
        selectedItem={selectedItem}
        openModalDelete={openModalDelete}
        handleCloseDelete={handleCloseDelete}
        route={route}
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
        <Box
          sx={{
            height: 96,
            display: "flex",
            justifyContent: "space-between",
            padding: 3,
          }}
        >
          <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
            <ProductSearch size={"medium"} />
          </FormProvider>
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
              products={products}
              handleOpenPopover={handleOpenPopover}
            />
          </Table>
        </TableContainer>

        <TablePaginations
          count={count}
          rowsPerPage={rowsPerPage}
          page={page}
          handleChangePage={handleChangePage}
          handleChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Card>
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

export default AdminProductPage;
