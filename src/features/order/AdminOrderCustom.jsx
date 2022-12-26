import React, { useEffect, useState } from "react";

import {
  Card,
  Container,
  TableContainer,
  Table,
  TableHead,
  Box,
  LinearProgress,
} from "@mui/material";

import { useDispatch, useSelector } from "react-redux";

import DeleteModal from "../../components/DeleteModal";
import PopoverMenu from "../../components/Popover";

import { getOrdersCustom } from "../../features/order/orderSlice";
import HeadTable from "../../components/HeadTable";
import BodyTable from "./BodyTable";
import TablePaginations from "../../components/TablePaginations";

const TABLE_HEAD = [
  { id: "_id", label: "Order ID" },
  { id: "user", label: "Name" },
  { id: "createdAt", label: "Date" },
  { id: "isPaid", label: "Payment" },
  { id: "totalPrice", label: "Total" },
  { id: "isDeliverd", label: "Status" },
  { id: "paymentMethod", label: "Payment Method" },
  { id: "more", label: "More" },
];

function AdminOrderCustom({ filterName, type }) {
  const [openPopover, setOpenPopover] = useState(null);
  const [openModalDelete, setopenModalDelete] = useState(false);
  const [route, setRoute] = useState(null);

  const [selectedItem, setSelectedItem] = useState(null);
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("");

  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [page, setPage] = useState(0);

  const handleCloseDelete = () => {
    setopenModalDelete(false);
    setRoute(null);
  };
  // dispatch
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      getOrdersCustom({
        query: filterName,
        sort: { orderBy, order },
        page: page + 1,
        limit: rowsPerPage,
      })
    );
  }, [dispatch, filterName, orderBy, order, page, rowsPerPage]);

  const { ordersCustomList, count, isLoading } = useSelector(
    (state) => state.order
  );

  // Open menu popover edit & delete
  const handleOpenPopover = (event, value) => {
    setOpenPopover(event.currentTarget);
    setSelectedItem(value);
    setRoute("order");
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  //--------------------------------------------------------------

  return (
    <Container maxWidth="lg">
      {/* delete confirm */}
      <DeleteModal
        selectedItem={selectedItem}
        openModalDelete={openModalDelete}
        handleCloseDelete={handleCloseDelete}
        route={route}
      />

      <Card sx={{ boxShadow: "none" }}>
        <TableContainer
          sx={{
            width: 1,
            borderRadius: 1,
          }}
        >
          {isLoading && (
            <Box sx={{ width: 1 }}>
              <LinearProgress color="success" />
            </Box>
          )}
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
              ordersList={ordersCustomList}
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

        <PopoverMenu
          openPopover={openPopover}
          setOpenPopover={setOpenPopover}
          setopenModalDelete={setopenModalDelete}
          selectedItem={selectedItem}
          route={route}
          type={type}
        />
      </Card>
    </Container>
  );
}

export default AdminOrderCustom;
