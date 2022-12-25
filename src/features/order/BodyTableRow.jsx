import {
  Box,
  CardActionArea,
  CardMedia,
  Stack,
  TableBody,
  TableCell,
  TableRow,
  Typography,
} from "@mui/material";
import { isString } from "lodash";
import React from "react";
import { Link } from "react-router-dom";

function BodyTableRow({ rows }) {
  return (
    <TableBody>
      {rows.map((row, i) => (
        <TableRow key={i}>
          <TableCell align="center">
            <Stack direction="row">
              <Box
                sx={{
                  maxWidth: 50,
                  display: { xs: "none", sm: "inline" },
                }}
              >
                <CardActionArea
                  component={Link}
                  to={`/product/${row.product_id}`}
                >
                  <CardMedia
                    sx={{ borderRadius: 2 }}
                    component="img"
                    image={
                      isString(row?.image) && row?.image.includes("cloudinary")
                        ? row?.image
                        : row?.image
                        ? `http://localhost:8000${row?.image}`
                        : "/custom.png"
                    }
                    alt={row.desc}
                  />
                </CardActionArea>
              </Box>

              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  ml: 3,
                }}
              >
                <Typography align="center" gutterBottom>
                  {row.name}
                </Typography>
              </Box>
            </Stack>
          </TableCell>

          <TableCell align="center">
            <Stack direction="row" justifyContent="center">
              <Typography
                variant="subtitle2"
                sx={{ fontWeight: "600", m: 1 }}
                align="center"
              >
                {row.qty}
              </Typography>
            </Stack>
          </TableCell>
          <TableCell align="center">{row.unit}</TableCell>
          <TableCell align="center">{row.price.toLocaleString()}</TableCell>
        </TableRow>
      ))}
    </TableBody>
  );
}

export default BodyTableRow;
