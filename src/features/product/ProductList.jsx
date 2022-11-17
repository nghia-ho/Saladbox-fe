import { circularProgressClasses, Grid } from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProductCard from "./ProductCard";
import { getProducts } from "./productSlice";

function ProductList() {
  const { products } = useSelector((state) => state.products);
  const { name, calo, price, page } = useSelector((state) => state.products);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProducts({ page, name, calo, price }));
  }, [dispatch, name, calo, price, page]);

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
