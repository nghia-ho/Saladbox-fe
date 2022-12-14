import React from "react";
import { useEffect, useState } from "react";

import {
  Card,
  Skeleton,
  Stack,
  ToggleButton,
  ToggleButtonGroup,
  useTheme,
} from "@mui/material";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { Button, Container, Grid } from "@mui/material";

import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";

import { getIngredients } from "../features/ingredient/ingredientSlice";
import IngredientList from "../features/ingredient/IngredientList";

import CustomBoard from "../features/ingredient/CustomBoard";
import styled from "@emotion/styled";
function TabPanel(props) {
  const { children, value, index, p, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Card elevation={3} sx={{ p: p, borderRadius: 1, border: "1px" }}>
          <div>{children}</div>
        </Card>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
  p: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

export default function CustomMealPage() {
  const theme = useTheme();
  const [value, setValue] = useState(0);
  const [modal, setModal] = useState(false);
  const [modalAdd, setModalAdd] = useState(false);
  const [step2, setStep2] = useState("");
  const [alignment, setAlignment] = useState("Veggie");

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getIngredients({ limit: 1000 }));
  }, [dispatch]);

  const { ingredients, isLoading } = useSelector((state) => state.ingredient);
  const ingredientList = ingredients?.filter(
    (data) => data.isDeleted === false
  );

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const ingredientStep1 = ingredientList?.filter((ingredient) => {
    return ingredient.step === 1;
  });
  const ingredientStep3 = ingredientList?.filter((ingredient) => {
    return ingredient.step === 3;
  });
  const dabStep2 = ingredientList?.filter((ingredient) => {
    return ingredient.type === "Vegetable" && ingredient.step === 2;
  });

  const stepTwoCate = ["Veggie", "Protein", "Cheese", "Fruit", "Nuts & Seeds"];
  const handleAlignment = (event, newAlignment) => {
    setAlignment(newAlignment);
    switch (newAlignment) {
      case "Cheese":
        return setStep2(
          ingredientList?.filter((ingredient) => {
            return ingredient.type === "Cheeze" && ingredient.step === 2;
          })
        );
      case "Protein":
        return setStep2(
          ingredientList?.filter((ingredient) => {
            return ingredient.type === "Protein" && ingredient.step === 2;
          })
        );
      case "Veggie":
        return setStep2(
          ingredientList?.filter((ingredient) => {
            return ingredient.type === "Vegetable" && ingredient.step === 2;
          })
        );
      case "Fruit":
        return setStep2(
          ingredientList?.filter((ingredient) => {
            return ingredient.type === "Fruit" && ingredient.step === 2;
          })
        );
      case "Nuts & Seeds":
        return setStep2(
          ingredientList?.filter((ingredient) => {
            return ingredient.type === "NutsSeeds" && ingredient.step === 2;
          })
        );

      default:
        break;
    }
  };
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 350,
    borderRadius: 1,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  const StyledToggleButtonGroup = styled(ToggleButtonGroup)(({ theme }) => ({
    "& .MuiToggleButtonGroup-grouped": {
      margin: theme.spacing(0.5),
      width: "100%",
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
        color: "#815B5B",
      },
      color: "#D0B8A8",
    },
  }));

  const handleClose = () => setModal(false);
  const handleCloseModalAdd = () => setModalAdd(false);
  const location = useLocation();

  return (
    <Container maxWidth="lg">
      {modal && (
        <Modal
          open={modal}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography variant="h5" component="h2" align="center">
              You need to login to customize, then add to cart
            </Typography>
            <Button
              variant="contained"
              sx={{ mt: 1, width: 1 }}
              to="/login"
              component={Link}
              state={{ from: location }}
              replace
            >
              Login
            </Button>
          </Box>
        </Modal>
      )}

      {modalAdd && (
        <Modal
          open={modalAdd}
          onClose={handleCloseModalAdd}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography variant="h5" component="h2" align="center">
              You need to add ingredient into menu, to customize your salad
            </Typography>
          </Box>
        </Modal>
      )}

      <Grid container spacing={2} mt={1}>
        <Grid item xs={12} md={8}>
          <Box sx={{ bgcolor: "background.paper", width: 1 }}>
            <Tabs
              value={value}
              onChange={handleChange}
              indicatorColor="white"
              textColor="inherit"
              variant="fullWidth"
              aria-label="full width tabs example"
              sx={{
                "& button.Mui-selected": { backgroundColor: "primary.darker" },
              }}
            >
              <Tab
                label="Step 1"
                {...a11yProps(0)}
                sx={{ p: 4, borderRadius: 1 }}
              />
              <Tab
                label="Step 2"
                {...a11yProps(1)}
                sx={{ p: 4, borderRadius: 1 }}
              />
              <Tab
                label="Step 3"
                {...a11yProps(2)}
                sx={{ p: 4, borderRadius: 1 }}
              />
            </Tabs>
            {isLoading ? (
              <TabPanel value={value} index={0} dir={theme.direction} p={3}>
                <Stack spacing={3} direction="row">
                  {[...Array(6).keys()].map((e) => (
                    <Skeleton
                      key={e}
                      variant="rounded"
                      width={120}
                      height={120}
                    />
                  ))}
                </Stack>
                <Stack spacing={3} mt={3} direction="row">
                  {[...Array(6).keys()].map((e) => (
                    <Skeleton
                      key={e}
                      variant="rounded"
                      width={120}
                      height={120}
                    />
                  ))}
                </Stack>
              </TabPanel>
            ) : (
              <>
                <TabPanel value={value} index={0} dir={theme.direction} p={3}>
                  <IngredientList ingredients={ingredientStep1} />
                </TabPanel>
                <TabPanel value={value} index={1} dir={theme.direction} p={3}>
                  <StyledToggleButtonGroup
                    value={alignment}
                    exclusive
                    onChange={handleAlignment}
                    aria-label="text alignment"
                    sx={{
                      display: {
                        xs: "block",
                        sm: "flex",
                      },
                    }}
                  >
                    {stepTwoCate.map((item, i) => (
                      <ToggleButton
                        value={item}
                        aria-label="left aligned"
                        key={i}
                        sx={{ border: "none" }}
                      >
                        {item}
                      </ToggleButton>
                    ))}
                  </StyledToggleButtonGroup>

                  <Box sx={{ m: 2 }}>
                    <IngredientList ingredients={step2 || dabStep2} />
                  </Box>
                </TabPanel>
                <TabPanel value={value} index={2} dir={theme.direction} p={3}>
                  <IngredientList ingredients={ingredientStep3} />
                </TabPanel>
              </>
            )}
          </Box>
        </Grid>
        <Grid item xs={12} md={4}>
          <CustomBoard setModal={setModal} setModalAdd={setModalAdd} />
        </Grid>
      </Grid>
    </Container>
  );
}
