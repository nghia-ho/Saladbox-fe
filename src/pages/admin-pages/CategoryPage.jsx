import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Divider,
  Grid,
  IconButton,
  LinearProgress,
  Modal,
  Stack,
  Typography,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import AddIcon from "@mui/icons-material/Add";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteCategory,
  getCategory,
} from "../../features/category/categorySlice";
import ModalCate from "../../features/category/ModalCate";

function CategoryPage() {
  const [open, setOpen] = useState(false);
  const [openModalDelete, setopenModalDelete] = useState(false);

  const [cateSelected, setCateSelected] = useState(null);
  const [mode, setMode] = useState(null);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCategory());
  }, [dispatch]);

  const { categories, isLoading, error } = useSelector(
    (state) => state.category
  );

  const handleClickEdit = (cate) => {
    setOpen(true);
    setMode("edit");
    setCateSelected(cate);
  };
  const handleClickCreate = () => {
    setOpen(true);
    setMode("create");
  };

  const handleClickDelete = () => {
    dispatch(deleteCategory(cateSelected._id));
    setopenModalDelete(false);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <Container maxWidth="lg">
      <ModalCate
        handleClose={handleClose}
        cateSelected={cateSelected}
        open={open}
        mode={mode}
        error={error?.messagge}
        isLoading={isLoading}
      />
      <Modal open={openModalDelete} onClose={() => setopenModalDelete(false)}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: 24,
            p: 4,
          }}
        >
          <Stack>
            <Typography variant="h6" fontWeight="600">
              {!cateSelected?.isDeleted ? "Delete?" : "Undo?"}
            </Typography>
            <Typography sx={{ mt: 2 }}>
              {!cateSelected?.isDeleted
                ? "This cannot be undone and it will be deleted?"
                : ""}
            </Typography>
            <Stack direction="row" justifyContent="end">
              <Button onClick={() => setopenModalDelete(false)}>Cancel</Button>

              <Button onClick={handleClickDelete} variant="contained">
                {!cateSelected?.isDeleted ? "Delete" : "Undo"}
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Modal>

      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        mb={4}
      >
        <Typography fontWeight="600" variant="h5">
          Category | SaladBox
        </Typography>

        <Button
          variant="contained"
          color="success"
          startIcon={<AddIcon />}
          onClick={handleClickCreate}
        >
          New Category
        </Button>
      </Stack>

      <Card
        sx={{
          p: 1,
          boxShadow: "none",
          bgcolor: "success.light",
          minHeight: 500,
        }}
      >
        {isLoading && (
          <Box sx={{ width: 1, px: 1 }}>
            <LinearProgress color="success" />
          </Box>
        )}
        <Box
          component="main"
          sx={{
            py: 8,
          }}
        >
          <Container maxWidth={false}>
            <Grid container spacing={3}>
              {categories.map((e) => (
                <Grid item lg={3} sm={6} xl={3} xs={12} key={e._id}>
                  <Card
                    sx={{
                      bgcolor: !e.isDeleted ? "success.dark" : "success.darker",
                    }}
                  >
                    <CardContent>
                      <Stack
                        sx={{ mb: 5 }}
                        direction="row"
                        justifyContent="space-between"
                        alignItems="center"
                      >
                        <Typography
                          variant="h5"
                          color="success.contrastText"
                          sx={{
                            textDecoration: e.isDeleted ? "line-through" : "",
                          }}
                        >
                          {e.name}
                        </Typography>
                        {!e.isDeleted && (
                          <IconButton onClick={() => handleClickEdit(e)}>
                            <EditIcon fontSize="small" color="secondary" />
                          </IconButton>
                        )}
                      </Stack>
                      <Stack
                        direction="row"
                        justifyContent="space-between"
                        alignItems="center"
                      >
                        <Typography variant="caption"></Typography>
                        {!e.isDeleted ? (
                          <IconButton
                            onClick={() => {
                              setCateSelected(e);
                              setopenModalDelete(true);
                            }}
                          >
                            <HighlightOffIcon fontSize="small" color="error" />
                          </IconButton>
                        ) : (
                          <Button
                            onClick={() => {
                              setCateSelected(e);
                              setopenModalDelete(true);
                            }}
                          >
                            undo
                          </Button>
                        )}
                      </Stack>

                      <Divider sx={{ mt: 1 }} />
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Container>
        </Box>
      </Card>
    </Container>
  );
}

export default CategoryPage;
