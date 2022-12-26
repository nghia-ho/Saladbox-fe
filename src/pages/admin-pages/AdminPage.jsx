import { Box, Container, Grid, Typography } from "@mui/material";
import { Budget } from "../../components/dashboard/budget";
import { LatestOrders } from "../../components/dashboard/latest-orders";
import { LatestProducts } from "../../components/dashboard/latest-products";
import { Sales } from "../../components/dashboard/sales";
import { TasksProgress } from "../../components/dashboard/tasks-progress";
import { TotalCustomers } from "../../components/dashboard/total-customers";
import { TotalProfit } from "../../components/dashboard/total-profit";
import { DashboardLayout } from "../../components/dashboard/dashboard-layout";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getOrders, getOrdersCustom } from "../../features/order/orderSlice";
import { getUsers } from "../../features/user/userSlice";
import { getProductsByAdmin } from "../../features/product/productSlice";

const Page = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getOrdersCustom({ limit: 1000 }));
    dispatch(getOrders({ limit: 1000 }));
    dispatch(getUsers({ limit: 1000 }));
    dispatch(getProductsByAdmin({ limit: 5 }));
  }, [dispatch]);

  const { ordersCustomList, ordersList, totalSale, totalSaleCustom } =
    useSelector((state) => state.order);
  const { userList } = useSelector((state) => state.user);
  const { products } = useSelector((state) => state.products);

  const totalSales =
    ordersCustomList?.reduce(
      (accumulator, currentValue) => accumulator + currentValue.totalPrice,
      0
    ) +
    ordersList.reduce(
      (accumulator, currentValue) => accumulator + currentValue.totalPrice,
      0
    );

  const totalcustomers = userList?.user.length;
  const totalOrders = ordersCustomList?.length + ordersList?.length;

  const progressDone =
    ordersCustomList?.filter((e) => e.isDeliverd || e.isDeleted).length +
    ordersList?.filter((e) => e.isDeliverd || e.isDeleted).length;
  const notDeliver =
    ordersCustomList?.filter((e) => !e.isDeliverd && !e.isDeleted).length +
    ordersList?.filter((e) => !e.isDeliverd && !e.isDeleted).length;

  function percentage(partialValue, totalValue) {
    return ((partialValue / (partialValue + totalValue)) * 100).toFixed(2);
  }

  const progress = percentage(progressDone, notDeliver);
  return (
    <>
      <Typography sx={{ mx: 3 }} fontWeight="600">
        Dashboard | SaladBox
      </Typography>
      <Box
        component="main"
        sx={{
          py: 8,
        }}
      >
        <Container maxWidth={false}>
          <Grid container spacing={3}>
            <Grid item lg={3} sm={6} xl={3} xs={12}>
              <Budget totalSales={totalSales} />
            </Grid>
            <Grid item xl={3} lg={3} sm={6} xs={12}>
              <TotalCustomers totalcustomers={totalcustomers} />
            </Grid>

            <Grid item xl={3} lg={3} sm={6} xs={12}>
              <TasksProgress progress={progress} value={progress} />
            </Grid>

            <Grid item xl={3} lg={3} sm={6} xs={12}>
              <TotalProfit totalOrders={totalOrders} />
            </Grid>

            <Grid item lg={7} md={7} xl={8} xs={12}>
              <Sales totalSale={totalSale} totalSaleCustom={totalSaleCustom} />
            </Grid>

            <Grid item lg={5} md={5} xl={4} xs={12}>
              <LatestProducts products={products} />
            </Grid>

            <Grid item xs={12}>
              <LatestOrders
                orders={ordersList}
                ordersCustomList={ordersCustomList}
              />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
