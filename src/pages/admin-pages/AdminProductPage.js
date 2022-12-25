import React, { useEffect, useState } from "react";
//mui
import {
  Button,
  Card,
  Container,
  Typography,
  TableContainer,
  Table,
  TableHead,
  Box,
  Divider,
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
  { id: "isDeleted", label: "Avaiable" },
  { id: "more", label: "More" },
];

function AdminProductPage() {
  const [openPopover, setOpenPopover] = useState(null);
  const [openModalDelete, setopenModalDelete] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [route, setRoute] = useState(null);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const [filterName, setFilterName] = useState("");
  const [mode, setMode] = useState("create");
  const [selectedItem, setSelectedItem] = useState(null);
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("");

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
    dispatch(getIngredients({ limit: 1000 }));
  }, [filterName, page, dispatch, orderBy, order, rowsPerPage]);

  const { products, count, isLoading } = useSelector((state) => state.products);
  const categories = useSelector((state) => state.category.categories);
  const ingredients = useSelector((state) => state.ingredient.ingredients);
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

  //handle display category in modal edit
  const copyCate = [...categories];
  const index = copyCate.findIndex(
    (e) => e._id === selectedItem?.category?._id
  );
  const currentCate = copyCate.splice(index, 1);
  const newCategory = [...[...currentCate], ...[...copyCate]];
  const newSelectedItem = {
    ...selectedItem,
    category: selectedItem?.category?._id,
  };
  return (
    <Container maxWidth="lg">
      <FormModalProduct
        open={openModal}
        handleClose={handleClose}
        categories={newCategory}
        ingredients={ingredients}
        selectedItem={newSelectedItem}
        mode={mode}
        isLoading={isLoading}
      />
      <DeleteModal
        selectedItem={selectedItem}
        openModalDelete={openModalDelete}
        handleCloseDelete={handleCloseDelete}
        route={route}
        page={page}
        rowsPerPage={rowsPerPage}
        name={filterName}
        orderBy={orderBy}
        order={order}
      />

      <Typography variant="h5" gutterBottom fontWeight={600}>
        Product
      </Typography>

      <Card sx={{ p: 3, mt: 2 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            p: 3,
          }}
        >
          <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
            <ProductSearch size={"medium"} />
          </FormProvider>
          <Button
            variant="contained"
            color="success"
            startIcon={<AddIcon />}
            onClick={handleClickCreate}
          >
            New Product
          </Button>
        </Box>
        <Divider sx={{ mx: 3, mb: 2 }} />
        <Container maxWidth="lg">
          <Card sx={{ boxShadow: "none" }}>
            <TableContainer sx={{ width: 1, borderRadius: 1, pb: 3 }}>
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
        </Container>
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
