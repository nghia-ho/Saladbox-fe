import { useEffect, useState } from "react";
import {
  Card,
  Grid,
  Typography,
  Box,
  Stack,
  Rating,
  Divider,
  IconButton,
  Button,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

// import { fCurrency } from "../utils";
// import ReactMarkdown from "react-markdown";
// import rehypeRaw from "rehype-raw";
import { useSelector } from "react-redux";
import useAuth from "../../hooks/useAuth";

const InforProduct = () => {
  const [count, setCount] = useState(0);

  if (count < 0) {
    setCount(0);
  }
  const auth = useAuth();

  const { product } = useSelector((state) => state.products);
  return (
    <Card>
      <Grid container sx={{ display: "flex", alignItems: "center" }}>
        <Grid item xs={12} md={6}>
          <Box p={6}>
            <Box
              sx={{
                overflow: "hidden",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Box
                component="img"
                src={`http://localhost:8000${product?.image}`}
                alt={product?.bame}
                sx={{ borderRadius: 2 }}
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

          <Grid
            spacing={1}
            container
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Grid item xs={12} md={3}>
              <Stack
                direction="row"
                justifyContent="space-around"
                sx={{
                  border: "1px solid grey",
                  borderRadius: 1,
                }}
              >
                <IconButton
                  variant="outlined"
                  size="large"
                  onClick={() => setCount(count + 1)}
                >
                  <AddIcon />
                </IconButton>
                <Typography variant="h6" sx={{ fontWeight: "600", m: 1 }}>
                  {count}
                </Typography>
                <IconButton
                  variant="outlined"
                  size="large"
                  onClick={() => setCount(count - 1)}
                >
                  <RemoveIcon />
                </IconButton>
              </Stack>
            </Grid>
            <Grid item xs={12} md={9}>
              <Button
                size="large"
                color="primary"
                variant="contained"
                onClick={() => auth.addToCard(product)}
                sx={{
                  width: 1,
                  p: 1.4,
                }}
              >
                Add to Cart
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Card>
  );
};

export default InforProduct;
