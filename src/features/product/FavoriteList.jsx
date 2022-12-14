import { Container, Grid } from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProductCard2 from "./ProductCard2";
import { getfavoriteProduct } from "./productSlice";

function FavoriteList() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getfavoriteProduct());
  }, [dispatch]);

  const { favorite } = useSelector((state) => state.products);
  return (
    <Container maxWidth="md" sx={{ py: 3 }}>
      <Grid container spacing={3}>
        {favorite?.favorite?.map((fav) => {
          return (
            <Grid key={fav._id} item xs={12}>
              <ProductCard2 product={fav.product} />
            </Grid>
          );
        })}
      </Grid>
    </Container>
  );
}

export default FavoriteList;
