import { Grid } from "@mui/material";
import { useSelector } from "react-redux";

import ProductCard from "./ProductCard";
import ProductCard2 from "./ProductCard2";

function ProductList({ view }) {
  const { products } = useSelector((state) => state.products);

  return (
    <>
      {(view === "list" || !view) && (
        <Grid container spacing={2} mt={1} mb={4}>
          {products?.map((product, index) => (
            <Grid key={product._id} item xs={6} sm={4} md={3} lg={3}>
              <ProductCard product={product} />
            </Grid>
          ))}
        </Grid>
      )}
      {view === "module" && (
        <Grid container spacing={2} mt={1} mb={4}>
          {products?.map((product, index) => (
            <Grid key={product._id} item xs={12} sm={12} md={12} lg={12}>
              <ProductCard2 product={product} />
            </Grid>
          ))}
        </Grid>
      )}
    </>
  );
}

export default ProductList;
