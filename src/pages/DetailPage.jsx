import { useEffect } from "react";
import {
  Container,
  Typography,
  Box,
  Breadcrumbs,
  Link,
  Grid,
} from "@mui/material";

import { Link as RouterLink, useParams } from "react-router-dom";

import LoadingScreen from "../components/LoadingScreen";
import { Alert } from "@mui/material";
import { getProductById } from "../features/product/productSlice";
import { useDispatch, useSelector } from "react-redux";
import InforProduct from "../components/detailProduct/InforProduct";
import InfoIngredient from "../components/detailProduct/InfoIngredient";
import InfoCommitShop from "../components/detailProduct/InfoCommitShop";

function DetailPage() {
  let { id } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProductById(id));
  }, [id, dispatch]);

  const { product, isLoading, errorMessage } = useSelector(
    (state) => state.products
  );
  return (
    <Container sx={{ my: 3 }} maxWidth="lg">
      <Box>
        <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 4 }}>
          <Link
            underline="hover"
            color="inherit"
            component={RouterLink}
            to="/shop"
          >
            Saladbox
          </Link>
          <Link
            underline="hover"
            color="inherit"
            component={RouterLink}
            to="/shop"
          >
            {product?.category?.name}{" "}
          </Link>
          <Typography color="text.primary">{product?.name}</Typography>
        </Breadcrumbs>
      </Box>
      <Box sx={{ position: "relative", height: 1 }}>
        {isLoading ? (
          <LoadingScreen />
        ) : (
          <>
            {errorMessage ? (
              <Alert severity="error">{errorMessage}</Alert>
            ) : (
              <>
                {product && <InforProduct />}
                {!product && (
                  <Typography variant="h6">404 Product not found</Typography>
                )}
              </>
            )}
            <Grid
              container
              spacing={3}
              mt={3}
              sx={{ display: "flex", alignItems: "center" }}
            >
              <Grid item xs={12} md={7}>
                <InfoIngredient />
              </Grid>
              <Grid item xs={12} md={5}>
                <InfoCommitShop />
              </Grid>
            </Grid>
          </>
        )}
      </Box>
    </Container>
  );
}

export default DetailPage;
