import { Container, Grid } from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProductCard from "./ProductCard";
import { getfavoriteProduct } from "./productSlice";

function FavoriteList() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getfavoriteProduct());
  }, [dispatch]);

  const { favorite } = useSelector((state) => state.products);
  return (
    <Container maxWidth="sm">
      <Grid container spacing={3}>
        {favorite?.favorite?.map((fav) => {
          return (
            <Grid key={fav._id} item xs={8} md={4} lg={4}>
              <ProductCard product={fav.product} />
            </Grid>
          );
        })}
      </Grid>
    </Container>
  );
}

export default FavoriteList;
