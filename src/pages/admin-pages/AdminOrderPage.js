//mui
import { Card, Container, Box, Tabs, Tab, Divider } from "@mui/material";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import LocalDiningIcon from "@mui/icons-material/LocalDining";
// framework
import React, { useState } from "react";
import { useForm } from "react-hook-form";
//component

// feature
import AdminOrderList from "../../features/order/AdminOrderList";
import AdminOrderCustom from "../../features/order/AdminOrderCustom";

import OrderSearch from "../../features/order/OrderSearch";
import { FormProvider } from "../../components/form";
import { Stack } from "@mui/system";
function AdminOrderPage() {
  const [currentTab, setCurrentTab] = useState("order");
  const [filterName, setFilterName] = useState("");
  const handleChangeTab = (newValue) => {
    setCurrentTab(newValue);
  };

  const defaultValues = {
    orderSearch: "",
  };
  const methods = useForm({
    defaultValues,
  });
  const { handleSubmit } = methods;
  const onSubmit = (data) => {
    setFilterName(data.orderSearch);
  };

  const VALUE_TABS = [
    {
      value: "order",
      name: "Order",
      icon: <RestaurantIcon sx={{ fontSize: 24 }} />,
      component: <AdminOrderList filterName={filterName} />,
    },
    {
      value: "orderCustom",
      name: "Weekly Order",
      icon: <LocalDiningIcon sx={{ fontSize: 24 }} />,
      component: <AdminOrderCustom filterName={filterName} />,
    },
  ];

  return (
    <Container>
      <Card
        sx={{
          position: "relative",
          p: 3,
        }}
      >
        <Stack
          justifyContent="space-between"
          direction="row"
          alignItems="center"
        >
          <Tabs
            value={currentTab}
            sx={{
              mb: 1,
              px: 6,
              "& button.Mui-selected": {
                backgroundColor: "primary.main",
                borderRadius: 1,
              },
            }}
            scrollButtons="auto"
            indicatorColor="white"
            textColor="inherit"
            variant="scrollable"
            allowScrollButtonsMobile
            onChange={(e, value) => handleChangeTab(value)}
          >
            {VALUE_TABS.map((tab) => (
              <Tab
                sx={{ width: 150 }}
                disableRipple
                key={tab.value}
                value={tab.value}
                icon={tab.icon}
                label={tab.name}
              />
            ))}
          </Tabs>
          <Box
            sx={{
              py: 3,
            }}
          >
            <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
              <OrderSearch />
            </FormProvider>
          </Box>
        </Stack>
        <Divider sx={{ mx: 6, my: 3 }} />
        {VALUE_TABS.map((tab) => {
          const isMatched = tab.value === currentTab;
          return isMatched && <Box key={tab.value}>{tab.component}</Box>;
        })}
      </Card>
    </Container>
  );
}

export default AdminOrderPage;
