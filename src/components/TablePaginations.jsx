import { TablePagination } from "@mui/material";
import React from "react";

function TablePaginations({
  count,
  rowsPerPage,
  page,
  handleChangePage,
  handleChangeRowsPerPage,
}) {
  return (
    <TablePagination
      sx={{
        "& .MuiTablePagination-selectLabel, .MuiTablePagination-select, .MuiTablePagination-selectIcon":
          {
            display: { xs: "none", md: "block" },
          },

        "& .MuiTablePagination-toolbar": {
          bgcolor: "success.light",
        },
      }}
      rowsPerPageOptions={[5, 10, 25]}
      component="div"
      count={count || 0}
      rowsPerPage={rowsPerPage}
      page={page}
      onPageChange={handleChangePage}
      onRowsPerPageChange={handleChangeRowsPerPage}
    />
  );
}

export default TablePaginations;
