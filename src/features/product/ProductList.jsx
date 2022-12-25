import { Grid } from "@mui/material";
import { useSelector } from "react-redux";

import ProductCard from "./ProductCard";
import ProductCard2 from "./ProductCard2";
import ProductCardCustom from "./ProductCardCustom";

function ProductList({ view, handleAdd }) {
  const { favorite, products } = useSelector((state) => state.products);
  const productList = products.filter(
    (dataProduct) => dataProduct.isDeleted === false
  );

  const spacing = { xs: 1, md: 2 };
  return (
    <>
      {(view === "list" || !view) && (
        <Grid container spacing={spacing} mt={1} mb={4}>
          {productList?.map((product) => (
            <Grid key={product._id} item xs={6} sm={4} md={3} lg={3}>
              <ProductCard product={product} />
            </Grid>
          ))}
        </Grid>
      )}
      {view === "module" && (
        <Grid container spacing={spacing} mt={1} mb={4}>
          {productList?.map((product) => (
            <Grid key={product._id} item xs={12} sm={12} md={12} lg={12}>
              <ProductCard2 product={product} />
            </Grid>
          ))}
        </Grid>
      )}
      {view === "custom" && (
        <Grid container spacing={spacing} mt={1} mb={4}>
          {productList?.map((product) => (
            <Grid key={product._id} item xs={6} sm={4} md={3} lg={2}>
              <ProductCardCustom product={product} handleAdd={handleAdd} />
            </Grid>
          ))}
        </Grid>
      )}
      {view === "customFav" && (
        <Grid container spacing={spacing} mt={1} mb={4}>
          {favorite?.favorite?.map((fav) => (
            <Grid key={fav._id} item xs={6} sm={4} md={3} lg={2}>
              <ProductCardCustom product={fav.product} handleAdd={handleAdd} />
            </Grid>
          ))}
        </Grid>
      )}
    </>
  );
}

export default ProductList;
