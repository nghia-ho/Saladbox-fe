import { Pagination } from "@mui/material";
import React from "react";

function Panigation({ count, page, setPage }) {
  return (
    <Pagination
      sx={{
        borderColor: "success.light",
        border: "1px dashed ",
        p: 1,
        borderRadius: 2,
      }}
      count={count}
      shape="rounded"
      color="success"
      page={page}
      onChange={(e, value) => setPage(value)}
    />
  );
}

export default Panigation;
