import {
  Box,
  TableCell,
  TableRow,
  TableSortLabel,
  Typography,
} from "@mui/material";
import React from "react";
import { tableCellClasses } from "@mui/material/TableCell";
import { styled } from "@mui/material/styles";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.success.darker,
    color: theme.palette.primary.darker,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

function HeadTable({ TABLE_HEAD, order, setOrder, orderBy, setOrderBy }) {
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
        <StyledTableCell
          key={headCell.id}
          align={"center"}
          sortDirection={orderBy === headCell.id ? order : false}
        >
          <TableSortLabel
            hideSortIcon
            active={orderBy === headCell.id}
            direction={orderBy === headCell.id ? order : "asc"}
            onClick={createSortHandler(headCell.id)}
            sx={{
              "& .MuiTableSortLabel-icon": {
                color: "grey   !important",
              },
            }}
          >
            <Typography sx={{ fontWeight: 600, color: "white" }}>
              {headCell.label}
            </Typography>
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
        </StyledTableCell>
      ))}
    </TableRow>
  );
}

export default HeadTable;
