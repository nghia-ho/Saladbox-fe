import React, { useEffect, useState } from "react";

//mui
import {
  Card,
  Container,
  TableContainer,
  Table,
  TableHead,
} from "@mui/material";

import { useDispatch, useSelector } from "react-redux";
// framework

//component
import DeleteModal from "../../components/DeleteModal";
import PopoverMenu from "../../components/Popover";

// feature
import { getOrdersCustom } from "../../features/order/orderSlice";
import HeadTable from "../../components/HeadTable";
import BodyTable from "./BodyTable";
import TablePaginations from "../../components/TablePaginations";

const TABLE_HEAD = [
  { id: "_id", label: "ORDER ID" },
  { id: "user", label: "CUSTOMER NAME" },
  { id: "createdAt", label: "DATE" },
  { id: "isPaid", label: "PAYMENT" },
  { id: "totalPrice", label: "TOTAL" },
  { id: "isDeliverd", label: "STATUS" },
];

function AdminOrderCustom({ filterName }) {
  // open Modal Edit, delete,
  const [openPopover, setOpenPopover] = useState(null);
  const [openModalDelete, setopenModalDelete] = useState(false);
  // const [openModal, setOpenModal] = useState(false);
  const [route, setRoute] = useState(null);

  const [selectedItem, setSelectedItem] = useState(null);
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("name");

  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [page, setPage] = useState(0);
  // Close modal edit
  // const handleCloseEdit = () => {
  //   setOpenModal(false);
  //   setRoute(null);
  // };
  // Close modal form confirm delete
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

  const { ordersCustomList, count } = useSelector((state) => state.order);

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
        />
      </Card>
    </Container>
  );
}

export default AdminOrderCustom;
