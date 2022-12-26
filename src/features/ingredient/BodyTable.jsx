import React from "react";
//mui
import {
  Stack,
  Typography,
  IconButton,
  TableRow,
  TableCell,
  TableBody,
  Avatar,
  Chip,
} from "@mui/material";

import MoreVertIcon from "@mui/icons-material/MoreVert";
import { isString } from "lodash";

import { BASE_URL } from "../../app/config";

function BodyTable({ ingredients, handleOpenPopover }) {
  return (
    <TableBody>
      {ingredients &&
        ingredients.map((row) => {
          const { name, image, step, price, calo, type, isDeleted } = row;

          return (
            <TableRow hover key={row._id} tabIndex={-1} role="checkbox">
              <TableCell align="center" scope="row">
                <Typography variant="subtitle2" noWrap>
                  {name}
                </Typography>
              </TableCell>

              <TableCell align="center">
                <Stack direction="row" justifyContent="center">
                  <Avatar
                    alt={name}
                    src={
                      isString(image) && image.includes("cloudinary")
                        ? image
                        : image
                        ? `${BASE_URL}${image}`
                        : "/ingredients/1.png"
                    }
                  />
                </Stack>
              </TableCell>

              <TableCell align="center">{step}</TableCell>
              <TableCell align="center">{price}</TableCell>
              <TableCell align="center">{calo}</TableCell>
              <TableCell align="center">{type}</TableCell>
              <TableCell align="center">
                {isDeleted ? (
                  <Chip label="deleted" color="error" variant="outlined" />
                ) : (
                  <Chip label="avaiable" color="success" variant="outlined" />
                )}
              </TableCell>

              <TableCell align="right">
                <IconButton
                  size="large"
                  color="inherit"
                  onClick={(e) => handleOpenPopover(e, row)}
                >
                  <MoreVertIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          );
        })}
    </TableBody>
  );
}

export default BodyTable;
