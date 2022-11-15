import { useEffect, useState } from "react";
import {
  Card,
  Grid,
  Container,
  Typography,
  Box,
  Stack,
  Rating,
  Divider,
  Breadcrumbs,
  Link,
} from "@mui/material";
import { Link as RouterLink, useParams } from "react-router-dom";
// import { fCurrency } from "../utils";
// import ReactMarkdown from "react-markdown";
// import rehypeRaw from "rehype-raw";
import LoadingScreen from "../components/LoadingScreen";
import { Alert } from "@mui/material";
import { getProductById } from "../features/product/productSlice";
import { useDispatch, useSelector } from "react-redux";

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
    <Container sx={{ my: 3 }}>
      <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 4 }}>
        <Link underline="hover" color="inherit" component={RouterLink} to="/">
          Saladbox
        </Link>
        <Typography color="text.primary">{product?.name}</Typography>
      </Breadcrumbs>
      <Box sx={{ position: "relative", height: 1 }}>
        {isLoading ? (
          <LoadingScreen />
        ) : (
          <>
            {errorMessage ? (
              <Alert severity="error">{errorMessage}</Alert>
            ) : (
              <>
                {product && (
                  <Card>
                    <Grid container>
                      <Grid item xs={12} md={6}>
                        <Box p={2}>
                          <Box
                            sx={{
                              borderRadius: 2,
                              overflow: "hidden",
                              display: "flex",
                            }}
                          >
                            <Box
                              component="img"
                              sx={{
                                width: 1,
                                height: 1,
                              }}
                              src={`http://localhost:8000${product?.image}`}
                              alt="product"
                            />
                          </Box>
                        </Box>
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <Typography
                          variant="h6"
                          sx={{
                            mt: 2,
                            mb: 1,
                            display: "block",
                            textTransform: "uppercase",
                            color:
                              product.type === "sale"
                                ? "error.main"
                                : "info.main",
                          }}
                        >
                          {product.type}
                        </Typography>
                        <Typography variant="h5" paragraph>
                          {product.name}
                        </Typography>
                        <Stack
                          direction="row"
                          alignItems="center"
                          spacing={1}
                          sx={{ mb: 2 }}
                        >
                          <Rating
                            value={product.price}
                            precision={0.1}
                            readOnly
                          />
                          <Typography
                            variant="body2"
                            sx={{ color: "text.secondary" }}
                          >
                            ({product.price} reviews)
                          </Typography>
                        </Stack>
                        <Typography variant="h4" sx={{ mb: 3 }}>
                          <Box
                            component="span"
                            sx={{
                              color: "text.disabled",
                              textDecoration: "line-through",
                            }}
                          >
                            {product.price}
                          </Box>
                          &nbsp;{product.price}
                        </Typography>

                        <Grid container spacing={2} mt={1}>
                          {product?.ingredients?.map((e, index) => (
                            <Grid key={index} item xs={6} md={4} lg={3}>
                              <Box
                                component="img"
                                sx={{
                                  width: "50%",
                                }}
                                src={`http://localhost:8000${e.image}`}
                                alt="product"
                              />
                            </Grid>
                          ))}
                        </Grid>

                        <Divider sx={{ borderStyle: "dashed" }} />
                        <Box>
                          <Typography>{product.description}</Typography>
                        </Box>
                      </Grid>
                    </Grid>
                  </Card>
                )}
                {!product && (
                  <Typography variant="h6">404 Product not found</Typography>
                )}
              </>
            )}
          </>
        )}
      </Box>
    </Container>
  );
}

export default DetailPage;
