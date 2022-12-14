import { Container, Paper, useMediaQuery } from "@mui/material";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import React, { useState } from "react";

import ProfileInfomation from "../features/user/ProfileInfomation";
import OrderList from "../features/order/OrderList";
import BMI from "../features/user/BMI";
import ChangePassword from "../features/user/ChangePassword";
import FavoriteList from "../features/product/FavoriteList";
import PersonPinIcon from "@mui/icons-material/PersonPin";
import ViewStreamIcon from "@mui/icons-material/ViewStream";
import PasswordIcon from "@mui/icons-material/Password";
import AttributionIcon from "@mui/icons-material/Attribution";
import FavoriteIcon from "@mui/icons-material/Favorite";

const ACCOUNT_TABS = [
  {
    value: "Profile Infomation",
    icon: <PersonPinIcon />,
    component: <ProfileInfomation />,
  },
  {
    value: "Order List",
    icon: <ViewStreamIcon />,
    component: <OrderList />,
  },
  {
    value: "BMI Calculate",
    icon: <AttributionIcon />,
    component: <BMI />,
  },
  {
    value: "Change Password",
    icon: <PasswordIcon />,
    component: <ChangePassword />,
  },
  {
    value: "Favorite List",
    icon: <FavoriteIcon />,
    component: <FavoriteList />,
  },
];

const AccountPage = () => {
  const [currentTab, setCurrentTab] = useState("Profile Infomation");
  const mediumViewport = useMediaQuery("(min-width:900px)");

  const handleChange = (event, newValue) => {
    setCurrentTab(newValue);
  };
  return (
    <Container maxWidth="lg" sx={{ mt: 5 }}>
      <Paper>
        <Box
          sx={{
            // flexGrow: 1,
            // bgcolor: "background.paper",
            display: { xs: "block", sm: "block", md: "flex" },
          }}
        >
          <Tabs
            orientation={mediumViewport ? "vertical" : "horizontal"}
            value={currentTab}
            onChange={handleChange}
            aria-label="Vertical tabs example"
            sx={{ borderRight: 1, borderColor: "divider" }}
            variant="scrollable"
            scrollButtons="auto"
            allowScrollButtonsMobile
          >
            {ACCOUNT_TABS.map((tab) => (
              <Tab
                disableRipple
                key={tab.value}
                label={tab.value}
                icon={tab.icon}
                value={tab.value}
              />
            ))}
          </Tabs>
          <Box>
            {ACCOUNT_TABS.map((tab) => {
              const isMatch = tab.value === currentTab;
              return isMatch && <Box key={tab.value}> {tab.component}</Box>;
            })}
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default AccountPage;
