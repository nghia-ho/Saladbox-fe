import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOrders, getOrdersCustom } from "./orderSlice";

import AccountBoxIcon from "@mui/icons-material/AccountBox";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";

import Order from "./Order";
import OrderCustom from "./OrderCustom";

import { Box, Card, Container, Tab, Tabs } from "@mui/material";

const OrderList = () => {
  const [currentTab, setCurrentTab] = useState("order");
  const dispatch = useDispatch();

  const handleChangeTab = (newValue) => {
    setCurrentTab(newValue);
  };

  useEffect(() => {
    dispatch(getOrders({}));
    dispatch(getOrdersCustom({}));
  }, [dispatch]);

  const { ordersList, isLoading, ordersCustomList } = useSelector(
    (state) => state.order
  );

  const PROFILE_TABS = [
    {
      value: "order",
      name: "Order",
      icon: <AccountBoxIcon sx={{ fontSize: 24 }} />,
      component: <Order isLoading={isLoading} ordersList={ordersList} />,
    },
    {
      value: "orderCustom",
      name: "Weekly Order",
      icon: <PeopleAltIcon sx={{ fontSize: 24 }} />,
      component: (
        <OrderCustom isLoading={isLoading} ordersList={ordersCustomList} />
      ),
    },
  ];

  return (
    <Container>
      <Card sx={{ mt: 3 }}>
        <Tabs
          value={currentTab}
          sx={{ m: 1 }}
          scrollButtons="auto"
          variant="scrollable"
          allowScrollButtonsMobile
          onChange={(e, value) => handleChangeTab(value)}
        >
          {PROFILE_TABS.map((tab) => (
            <Tab
              disableRipple
              key={tab.value}
              value={tab.value}
              icon={tab.icon}
              label={tab.name}
            />
          ))}
        </Tabs>
        {PROFILE_TABS.map((tab) => {
          const isMatched = tab.value === currentTab;
          return (
            isMatched && (
              <Box mt={1} key={tab.value}>
                {tab.component}
              </Box>
            )
          );
        })}
      </Card>
    </Container>
  );
};

export default OrderList;
