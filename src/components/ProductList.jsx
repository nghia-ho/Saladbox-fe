import { Grid } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import ProductCard from "./ProductCard";

function ProductList() {
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.products);

  return (
    <Grid container spacing={2} mt={1}>
      {products?.map((product, index) => (
        <Grid key={product._id} item xs={6} md={4} lg={3}>
          <ProductCard product={product} />
        </Grid>
      ))}
    </Grid>
  );
}

export default ProductList;
