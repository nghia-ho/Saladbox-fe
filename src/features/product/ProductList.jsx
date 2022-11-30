import { Grid } from "@mui/material";
import { useSelector } from "react-redux";

import ProductCard from "./ProductCard";

function ProductList() {
  const { totalPage, products } = useSelector((state) => state.products);

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
