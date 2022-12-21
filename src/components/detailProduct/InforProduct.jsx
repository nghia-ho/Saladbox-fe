import {
  Card,
  Grid,
  Typography,
  Box,
  Stack,
  Rating,
  Divider,
  Button,
} from "@mui/material";

// import { fCurrency } from "../utils";
// import ReactMarkdown from "react-markdown";
// import rehypeRaw from "rehype-raw";
import { useDispatch, useSelector } from "react-redux";
import { addToCard } from "../../features/cart/cartSlice";

const InforProduct = () => {
  const dispatch = useDispatch();
  const { product } = useSelector((state) => state.products);
  return (
    <Card>
      <Grid container sx={{ display: "flex", alignItems: "center" }}>
        <Grid item xs={12} md={6}>
          <Box p={{ xs: 3, lg: 6 }}>
            <Box
              sx={{
                overflow: "hidden",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Box
                component="img"
                src={
                  product?.image?.length
                    ? `http://localhost:8000${product?.image}`
                    : "/saladcustom.png"
                }
                alt={product?.bame}
                sx={{ borderRadius: 2, width: 1 }}
              />
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12} md={6} sx={{ p: 3 }}>
          <Typography
            variant="h5"
            sx={{
              fontWeight: "600",
              mb: 1,
              display: "block",
              textTransform: "uppercase",
            }}
          >
            {product.name}
          </Typography>
          <Stack direction="column" spacing={1} sx={{ mb: 1 }}>
            <Typography
              variant="subtitle2"
              align="justify"
              sx={{
                mt: 1,
              }}
            >
              {product.decription}
            </Typography>

            <Rating value={product.price} precision={0.1} readOnly />
          </Stack>
          <Divider sx={{ border: "1px solid grey" }} />
          <Box
            align="center"
            sx={{
              mt: 1.5,
              width: 1 / 5,
              p: 0.5,
              backgroundColor: "success.dark",
            }}
          >
            <Typography variant="body2" sx={{ color: "white" }}>
              {product.calo} calo
            </Typography>
          </Box>

          <Box
            sx={{
              my: 1.5,
              width: 1 / 2,
            }}
          >
            <Typography
              variant="h5"
              sx={{
                fontWeight: "600",
                color: "success.darker",
              }}
            >
              {" "}
              {product.price} VND
            </Typography>
          </Box>
          <Button
            size="large"
            color="primary"
            variant="contained"
            onClick={() => dispatch(addToCard(product))}
            sx={{
              width: 1,
              p: 1.4,
            }}
          >
            Add to Cart
          </Button>
        </Grid>
      </Grid>
    </Card>
  );
};

export default InforProduct;
