import {
  Box,
  TableCell,
  TableRow,
  TableSortLabel,
  Typography,
} from "@mui/material";
import React from "react";

function HeadTable({
  TABLE_HEAD,
  route,
  order,
  setOrder,
  orderBy,
  setOrderBy,
}) {
  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const createSortHandler = (property) => (event) => {
    handleRequestSort(event, property);
  };

  return (
    <TableRow>
      {TABLE_HEAD.map((headCell) => (
        <TableCell
          key={headCell.id}
          align={"center"}
          sortDirection={orderBy === headCell.id ? order : false}
        >
          <TableSortLabel
            hideSortIcon
            active={orderBy === headCell.id}
            direction={orderBy === headCell.id ? order : "asc"}
            onClick={createSortHandler(headCell.id)}
          >
            <Typography sx={{ fontWeight: 600 }}>{headCell.label}</Typography>
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
                {order === "desc" ? "sorted descending" : "sorted ascending"}
              </Box>
            ) : null}
          </TableSortLabel>
        </TableCell>
      ))}
    </TableRow>
  );
}

export default HeadTable;
