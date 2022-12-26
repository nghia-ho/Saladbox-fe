import { Box, Divider, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCategory } from "./categorySlice";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import ToggleButton from "@mui/material/ToggleButton";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";

const CategoryList = ({ selectValue, setSelectValue, setPage }) => {
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.category);
  useEffect(() => {
    dispatch(getCategory());
  }, [dispatch]);

  const handleAlignment = (event, newCate) => {
    setSelectValue(newCate);
    console.log(newCate);
  };

  const handleCate = (id, name) => {
    setSelectValue(id);
    setPage(1);
  };

  const StyledToggleButtonGroup = styled(ToggleButtonGroup)(({ theme }) => ({
    "& .MuiToggleButtonGroup-grouped": {
      margin: theme.spacing(0.5),
      border: 0,
      "&.Mui-disabled": {
        border: 0,
      },
      "&:not(:first-of-type)": {
        borderRadius: theme.shape.borderRadius,
      },
      "&:first-of-type": {
        borderRadius: theme.shape.borderRadius,
      },
      "&.Mui-selected": {
        color: "#C9B5b2",
      },
      "&:hover": {
        color: "#D0B8A8",
      },
    },
  }));
  return (
    <Box sx={{ mt: 3, mr: 1, width: 1 }}>
      <Paper elevation={2} sx={{ p: 1 }}>
        <Typography align="center" sx={{ py: 1.5, fontWeight: 700 }}>
          Categories
        </Typography>
        <Divider variant="middle" />
        <StyledToggleButtonGroup
          value={selectValue}
          exclusive
          onChange={handleAlignment}
          aria-label="text alignment"
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-around",
            alignItems: "end",
            p: 1,
          }}
        >
          {categories
            .filter((e) => !e.isDeleted)
            .map((e) => (
              <ToggleButton
                key={e._id}
                sx={{
                  my: 0.4,
                  p: 1,
                  color: "success.darker",
                  width: 1,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "start",
                }}
                value={e._id}
                aria-label={e.name}
                onClick={() => handleCate(e._id, e.name)}
                fullWidth
              >
                {e.name}
              </ToggleButton>
            ))}
        </StyledToggleButtonGroup>
      </Paper>
    </Box>
  );
};

export default CategoryList;
