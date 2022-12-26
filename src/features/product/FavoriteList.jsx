import { Container, Grid, Skeleton, Stack } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProductCard2 from "./ProductCard2";
import Pagination from "../../components/Panigation";
import { getfavoriteProduct } from "./productSlice";

function FavoriteList() {
  const [page, setPage] = useState(1);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getfavoriteProduct({ page }));
  }, [dispatch, page]);

  const { favorite, isLoading } = useSelector((state) => state.products);

  return (
    <Container maxWidth="md" sx={{ py: 3 }}>
      {!isLoading ? (
        <>
          <Grid container spacing={3}>
            {favorite?.favorite?.map((fav) => {
              return (
                <Grid key={fav._id} item xs={12}>
                  <ProductCard2 product={fav.product} />
                </Grid>
              );
            })}
          </Grid>
          <Stack alignItems="center" justifyContent="end" mt={3}>
            <Pagination
              count={favorite.totalPage}
              page={page}
              setPage={setPage}
            />
          </Stack>
        </>
      ) : (
        <Stack spacing={3}>
          <Skeleton variant="rounded" width={700} height={180} />
          <Skeleton variant="rounded" width={700} height={180} />
          <Skeleton variant="rounded" width={700} height={180} />
        </Stack>
      )}
    </Container>
  );
}

export default FavoriteList;
