import {
  Box,
  Card,
  Typography,
  Container,
  Grid,
  Button,
  Skeleton,
} from "@mui/material";
import { Stack } from "@mui/system";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import useAuth from "../hooks/useAuth";

import {
  getfavoriteProduct,
  getProducts,
} from "../features/product/productSlice";
import ProductList from "../features/product/ProductList";
import ProductCardCustom from "../features/product/ProductCardCustom";

import SwipeableEdgeDrawer from "../components/dashboard/SwipeableEdgeDrawer";

export default function CustomMealsPage() {
  const [monday, setMonday] = useState(null);
  const [tuesday, setTuesday] = useState(null);
  const [wednesday, setWednesday] = useState(null);
  const [thursday, setThursday] = useState(null);
  const [friday, setFriday] = useState(null);
  const [saturday, setSaturday] = useState(null);
  const [sunday, setSunday] = useState(null);
  const [view, setView] = useState("custom");

  const day = [
    { day: monday, setDay: setMonday, name: "Monday" },
    { day: tuesday, setDay: setTuesday, name: "Tuesday" },
    { day: wednesday, setDay: setWednesday, name: "Wednesday" },
    { day: thursday, setDay: setThursday, name: "Thursday" },
    { day: friday, setDay: setFriday, name: "Friday" },
    { day: saturday, setDay: setSaturday, name: "Saturday" },
    { day: sunday, setDay: setSunday, name: "Sunday" },
  ];

  const fullSelected =
    monday && tuesday && wednesday && thursday && friday && saturday && sunday;
  const dispatch = useDispatch();
  const auth = useAuth();

  const handleAdd = (product) => {
    if (!monday) setMonday(product);
    else if (!tuesday) setTuesday(product);
    else if (!wednesday) setWednesday(product);
    else if (!thursday) setThursday(product);
    else if (!friday) setFriday(product);
    else if (!saturday) setSaturday(product);
    else if (!sunday) setSunday(product);
  };

  useEffect(() => {
    dispatch(getProducts({ category: "637464ef3c08c345541890f2", limit: 50 }));

    if (auth.user) dispatch(getfavoriteProduct({ limit: 100 }));
  }, [dispatch, auth.user]);

  const { products, isLoading } = useSelector((state) => state.products);

  const autoSelect = (product) => {
    let items = product.slice(0);
    items = items.sort(() => 0.5 - Math.random());
    items.forEach((item, i) => {
      setMonday(items[i]);
      setTuesday(items[2]);
      setWednesday(items[3]);
      setThursday(items[4]);
      setFriday(items[5]);
      setSaturday(items[6]);
      setSunday(items[7]);
    });
  };

  return (
    <>
      <Container maxWidth="lg" sx={{ mt: 5 }}>
        <Typography variant="h5" align="center" fontWeight={"600"}>
          {" "}
          Design your own Menu for the week
        </Typography>
        <Card
          sx={{
            mt: 5,
            p: 4,
            bgcolor: "primary.darker",
            width: 1,
            color: "primary.contrastText",
            borderRadius: 2,
          }}
        >
          <Grid container spacing={1}>
            {day?.map((e, index) => (
              <Grid key={index} item xs={6} sm={4} md={3} lg={1.7}>
                {!e.day ? (
                  <>
                    <Typography align="center" fontWeight={"600"}>
                      {e.name}
                    </Typography>
                    <Box
                      sx={{
                        width: 1,
                        border: "1px solid white",
                        height: 230,
                        borderRadius: 2,
                      }}
                    />
                  </>
                ) : (
                  <>
                    <Typography align="center" fontWeight={"600"}>
                      {e.name}
                    </Typography>
                    <Box
                      sx={{
                        width: 1,
                        border: "1px solid white",
                        m: 1,
                        borderRadius: 2,
                      }}
                    >
                      <ProductCardCustom product={e.day} />
                    </Box>
                    <Stack>
                      <Button onClick={() => e.setDay(null)}>Remove</Button>
                    </Stack>
                  </>
                )}
              </Grid>
            ))}
          </Grid>
        </Card>
        <Stack sx={{ mt: 2 }} alignItems="end">
          <Button
            variant="contained"
            color="info"
            onClick={() => autoSelect(products)}
          >
            Weely Salad Plan From SaladBox
          </Button>
        </Stack>
        {fullSelected && (
          <Stack justifyContent="end" alignItems="end" sx={{ my: 2 }}>
            <SwipeableEdgeDrawer product={day} />
          </Stack>
        )}

        <Card sx={{ p: 3, mt: 5 }}>
          <Typography variant="h6" fontWeight="600">
            Select the Salad
          </Typography>

          <Box my={2}>
            {auth.user && (
              <Button
                variant="contained"
                color="secondary"
                sx={{ mr: 3 }}
                onClick={() => setView("customFav")}
              >
                Wish List
              </Button>
            )}
            <Button
              variant="contained"
              color="secondary"
              onClick={() => setView("custom")}
            >
              Avaiable
            </Button>
          </Box>
          {isLoading ? (
            <Stack spacing={3} direction="row">
              {[...Array(6).keys()].map((e) => (
                <Skeleton key={e} variant="rounded" width={700} height={180} />
              ))}
            </Stack>
          ) : (
            <Box sx={{ width: 1 }}>
              <ProductList view={view} handleAdd={handleAdd} />
            </Box>
          )}
        </Card>
      </Container>
    </>
  );
}
